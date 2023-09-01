//封装购物车模块

import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    return {
        cartList,
        addCart
    }
}, {
    persist: true,
})