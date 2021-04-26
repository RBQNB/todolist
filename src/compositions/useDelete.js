import {ref} from "vue";

export default function(todoRef){
    function deleteTodo(todo){
        todoRef.value.splice(todoRef.value.indexOf(todo),1);
    }
    function clearCompleted(){
        todoRef.value = todoRef.value.filter(item=>!item.completed);
    }
    return {
        deleteTodo,
        clearCompleted
    }
}