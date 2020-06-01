import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../store/actions/quizListActions";

class QuizList extends React.Component {
  componentDidMount() {
    this.props.fetchQuizes();
  }

  renderLinks() {
    console.log(this.props);

    return this.props.quizes.map((elem, index) => {
      return (
        <li key={index}>
          <NavLink to={`/quiz/${elem.id}`} exact>
            {elem.name}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    return (
      <div className={"QuizList"}>
        <h1>Список тестов</h1>
        {this.props.loader ? <Loader /> : <ul>{this.renderLinks()}</ul>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loader: state.quiz.loader,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
