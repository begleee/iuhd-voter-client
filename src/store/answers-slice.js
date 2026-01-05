import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnswering: false,
  answeredTypes: [],
  warning: null,
  completed: [],
}

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setIsAnswering(state, action) {
      state.isAnswering = action.payload;
    },
    addAnsweredType(state, action) {
      state.answeredTypes.push(action.payload);
    },
    setWarning(state, action) {
      state.warning = action.payload;
    },
    setCompleted(state, action) {
      state.completed.push(action.payload);
    },
    clearAll(state) {
      state.isAnswering = false;
      state.answeredTypes = [];
      state.warning = null;
      state.completed = [];
    }
  }
});

export const {
  isAnswering,
  setIsAnswering,
  answeredTypes,
  addAnsweredType,
  warning,
  setWarning,
  completed,
  setCompleted,
  clearAll
} = answersSlice.actions;

export default answersSlice.reducer;
