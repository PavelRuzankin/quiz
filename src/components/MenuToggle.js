import React from "react";

export default props => {
  const cls = ["MenuToggle", "fa"];
  if (props.onToggle) {
    cls.push("fa-times");
    cls.push("margin");
  } else {
    cls.push("fa-bars");
  }
  return <i onClick={props.changeToggle} className={cls.join(" ")}></i>;
};
