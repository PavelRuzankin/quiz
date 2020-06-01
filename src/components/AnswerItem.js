import React from "react";
import { onAnswerClick } from "../store/actions/quizListActions";
import { connect } from "react-redux";

const AnswerItem = (props) => {
  const cls = ["AnswerItem"];
  if (props.answerState && props.answerState[props.number]) {
    cls.push(props.answerState[props.number]);
  }
  return (
    <li
      className={cls.join(" ")}
      onClick={() => props.onAnswerClick(props.number)}
    >
      <span>{props.number + 1}. </span>
      {props.answer}
    </li>
  );
};

function mapStateToProps(state) {
  return {
    answerState: state.quiz.answerState,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onAnswerClick: (id) => dispatch(onAnswerClick(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerItem);
