import React from "react";
import AnswerItem from "./AnswerItem";

const AnswerList = (props) => {
  return (
    <ul className={"AnswerList"}>
      {props.answers.map((elem, index) => {
        return <AnswerItem key={index} answer={elem} number={index} />;
      })}
    </ul>
  );
};

export default AnswerList;
