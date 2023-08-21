import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  //导航列表逻辑，数据管理
  //导航列表数据
  const categoryList = ref([])
  
  //action 获取导航数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    console.log(res.data.result);
    categoryList.value = res.data.result
  }

  return {
    categoryList,
    getCategory
  }
})
