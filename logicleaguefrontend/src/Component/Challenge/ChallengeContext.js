import { children, createContext, useEffect, useState } from "react";
import { FetchChallengeByID } from "./Challengeapi";
export const PlayGroundChallengeContext = createContext();
export const PlayGroundChallengeContextProvider = ({ children }) => {
  const [challengeData, setChallengeData] = useState({});
  const [testCaseData, setTestCaseData] = useState([]);
  return (
    <>
      <PlayGroundChallengeContext.Provider
        value={{
          challengeContext: { challengeData, setChallengeData },
          testCasesContext : {testCaseData,setTestCaseData}
        }}

      >
        {children}
      </PlayGroundChallengeContext.Provider>
    </>
  );
};
