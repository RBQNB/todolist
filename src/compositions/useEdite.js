import { ref, computed } from "vue";

export default function (todoRef) {
    const editingTodoRef = ref(null); // 当前正在修改的是哪一个todo
    let originTitle = null; // 缓存之前的title值

    const editTodo = (todo) => {
        originTitle = todo.title;
        editingTodoRef.value = todo; //目前正在修改todo
    }
    const doneEdit = (todo) => {
        editingTodoRef.value = null;
        const title = todo.title.trim();
        if(title){
            todo.title = title;
        }else{
            todoRef.value.splice(todoRef.value.indexOf(todo),1);
        }
    }
    const concalEdit = (todo) => {
        editingTodoRef.value = null;
        todo.title = originTitle;
    }
    const allDoneRef = computed({
        get() {
            return todoRef.value.filter(item => !item.completed).length === 0; //没完成等于0
        },
        set(checked) {
            todoRef.value.forEach((todo) => {
                todo.completed = checked;
            });
        },
    }
    )
    return {
        editingTodoRef,
        editTodo,
        doneEdit,
        concalEdit,
        allDoneRef
    }
}