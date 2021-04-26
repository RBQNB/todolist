import { ref,watchEffect } from "vue";
import * as todoStorage from "../util/todoStorage";

export default function useTodoList(){
    const todosRef = ref(todoStorage.fetch());  //从存储中获取数据（初始值）  并加到响应式
    watchEffect(()=>{
        todoStorage.save(todosRef.value);    //当todolist变化时执行这个函数  监控数据
    });

    return {
        todosRef,
    }
}
