import React from "react";
import { ChangeToggleContext } from "../hoc/Layout/Layout";
import { NavLink } from "react-router-dom";

export default props => {
  return (
    <ChangeToggleContext.Consumer>
      {changeToggle => {
        return (
          <li>
            <NavLink
              exact
              onClick={changeToggle}
              to={props.url}
              activeClassName={"active"}
            >
              {props.title}
            </NavLink>
          </li>
        );
      }}
    </ChangeToggleContext.Consumer>
  );
};
