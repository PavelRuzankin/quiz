import React from "react";
import axios from "axios";
import {
  createControls,
  validForm,
  isAllFormsValid,
} from "../frameworks/formFramework";
import Input from "../UI/Input";
import Select from "../UI/Select";
import PreparedQuiz from "../components/PreparedQuiz";
import {
  addQuizHandler,
  finishCreateQuiz,
} from "../store/actions/createAction";
import { connect } from "react-redux";

function createOptionControls(n) {
  return createControls(
    { label: `Введите ответ № ${n} `, errorMessage: "Вы не ввели ответ" },
    { required: true }
  );
}

function createFormsControls() {
  return {
    question: createControls(
      {
        label: "Введите вопрос",
        errorMessage: "Вы не ввели вопрос",
      },
      {
        required: true,
      }
    ),
    option1: createOptionControls(1),
    option2: createOptionControls(2),
    option3: createOptionControls(3),
    option4: createOptionControls(4),
  };
}

class QuizCreater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameControls: createControls(
        {
          label: "Введите название теста",
          errorMessage: "Вы не ввели название теста",
        },
        { required: true }
      ),
      formControls: createFormsControls(),
      rightAnswer: 0,
      allFormsValid: false,
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  changeFormHandler = (value, id) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[id] };

    control.value = value;
    control.touched = true;
    control.valid = validForm(value, control.validation);

    formControls[id] = control;
    const allFormsValid = isAllFormsValid(formControls);

    this.setState({ formControls, allFormsValid });
  };

  renderForms = () => {
    const formControls = { ...this.state.formControls };
    return Object.keys(formControls).map((elem, index) => {
      return (
        <>
          <Input
            value={formControls[elem].value}
            touched={formControls[elem].touched}
            label={formControls[elem].label}
            errorMessage={formControls[elem].errorMessage}
            valid={formControls[elem].valid}
            id={elem}
            onChange={this.changeFormHandler}
          />
          {index === 0 ? <hr /> : null}
        </>
      );
    });
  };

  addQuestionHandler = () => {
    const { option1, option2, option3, option4 } = this.state.formControls;
    const questionItem = {
      question: this.state.formControls.question.value,
      answers: [option1.value, option2.value, option3.value, option4.value],
      rightAnswer: this.state.rightAnswer,
    };

    this.setState({
      formControls: createFormsControls(),
      rightAnswer: 1,
      allFormsValid: false,
    });
    this.props.addQuizHandler(questionItem);
  };

  createQuizHandler = () => {
    this.props.finishCreateQuiz(this.state.nameControls.value);
    this.setState({
      nameControls: createControls(
        {
          label: "Введите название теста",
          errorMessage: "Вы не ввели название теста",
        },
        { required: true }
      ),
      formControls: createFormsControls(),
      rightAnswer: 0,
      allFormsValid: false,
    });
  };

  changeSelectHandler = (event) => {
    this.setState({ rightAnswer: +event.target.value });
  };

  changeNameHandler = (value) => {
    const nameControls = { ...this.state.nameControls };

    nameControls.value = value;
    nameControls.touched = true;
    nameControls.valid = validForm(value, nameControls.validation);

    this.setState({ nameControls });
  };

  deleteQuestion = (n) => {
    const quiz = this.state.quiz.concat();
    quiz.splice(n, 1);

    this.setState({ quiz });
  };

  render() {
    console.log(this.props.quiz);

    const nameControls = this.state.nameControls;

    return (
      <div className={"QuizCreater"}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}></form>
          {this.renderForms()}
          <Select
            value={this.state.rightAnswer}
            onChange={this.changeSelectHandler}
            options={[0, 1, 2, 3]}
          />
          <button
            onClick={this.addQuestionHandler}
            type="primary"
            disabled={!this.state.allFormsValid}
          >
            Добавить вопрос
          </button>
          <button
            onClick={this.createQuizHandler}
            disabled={
              !(
                this.state.nameControls.value.trim() !== "" &&
                this.props.quiz.length !== 0
              )
            }
          >
            Создать тест
          </button>
        </div>
        <PreparedQuiz
          label={nameControls.label}
          value={nameControls.value}
          valid={nameControls.valid}
          touched={nameControls.touched}
          errorMessage={nameControls.errorMessage}
          quiz={this.props.quiz}
          onChange={this.changeNameHandler}
          deleteQuestion={this.deleteQuestion}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addQuizHandler: (item) => dispatch(addQuizHandler(item)),
    finishCreateQuiz: (name) => dispatch(finishCreateQuiz(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreater);
