import Style from "./TerminalContainer.module.css";
import { useState, useContext, useEffect } from "react";
import { ResizeContext } from "../ResizeContext.jsx";
import { CodeContext } from "../CodeContext.js";
import { useParams } from "react-router-dom";
import { fetchTestCases } from "../Challengeapi.js";
import Terminal from "./Terminal.jsx";
import Loader from "../../utils/loading.jsx";
function GetIndex({ index, setIndex }) {
  return (
    <div
      onClick={() => {
        setIndex(index);
      }}
      className={Style.caseIndex}
    >
      Case {index + 1}
    </div>
  );
}
function GetCase({ variable, value }) {
  return (
    <>
      <div className={Style.Case}>
        <span>{variable}</span>
        <div style={{height:"auto"}}><pre style={{margin:0}}>{value}</pre></div>
      </div>
    </>
  );
}
function TerminalContainer({ Output }) {
  const { maxContext } = useContext(ResizeContext);
  const { loadContext, terminalContext } = useContext(CodeContext);
  const { id } = useParams("id");
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

  const [terminal, Openterminal] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const GetTestCases = async () => {
    const testCaseResponse = await fetchTestCases(id, true);
    if (testCaseResponse?.status === 200) {
      setTestCases(testCaseResponse.data.testCases);
    }
  };
  useEffect(() => {
    GetTestCases();
  }, [loadContext.load, id]);
  // console.log(testCases);
  return (
    <>
      <div className={Style.Container}>
        {loadContext.load && <Loader></Loader>}
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
              <img src="/maximize.png"></img>
            </button>
          </div>
        </div>
        {!terminalContext.terminal ? (
          <>
            <div className={Style.TestCaseContiner}>
              <div className={Style.TestCaseIndex}>
                {testCases.map((data, index) => (
                  <GetIndex
                    key={index}
                    setIndex={setIndex}
                    index={index}
                  ></GetIndex>
                ))}
              </div>
              <div className={Style.CaseDisplay}>
                {testCases[caseIndex]?.input?.map((data, index) => (
                  <GetCase
                    key={index}
                    variable={data.variable}
                    value={data.value}
                  ></GetCase>
                ))}
                <GetCase
                  variable={"Expected output"}
                  value={testCases[caseIndex]?.output}
                />
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
  );
}
export default TerminalContainer;
