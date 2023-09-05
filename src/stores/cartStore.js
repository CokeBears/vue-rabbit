//封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartAPI, delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
    //登录状态下连接购物车接口
    //调用useUserStore判断token是否为登录状态
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    // 获取最新购物车列表action
    const updateNewList = async () => {
        const res = await findNewCartAPI()
        cartList.value = res.result
    }
    //定义stare - cartList 
    const cartList = ref([])
    //定义action - addCart
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            //登录后加入购物车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            //离线状态加入购物车
            //添加购物车
            //如果购物车内有相同商品，则count++
            //如果购物车内没有相同商品，则push()
            //思路：通过匹配传递进来的商品对象中的skuId能不能在cartList中找到，如果有就是添加过
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                //找到
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }
    }

    //删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            console.log('Yes');
            //调用购物车接口删除
            await delCartAPI([skuId])
            //再次获取购物车实现刷新
            updateNewList()
        } else {
            console.log('No');
            //思路：1.找到删除项的下标值 - splice
            //2.使用数组过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
    }

    //退出登录时清空购物车
    const clearCart = () => {
        cartList.value = []
    }

    //使用reduce()函数求数组的和，共传入两个参数，一个回调函数(a,c)=>a+c.count,一个初始值0。
    //(a,c)=>a+c.count回调函数携带参数a：每次累加后的值，c：数组的每一项元素。c.count即为单种商品的数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))//商品总数
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.price * c.count, 0))//商品总价格

    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)//查找被触发单选框的元素
        item.selected = selected//将被触发单选框的元素的单选状态改变
    }

    //全选，当全选为true时单选框全为true
    const allCheck = (selected) => {
        //将cartList中所有的selected状态设置与全选框一致,forEach()遍历
        cartList.value.forEach((item) => item.selected = selected)
    }

    //全选,当单选全选时为true
    // every()是对数组中每一项运行给定函数，如果该函数对每一项返回true,则返回true
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    //获取被选中的商品数量,即selected为true的和
    //使用filter()使符合selected为true的元素组成新数组，再使用reduce求count的和
    const selectedCount = computed(() => cartList.value.filter(time => time.selected).reduce((a, c) => a + c.count, 0))

    //原理同上
    const selectedPrice = computed(() => cartList.value.filter(time => time.selected).reduce((a, c) => a + c.price * c.count, 0))
    return {
        allCount,
        allPrice,
        cartList,
        addCart,
        delCart,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart
    }
}, {
    persist: true,
})