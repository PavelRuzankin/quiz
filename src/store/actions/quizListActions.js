import axios from "axios";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISHED_QUIZ,
  QUIZ_NEXT_QUESTION,
  SET_COMPLETED_QUESTION,
} from "../actions/actionTypes";
import FinishedQuiz from "../../components/FinishedQuiz";

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}
export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(
        "https://quiz-app-75cb9.firebaseio.com/quizes.json"
      );

      const quizes = [];

      Object.keys(response.data).forEach((elem) => {
        quizes.push({ name: response.data[elem].name, id: elem });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizById(id) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(
        `https://quiz-app-75cb9.firebaseio.com/quizes/${id}.json`
      );
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function quizNextQuestion() {
  return {
    type: QUIZ_NEXT_QUESTION,
  };
}

export function finishedQuiz() {
  return {
    type: FINISHED_QUIZ,
  };
}

export function quizSetState(answerState, n) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    n,
  };
}
export function setCompletedQuestions(completedQuestions) {
  return {
    type: SET_COMPLETED_QUESTION,
    completedQuestions,
  };
}

export function onAnswerClick(id) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    const question = state.quiz.quiz[state.currentQuestion];
    if (question.rightAnswer === id) {
      const completedQuestions = { ...state.completedQuestions };
      completedQuestions[state.currentQuestion] = "success";

      dispatch(setCompletedQuestions(completedQuestions));
      dispatch(quizSetState({ [id]: "success" }, 1));
    } else {
      const completedQuestions = { ...state.completedQuestions };
      completedQuestions[state.currentQuestion] = "error";

      dispatch(setCompletedQuestions(completedQuestions));
      dispatch(quizSetState({ [id]: "error" }, 0));
    }

    const timeout = setTimeout(() => {
      // идем дальше либо выводим финиш
      if (state.currentQuestion + 1 === state.quiz.quiz.length) {
        dispatch(finishedQuiz());
      } else {
        dispatch(quizNextQuestion());
      }

      window.clearTimeout(timeout);
    }, 1000);
  };
}
