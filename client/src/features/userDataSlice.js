import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userData',
  initialState: { lists: [] },
  reducers: {
    setUserData: (state, action) => action.payload,
    updateCheckmark: (state, action) => {
      const { index, checkmark } = action.payload;
      state.lists[index].checkmark = checkmark;
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

export const {
  setUserData, updateCheckmark, updateCode, deleteProblem,
} = userDataSlice.actions;

export default userDataSlice.reducer;
