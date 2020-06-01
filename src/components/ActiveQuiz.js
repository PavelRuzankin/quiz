import React from "react";
import AnswerList from "./AnswerList";

const ActiveQuiz = (props) => {
  return (
    <div className={"ActiveQuiz"}>
      <h3 className={"question"}>
        <span>
          <strong>{props.currentQuestion + 1}. </strong>
          {props.question}
        </span>
      </h3>
      <AnswerList answers={props.answers} />
    </div>
  );
};

export default ActiveQuiz;
