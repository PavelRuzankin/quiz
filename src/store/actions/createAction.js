import { ADD_QUIZ, RESTART_QUIZ } from "./actionTypes";
import axios from "axios";

export function addQuizHandler(item) {
  return {
    type: ADD_QUIZ,
    item,
  };
}

export function restartQuiz() {
  return {
    type: RESTART_QUIZ,
  };
}

export function finishCreateQuiz(name) {
  return (dispatch, getState) => {
    axios
      .post("https://quiz-app-75cb9.firebaseio.com/quizes.json", {
        name: name,
        quiz: getState().create.quiz,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    dispatch(restartQuiz());
  };
}
