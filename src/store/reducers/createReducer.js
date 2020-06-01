import { ADD_QUIZ, RESTART_QUIZ } from "../actions/actionTypes";

const initialState = {
  quiz: [],
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUIZ:
      return {
        ...state,
        quiz: [...state.quiz, action.item],
      };
    case RESTART_QUIZ:
      return {
        quiz: [],
      };
    default:
      return state;
  }
}
