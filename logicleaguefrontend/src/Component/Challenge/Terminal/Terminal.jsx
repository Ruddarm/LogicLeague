import React, { useContext } from "react";

import { CodeContext } from "../CodeContext";

import Style from "./Terminal.module.css";

function Terminal() {
  const { resultContext } = useContext(CodeContext);
  return (
    <>
      <div className={Style.terminalContainer}>
        {resultContext?.iserror ? <h1>Error</h1> : <></>}
        <pre id={Style.errormsg}>{resultContext.result.error}</pre>
        <pre>{resultContext.result.output}</pre>
      </div>
    </>
  );
}
export default Terminal;
