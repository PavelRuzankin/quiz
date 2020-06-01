import React from "react";
import ResultAnswer from "./ResultAnswer";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const FinishedQuiz = (props) => {
  return (
    <div className={"FinishedQuiz"}>
      <h3>Тест окончен</h3>
      <span>
        Результат: {props.rightAnswerCount} из {props.length}
      </span>
      <ResultAnswer />
      <div className={"buttons"}>
        <button onClick={props.restart}>Начать заново</button>
        <NavLink to="/quiz-list">
          <button>Список тестов</button>
        </NavLink>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    rightAnswerCount: state.quiz.rightAnswerCount,
    length: state.quiz.quiz.quiz.length,
  };
}

export default connect(mapStateToProps)(FinishedQuiz);
