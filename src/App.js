import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz";
import HomePage from "./containers/HomePage";
import Auth from "./containers/Auth";
import QuizCreater from "./containers/QuizCreater";
import QuizList from "./containers/QuizList";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import "./styles/style.sass";
import { connect } from "react-redux";
import { autoLogin } from "./store/actions/authAction";
import Logout from "./components/Logout";

library.add(fab, faTimes, faCheck);

class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/create-test" component={QuizCreater} />
          <Route path="/quiz/:number" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/quiz-list" component={QuizList} />
          <Route path="/" component={HomePage} exact />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthorized: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
