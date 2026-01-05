import { createSlice } from "@reduxjs/toolkit";
import { fetchGroups, fetchQuestions } from "../utils/fethces";

const initialAnswers = Array.from({ length: 5 }, (_, i) => ({
  questionId: i + 1,
  value: 0,
}));

const groups = await fetchGroups();
const questions = await fetchQuestions();

const initialState = {
  groupId: null,
  types: null,
  type: null,
  teacherId: null,
  answers: initialAnswers,
  groups,
  data: null,
  questions,
}

const ratesSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    setGroupId(state, action) {
      state.groupId = action.payload;
    },
    setTypes(state, action) {
      state.types = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setTeacherId(state, action) {
      state.teacherId = action.payload;
    },
    setAnswers(state, action) {
      state.answers = action.payload;
    },
    setGroups(state, action) {
      state.groups = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    updateAnswers(state, action) {
      const {id, value} = action.payload;
      state.answers = state.answers.map(item => item.questionId === id ? { ...item, value} : item)
    },
    clearAnswers(state) {
      state.answers = Array.from({ length: 5 }, (_, i) => ({
        questionId: i + 1,
        value: 0,
      }));
    },
  }
});

export const {
  setGroupId,
  setTypes,
  setType,
  setTeacherId,
  setAnswers,
  setGroups,
  setData,
  setQuestions,
  updateAnswers,
  resetAnswers,
  clearAnswers,
} = ratesSlice.actions;

export default ratesSlice.reducer;
