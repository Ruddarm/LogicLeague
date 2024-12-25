import Style from "./TestCase.module.css";
import { useState } from "react";
function testcase() {}
function TestCase() {
  const [terminal, Openterminal] = useState(false);
  return (
    <>
      <div className={Style.Container}>
        <div className={Style.Header}>
          <button>Test Cases</button>
          <button>
            <img src="/Terminal.png"></img>Terminal
          </button>
        </div>
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
      </div>
    </>
  );
}
export default TestCase;
