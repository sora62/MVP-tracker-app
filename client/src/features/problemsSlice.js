import { createSlice } from '@reduxjs/toolkit';

const problemsSlice = createSlice({
  name: 'problems',
  initialState: [],
  reducers: {
    setProblemsOptions: (state, action) => action.payload,
  },
});

export const { setProblemsOptions } = problemsSlice.actions;
export default problemsSlice.reducer;
