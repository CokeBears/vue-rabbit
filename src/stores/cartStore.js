//封装购物车模块

import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    //定义stare - cartList
    const cartList = ref([])
    //定义action - addCart
    const addCart = (goods) => {
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

    //删除购物车
    const delCart = (skuId) => {
        //思路：1.找到删除项的下标值 - splice
        //2.使用数组过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }

    //使用reduce()函数求数组的和，共传入两个参数，一个回调函数(a,c)=>a+c.count,一个初始值0。
    //(a,c)=>a+c.count回调函数携带参数a：每次累加后的值，c：数组的每一项元素。c.count即为单种商品的数量
    const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))//商品总数
    const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.price*c.count,0))//商品总价格
    return {
        allCount,
        allPrice,
        cartList,
        addCart,
        delCart
    }
}, {
    persist: true,
})