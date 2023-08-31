<script setup>
import { ref,onMounted,computed } from 'vue'
import { getHotGoodsAPI } from '@/apis/detail'
import { useRoute } from 'vue-router'

const props = defineProps({
  hotType: {
    type: Number, // 1代表24小时热销榜 2代表周热销榜 3代表总热销榜 可以使用type去适配title和数据列表
    default: 1
  }
})

const TITLEMAP = {
  1: '24小时热榜',
  2: '周热榜', 
}
const title = computed(() => TITLEMAP[props.hotType])

const goodList = ref([])
const route = useRoute()
const getHotList = async () => {
    const res = await getHotGoodsAPI({
        id: route.params.id,
        type: props.hotType
    })
    goodList.value = res.result
}
onMounted(()=>getHotList())


</script>



<template>
    <div class="goods-hot">
        <h3> {{ title }} </h3>
        <!-- 商品区块 -->
        <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in goodList" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>

<style scoped lang='scss'>
h3 {
    height: 50px;
    width:220px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 50px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
}
</style>