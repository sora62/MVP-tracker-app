import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from '../features/userDataSlice';
import problemsReducer from '../features/problemsSlice';

const store = configureStore({
  reducer: {
    problems: problemsReducer,
    userData: userDataReducer,
  },
});

export default store;
