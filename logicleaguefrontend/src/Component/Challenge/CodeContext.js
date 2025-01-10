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
        }}
      >
        {children}
      </CodeContext.Provider>
    </>
  );
};
