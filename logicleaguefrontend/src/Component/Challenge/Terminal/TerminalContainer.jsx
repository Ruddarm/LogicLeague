import Style from "./TerminalContainer.module.css";
import { useState, useContext, useEffect } from "react";
import { ResizeContext } from "../ResizeContext.jsx";
import { CodeContext } from "../CodeContext.js";
import Terminal from "./Terminal.jsx";
import Loader from "../../utils/loading.jsx";
function TerminalContainer({ testCase, Output }) {
  const { maxContext } = useContext(ResizeContext);
  const { loadContext, terminalContext } = useContext(CodeContext);
  const maxTerminalEditior = () => {
    maxContext.setMax((prev) => ({
      ...prev,
      terminal: !maxContext.max.terminal,
    }));
  };
  useEffect(() => {}, [loadContext.load]);
  const [terminal, Openterminal] = useState(false);
  return (
    <>
      {!loadContext.load ? (
        <>
          <div className={Style.Container}>
            <div className={Style.Header}>
              <button onClick={() => terminalContext.openTerminal(false)}>
                Test Cases
              </button>
              <button
                onClick={() => {
                  terminalContext.openTerminal(true);
                }}
              >
                <img src="/Terminal.png"></img>Terminal
              </button>
              <div className={Style.optionContinaer}>
                <button onClick={maxTerminalEditior}>
                  <img src="maximize.png"></img>
                </button>
              </div>
            </div>
            {!terminalContext.terminal ? (
              <>
                <div className={Style.TestCaseContiner}>
                  <div className={Style.TestCaseIndex}>
                    <div className={Style.caseIndex}>Case 1</div>
                    <div className={Style.caseIndex}>Case 2</div>
                    <div className={Style.caseIndex}>Case 3</div>
                  </div>
                  <div className={Style.CaseDisplay}>
                    <div className={Style.Case}>
                      <span>Input</span>
                      <div>[0,1,0]</div>
                    </div>
                    <div className={Style.Case}>
                      <span>Input</span>
                      <div>[0,1,0]</div>
                    </div>
                    <div className={Style.Case}>
                      <span>Output</span>
                      <div>[0,1,0]</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Terminal></Terminal>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <Loader></Loader>
        </>
      )}
    </>
  );
}
export default TerminalContainer;
