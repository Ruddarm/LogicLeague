import { children, createContext, useEffect, useState } from "react";
import { fetchTestCases } from "./Challengeapi";

export const CodeContext = createContext();
export const CodeContextProvider = ({ children, id }) => {
  // code state
  const [code, setCode] = useState("write ur code here\n\n\n\n");
  // result state
  const [testCases, setTestCases] = useState([]);
  const [result,setCodeResult] = useState({"output":"","error":"","isError":false});
  // loading state
  const [load, setLoading] = useState(false);
  // terminal state
  const [terminal, openTerminal] = useState(false);
  // submission tab state
  const [submitTab , openSubmitTab] = useState(false);
  // const tab context 
  const [tab,setTab] = useState({testCase:true,terminal:false,submission:false});
  // submission result stat
  const [submissionResult , setSubmissionResult] = useState({});
  
  const GetTestCases = async () => {
    const testCaseResponse = await fetchTestCases(id, true);
    if (testCaseResponse?.status === 200) {
      setTestCases(testCaseResponse.data.testCases);
    }
  };
  useEffect(() => {
    GetTestCases();
  }, [id]);

  return (
    <>
      <CodeContext.Provider
        value={{
          codeContext: { code, setCode },
          testCaseContext: { testCases, setTestCases },
          loadContext: { load, setLoading },
          resultContext: { result, setCodeResult },
          terminalContext: { terminal, openTerminal },
          tabContext: { tab, setTab },
          submitTabContext: { submitTab, openSubmitTab },
          submissionResultContext: { submissionResult, setSubmissionResult },
        }}
      >
        {children}
      </CodeContext.Provider>
    </>
  );
};
