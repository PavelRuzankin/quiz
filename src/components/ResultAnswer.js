import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResultAnswer = (props) => {
  console.log(props);

  return (
    <ul className={"ResultAnswer"}>
      {props.quiz.map((elem, index) => {
        if (props.completedQuestions[index] === "success") {
          return (
            <li>
              <small>
                {" "}
                <FontAwesomeIcon icon={"check"} />
              </small>

              {elem.question}
            </li>
          );
        } else {
          return (
            <li>
              <small>
                {" "}
                <FontAwesomeIcon icon={"times"} />
              </small>
              {elem.question}
            </li>
          );
        }
      })}
    </ul>
  );
};

function mapStateToProps(state) {
  return {
    quiz: state.quiz.quiz.quiz,
    completedQuestions: state.quiz.completedQuestions,
  };
}

export default connect(mapStateToProps)(ResultAnswer);
