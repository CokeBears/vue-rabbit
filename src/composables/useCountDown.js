//封装倒计时逻辑函数
import {computed, ref} from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () =>{
    //1.响应式数据
    const time = ref(0)
    //格式化时间 xx分xx秒
    const formatTime = computed(()=>dayjs.unix(time.value).format('mm分ss秒'))
    //2.开启倒计时函数
    const start = (currentTime) =>{
        //开启倒计时逻辑
        //核心逻辑编写：每秒减一
        time.value = currentTime
        setInterval(()=>{
            time.value--
        },1000)
    }
    return {
        formatTime,
        start
    }
}