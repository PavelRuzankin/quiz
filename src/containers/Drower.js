import React from "react";
import Link from "../components/Link";
import HomePage from "../containers/HomePage";
import Auth from "../containers/Auth";
import QuizCreater from "../containers/QuizCreater";
import QuizList from "../containers/QuizList";
import Logout from "../components/Logout";

class Drower extends React.Component {
  render() {
    const links = [
      { title: "Главная", url: "/", component: HomePage },
      { title: "Список Тестов", url: "/quiz-list", component: QuizList },
    ];

    if (this.props.isAuthorized) {
      links.push({
        title: "Создать Тест",
        url: "/create-test",
        component: QuizCreater,
      });
      links.push({ title: "Выйти", url: "/logout", component: Logout });
    } else {
      links.push({ title: "Авторизация", url: "/auth", component: Auth });
    }

    const classes = ["Drower", !this.props.onToggle ? "closed" : null];

    return (
      <div className={classes.join(" ")}>
        <ul>
          {links.map((elem, index) => {
            return <Link key={index} title={elem.title} url={elem.url} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Drower;
