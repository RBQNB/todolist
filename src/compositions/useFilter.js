import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../util/todoStorage";
// 定义三个状态
const validHash = ["all", "active", "completed"];
/**
 * 
 * @param {任务列表} todosRef 
 * @returns 
 */
export default function (todosRef) {
    const visibilityRef = ref("all");  //选中状态定未响应的

    //根据hash设置响应状态
    const hashChangeHandle = function () {
        const hash = location.hash.replace(/#\/?/, "");
        if (validHash.includes(hash)) {
            visibilityRef.value = hash;
        } else {
            location.hash = "";
            visibilityRef.value = "all"
        }
    }
    /**
     * 过滤
     */
    const filteredTodosRef = computed(() => {
        return filter(todosRef.value, visibilityRef.value);  //根据状态显示的列表
    });
    
    const remainingRef = computed(() => {  
        return filter(todosRef.value, "active").length; //正在进行的长度
    });

    const completedRef = computed(() => {
        return filter(todosRef.value, "completed").length;  //已完成的长度
    });
    /**
     * 组件过载之后
     */
    onMounted(() => {
        window.addEventListener("hashchange", hashChangeHandle, false);
    })
    /**
     * 组件销毁之后
     */
    onUnmounted(() => {
        window.removeEventListener("hashchange", hashChangeHandle, false);
    })
    return {
        visibilityRef,
        filteredTodosRef,
        remainingRef,
        completedRef,
    }
}