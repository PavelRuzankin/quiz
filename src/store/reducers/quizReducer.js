import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  FINISHED_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
  SET_COMPLETED_QUESTION,
  RESTART,
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loader: true,
  someError: null,
  name: null,
  rightAnswerCount: 0,
  currentQuestion: 0,
  answerState: null,
  finishedQuiz: false,
  completedQuestions: {},
  quiz: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loader: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        quizes: action.quizes,
        loader: false,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loader: false,
        someError: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loader: false,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answerState: null,
      };
    case FINISHED_QUIZ:
      return {
        ...state,
        finishedQuiz: true,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        rightAnswerCount: state.rightAnswerCount + action.n,
      };
    case SET_COMPLETED_QUESTION:
      return {
        ...state,
        completedQuestions: action.completedQuestions,
      };
    case RESTART:
      return {
        ...state,
        loader: false,
        someError: null,
        rightAnswerCount: 0,
        currentQuestion: 0,
        answerState: null,
        finishedQuiz: false,
        completedQuestions: {},
      };
    default:
      return state;
  }
}
