import { children, createContext, useEffect, useState } from "react";
import { fetchTestCases } from "./Challengeapi";
import axiosInstance from "../utils/request";

export const CodeContext = createContext();
/*
 * under list comonent is use to share a state between terminal and code editior 
   using context 
 * @param {children} component to be rendered
 * @param {id} Challenge id
 * @returns  {code,testcasecontext,loadContext,submissionResultContext,CodeContextProvider,pastSubmissionContext}
 */
export const CodeContextProvider = ({ children, id }) => {
  // code state
  const [code, setCode] = useState("write ur code here\n\n\n\n");
  // result state
  const [testCases, setTestCases] = useState([]);
  const [result,setCodeResult] = useState({"output":"","error":"","isError":false});
  // loading state
  const [load, setLoading] = useState(false);
  // const tab context 
  const [tab,setTab] = useState({testCase:true,terminal:false,submission:false});
  // submission result stat
  const [submissionResult , setSubmissionResult] = useState(undefined);
  // past submissong records 
  const [pastSubmissions, setPastSubmission] = useState({})
  
  const GetTestCases = async () => {
    const testCaseResponse = await fetchTestCases(id, true);
    if (testCaseResponse?.status === 200) {
      setTestCases(testCaseResponse.data.testCases);
    }
  };
  const GetSolution = async()=> {
    const solutionresponse = await axiosInstance.get(`challenges/challenge/solution/${id}/`)
    if (solutionresponse?.status === 200){
        setPastSubmission(solutionresponse.data)
    }
  }
  useEffect(() => {
    GetTestCases();
    GetSolution();
  }, [id]);

  return (
    <>
      <CodeContext.Provider
        value={{
          codeContext: { code, setCode },
          testCaseContext: { testCases, setTestCases },
          loadContext: { load, setLoading },
          resultContext: { result, setCodeResult },
          tabContext: { tab, setTab },
          submissionResultContext: { submissionResult, setSubmissionResult },
          pastSubmissionContext : {pastSubmissions,setPastSubmission}
        }}
      >
        {children}
      </CodeContext.Provider>
    </>
  );
};
