import React from "react";
import classes from "../styles/Loader.module.css";

export default props => (
  <div class={classes["lds-ripple"]}>
    <div></div>
    <div></div>
  </div>
);
