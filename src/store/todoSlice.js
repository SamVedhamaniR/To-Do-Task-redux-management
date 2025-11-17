import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: 1, task: 'Sample Task 1', priority: 'High', assignedUser: 'User A', status: 'backlog', dueDate: null },
    { id: 2, task: 'Sample Task 2', priority: 'Medium', assignedUser: 'User B', status: 'in-progress', dueDate: null },
    { id: 3, task: 'Sample Task 3', priority: 'Low', assignedUser: 'User C', status: 'completed', dueDate: null },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ ...action.payload, status: 'backlog' });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, task, priority, assignedUser, status, dueDate } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.task = task;
        existingTodo.priority = priority;
        existingTodo.assignedUser = assignedUser;
        existingTodo.status = status;
        existingTodo.dueDate = dueDate;
      }
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.status = status;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo, updateTaskStatus } = todoSlice.actions;
export default todoSlice.reducer;
