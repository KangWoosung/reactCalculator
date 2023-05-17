import React from "react";

function Numbtn(props) {
  return (
    <button className="Numbtn" onClick={props.onClick} value={props.children}>
      {props.children}
    </button>
  );
}

export default Numbtn;
