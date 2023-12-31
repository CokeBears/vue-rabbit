//购物车相关接口
import httpInstance from "@/utils/http";

//加入购物车
export const insertCartAPI = ({ skuId, count }) => {
    return httpInstance({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}

//获取购物车列表
export const findNewCartAPI = () => {
    return httpInstance({
        url: '/member/cart',
    })
}

// 删除购物车
export const delCartAPI = (ids) => {
    return httpInstance({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

//登录时将本地购物车合并入后台数据
export const mergeCartAPI = (data) => {
    return httpInstance({
        url: '/member/cart/merge',
        method: 'POST',
        data
    })
} 