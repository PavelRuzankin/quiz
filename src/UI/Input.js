import React from "react";

export default (props) => {
  const cls = ["Input"];

  const htmlFor = props.label + parseInt(Math.random() * 1000);

  if (!props.valid && props.touched) {
    cls.push("Invalid");
  }
  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={props.type || "text"}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value, props.id)}
      />
      <span>{!props.valid && props.touched ? props.errorMessage : null}</span>
    </div>
  );
};
