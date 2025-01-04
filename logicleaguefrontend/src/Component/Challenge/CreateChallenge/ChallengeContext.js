import { children, createContext, useEffect, useState } from "react";

export const ChallengeContext = createContext();
export const ChallengeContextProvider = ({ children }) => {
  const [challenge, setChallenge] = useState({
    challengeName: "",
    challengeDesc: "",
    problemStatement: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
  });

  return (
    <>
      <ChallengeContext.Provider
        value={{
          challengeContext: { challenge, setChallenge },
        }}
      >
        {children}
      </ChallengeContext.Provider>
    </>
  );
};
