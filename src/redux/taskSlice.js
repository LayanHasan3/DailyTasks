import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@dailytasks_tasks';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [
      { id: '1', title: 'Buy groceries', completed: false, category: 'Personal', priority: 'Medium' },
      { id: '2', title: 'Finish React Native project', completed: true, category: 'Work', priority: 'High' },
    ],
    searchQuery: '',
    filterStatus: 'All', // 'All' | 'Active' | 'Completed'
  },
  reducers: {
    setTasks: (state, action) => {
      state.items = action.payload;
    },
    addTask: (state, action) => {
      const { title, category = 'General', priority = 'Medium' } = action.payload;
      state.items.unshift({
        id: Date.now().toString(),
        title,
        completed: false,
        category,
        priority,
      });
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)).catch(console.error);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)).catch(console.error);
    },
    toggleComplete: (state, action) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)).catch(console.error);
    },
    updateTask: (state, action) => {
      const { id, title, category, priority } = action.payload;
      const index = state.items.findIndex(t => t.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], title, category, priority };
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)).catch(console.error);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  toggleComplete,
  updateTask,
  setSearchQuery,
  setFilterStatus,
} = taskSlice.actions;

export default taskSlice.reducer;