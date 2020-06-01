import React from "react";
import Input from "../UI/Input";
import axios from "axios";
import { sendHandler } from "../store/actions/authAction";
import { connect } from "react-redux";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        email: {
          value: "",
          type: "email",
          label: "E-mail",
          errorMessage: "Не валидный e-mail",
          touched: false,
          valid: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: "",
          type: "password",
          label: "Пароль",
          errorMessage: "Не валидный пароль",
          touched: false,
          valid: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  validForm = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    return isValid;
  };

  inputChangeHandler = (value, id) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[id] };

    control.value = value;
    control.touched = true;
    control.valid = this.validForm(value, control.validation);

    formControls[id] = control;

    let isAllFormsValid = true;
    Object.keys(formControls).forEach((elem) => {
      isAllFormsValid = formControls[elem].valid && isAllFormsValid;
    });

    this.setState({ formControls, isAllFormsValid });
  };

  getInput = (formControls) => {
    return Object.keys(formControls).map((elem, index) => {
      const control = formControls[elem];

      return (
        <Input
          key={index}
          id={elem}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          onChange={this.inputChangeHandler}
        />
      );
    });
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEtuespH4YAKuW6PshG8qoa0ZGQlBRGlc",
        authData
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  registerHandler = async () => {
    const loginData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEtuespH4YAKuW6PshG8qoa0ZGQlBRGlc",
        loginData
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className={"Auth"}>
        <h1>Авторизация</h1>
        <form onSubmit={this.submitHandler}>
          {this.getInput(this.state.formControls)}
          <div className={"buttons"}>
            <button
              onClick={() => {
                this.props.sendHandler(
                  this.state.formControls.email.value,
                  this.state.formControls.password.value,
                  true
                );
              }}
              disabled={!this.state.isAllFormsValid}
            >
              Войти
            </button>
            <button
              onClick={() => {
                this.props.sendHandler(
                  this.state.formControls.email.value,
                  this.state.formControls.password.value,
                  false
                );
              }}
              disabled={!this.state.isAllFormsValid}
            >
              Зарегистрироватся
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendHandler: (email, password, isLogin) =>
      dispatch(sendHandler(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
