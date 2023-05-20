import React from "react";

function Numbtn(props) {
  const { onClick, parenthesesUnclosed } = props;
  return (
    <button
      className="Numbtn"
      onClick={onClick}
      value={props.children}
      disabled={props.children === ")" && !parenthesesUnclosed}
    >
      {props.children}
    </button>
  );
}

export default Numbtn;
