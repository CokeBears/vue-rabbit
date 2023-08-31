//封装分类业务数据相关代码
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export function useCategory() {
    //获取分类数据
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async () => {
        const res = await getCategoryAPI(route.params.id)//由传参形式决定使用
        categoryData.value = res.result
    }
    onMounted(() => getCategory())


    return {
        categoryData
    }
}