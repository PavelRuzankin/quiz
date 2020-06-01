import React from "react";
import ActiveQuiz from "../components/ActiveQuiz";
import FinishedQuiz from "../components/FinishedQuiz";
import axios from "axios";
import { RESTART } from "../store/actions/actionTypes";

import Loader from "../components/Loader";
import { connect } from "react-redux";
import { fetchQuizById } from "../store/actions/quizListActions";

export const ContextAnswers = React.createContext();
class Quiz extends React.Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.number);
  }

  renderQuiz = () => {
    if (!this.props.finishedQuiz) {
      console.log(this.props.currentQuestion);

      return (
        <>
          <h1>{this.props.quiz.name}</h1>
          <div className={"Quiz"}>
            <ActiveQuiz
              currentQuestion={this.props.currentQuestion}
              onAnswerClick={this.props.onAnswerClick}
              question={
                this.props.quiz.quiz[this.props.currentQuestion].question
              }
              answers={this.props.quiz.quiz[this.props.currentQuestion].answers}
            />
            <small>
              {this.props.currentQuestion + 1} из {this.props.quiz.quiz.length}
            </small>
          </div>
        </>
      );
    }
    return <FinishedQuiz restart={this.props.restart} />;
  };

  render() {
    return this.props.loader ? <Loader /> : this.renderQuiz();
  }
}

function mapStateToProps(state) {
  return {
    name: state.quiz.name,
    rightAnswerCount: state.quiz.rightAnswerCount,
    currentQuestion: state.quiz.currentQuestion,
    answerState: state.quiz.answerState,
    finishedQuiz: state.quiz.finishedQuiz,
    completedQuestions: state.quiz.completedQuestions,
    quiz: state.quiz.quiz,
    loader: state.quiz.loader,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    restart: () => dispatch({ type: RESTART }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
