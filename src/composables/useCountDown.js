//封装倒计时逻辑函数
import {computed, onUnmounted, ref} from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () =>{
    //1.响应式数据
    let timer = null
    const time = ref(0)
    //格式化时间 xx分xx秒
    const formatTime = computed(()=>dayjs.unix(time.value).format('mm分ss秒'))
    //2.开启倒计时函数
    const start = (currentTime) =>{
        //开启倒计时逻辑
        //核心逻辑编写：每秒减一
        time.value = currentTime
        timer = setInterval(()=>{
            time.value--
        },1000)
    }
    //组件销毁时清除定时器，防止内存泄漏
    onUnmounted(()=>{
        timer&&clearInterval(timer)
    })//生命周期函数:销毁时

    return {
        formatTime,
        start
    }
}