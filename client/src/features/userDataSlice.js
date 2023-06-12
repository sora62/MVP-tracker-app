import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userData',
  initialState: null,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
    updateCode: (state, action) => {
      const { index, code } = action.payload;
      state.lists[index].code = code;
    },
    deleteProblem: (state, action) => {
      const { index } = action.payload;
      state.lists.splice(index, 1);
    },
  },
});

export const { setUserData, updateCode, deleteProblem } = userDataSlice.actions;

export default userDataSlice.reducer;
