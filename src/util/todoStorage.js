const LOCAL_KEY = "todomvc";

/**
 * 工具函数
 * 生成一个任务的唯一编号，时间戳+4位随机数
 */
export function generateId() {
  return Date.now() + Math.random().toString(16).substr(2, 4);
}

/**
 * 获取目前所有的任务
 */
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return [];
}

/**
 * 保存所有任务
 * @param {*} todos 任务列表
 */
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}
/**
 * 根据hash过滤数据
 */
export function filter(todos,visibility = "all"){
  if(visibility === "all"){
    return todos;
  }else if(visibility === "active"){
    return todos.filter((item)=>!item.completed);  //未选中的
  }else if (visibility === "completed") {
    return todos.filter((it) => it.completed);  //选中的
  }
  throw new Error("invalid visibility value");  
}
