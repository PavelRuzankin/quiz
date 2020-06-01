import React from "react";

import Input from "../UI/Input";
import PreparedQuestion from "./PreparedQuestion";

const PreparedQuiz = (props) => {
  return (
    <div className={"PreparedQuiz"}>
      <h1>Ваш тест</h1>
      <Input
        label={props.label}
        value={props.value}
        errorMessage={props.errorMessage}
        valid={props.valid}
        touched={props.touched}
        onChange={props.onChange}
      />
      <div className={"prepared-quiz-list"}>
        {props.quiz.map((elem, index) => {
          return (
            <PreparedQuestion
              key={index}
              question={elem.question}
              rightAnswer={elem.rightAnswer}
              answers={elem.answers}
              deleteQuestion={props.deleteQuestion}
              number={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PreparedQuiz;
