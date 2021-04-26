<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allDoneRef"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: todo.completed,
              editing: todo === editingTodoRef,
            }"
            v-for="todo in filteredTodosRef"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="deleteTodo(todo)"></button>
            </div>
            <input
              v-model="todo.title"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.escape="concalEdit(todo)"
              class="edit"
              type="text"
            />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <span>剩余</span>
          <strong>{{ remainingRef }}条</strong>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >所有</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >进行</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              >已完成</a
            >
          </li>
        </ul>
        <button
          @click="clearCompleted"
          class="clear-completed"
          style="display: none"
          v-show="completedRef > 0"
        >
          清空
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./compositions/useTodoList";
import useNewTodo from "./compositions/useNewTodo";
import usefilter from "./compositions/useFilter";
import useEdit from "./compositions/useEdite";
import useDelete from "./compositions/useDelete";
export default {
  setup() {
    const { todosRef } = useTodoList();

    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...usefilter(todosRef),
      ...useEdit(todosRef),
      ...useDelete(todosRef),
    };
  },
};
</script>
