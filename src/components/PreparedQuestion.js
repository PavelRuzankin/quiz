import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default (props) => (
  <div className={"PreparedQuestion"}>
    <span>{props.question}</span>
    <ul>
      {props.answers.map((elem, index) => {
        return <li key={index}>{elem}</li>;
      })}
    </ul>
    <span>Правилный ответ {props.rightAnswer + 1}</span>
    <div
      className={"PreparedQuestion_times"}
      onClick={() => props.deleteQuestion(props.number)}
    >
      <FontAwesomeIcon icon="times" color="white" size="2x" />
    </div>
  </div>
);
