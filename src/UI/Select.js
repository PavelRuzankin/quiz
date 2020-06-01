import React from "react";

export default (props) => {
  const htmlFor = props.label + parseInt(Math.random() * 1000);
  return (
    <div className={"Select"}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select id={htmlFor} onChange={props.onChange}>
        {props.options.map((elem) => {
          return (
            <option key={elem} value={elem}>
              {elem + 1}
            </option>
          );
        })}
      </select>
    </div>
  );
};
