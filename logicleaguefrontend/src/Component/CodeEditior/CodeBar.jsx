import React from "react";
import Style from "./CodeBar.module.css";
function CodeBar({ submit }) {
  return (
    <>
      <div className={Style.CodeBarContainer}>
        <div>code</div>
        <div>
          <button onClick={submit}>Run</button>
        </div>
        <div>min-max</div>
      </div>
    </>
  );
}
export default CodeBar;
