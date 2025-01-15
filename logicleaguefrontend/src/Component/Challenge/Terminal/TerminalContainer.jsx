import Style from "./TerminalContainer.module.css";
import { useState, useContext, useEffect } from "react";
import { ResizeContext } from "../ResizeContext.jsx";
import { CodeContext } from "../CodeContext.js";
import { useParams } from "react-router-dom";
import { fetchTestCases } from "../Challengeapi.js";
import Terminal from "./Terminal.jsx";
import Submission from "./Submission.jsx";
import TestCase from "./testCaseDisplay.jsx";
import Loader from "../../utils/loading.jsx";
import TestCaseIndex from "./testCaseIndex.jsx";

// terminal container component
function TerminalContainer({ Output }) {
  const { maxContext } = useContext(ResizeContext);
  const {
    loadContext,
    testCaseContext,
    resultContext,
    tabContext,
  } = useContext(CodeContext);
  const [caseIndex, setCaseIndex] = useState(0);
  function setIndex(index) {
    setCaseIndex(index);
  }
  const maxTerminalEditior = () => {
    maxContext.setMax((prev) => ({
      ...prev,
      terminal: !maxContext.max.terminal,
    }));
  };
  useEffect(() => {
    if (resultContext.result.error) {
      tabContext.setTab({testCase:false,terminal:true,submission:false});
    }
  }, [resultContext.result]);

  // const [terminal, Openterminal] = useState(false);
  // const [testCases, setTestCases] = useState([]);
  // const GetTestCases = async () => {
  //   const testCaseResponse = await fetchTestCases(id, true);
  //   if (testCaseResponse?.status === 200) {
  //     setTestCases(testCaseResponse.data.testCases);
  //   }
  // };
  // useEffect(() => {
  //   GetTestCases();
  // }, [loadContext.load, id]);

  return (
    <>
      <div className={Style.Container}>
        {loadContext.load && <Loader></Loader>}
        <div className={Style.Header}>
          <button
            onClick={() =>
              tabContext.setTab({
                testCase: true,
                terminal: false,
                submission: false,
              })
            }
          >
            Test Cases
          </button>
          <button
            onClick={() =>
              tabContext.setTab({
                testCase: false,
                terminal: true,
                submission: false,
              })
            }
          >
            <img src="/Terminal.png" alt="terminal"></img>Terminal
          </button>
          <button onClick={() => tabContext.setTab({ testCase: false, terminal: false, submission: true })}>
            Submission
          </button>
          <div className={Style.optionContinaer}>
            <button onClick={maxTerminalEditior}>
              <img src="/maximize.png" alt="max"></img>
            </button>
          </div>
        </div>
        {/* if terminal  and submit tab is not open open test cases */}
        {tabContext.tab.testCase ? (
          <>
            <div className={Style.TestCaseContiner}>
              <div className={Style.TestCaseIndex}>
                {testCaseContext.testCases.map((data, index) => (
                  <TestCaseIndex
                    key={index}
                    caseIndex={caseIndex}
                    setIndex={setIndex}
                    index={index}
                    result={data.result}
                  ></TestCaseIndex>
                ))}
              </div>
              <div className={Style.CaseDisplay}>
                {testCaseContext.testCases[caseIndex]?.input?.map(
                  (data, index) => (
                    <TestCase
                      key={index}
                      variable={data.variable}
                      value={data.value}
                    ></TestCase>
                  )
                )}
                <TestCase
                  variable={"Expected output"}
                  value={testCaseContext.testCases[caseIndex]?.output}
                />
                {testCaseContext.testCases[caseIndex]?.ans && (
                  <>
                    <TestCase
                      variable={"Your output"}
                      value={testCaseContext.testCases[caseIndex].ans}
                    ></TestCase>
                  </>
                )}
              </div>
            </div>
          </>
        ) : tabContext.tab.submission ? (
          <Submission></Submission>
        ) : (
          <>
            <Terminal></Terminal>
          </>
        )}
      </div>
    </>
  );
}
export default TerminalContainer;
