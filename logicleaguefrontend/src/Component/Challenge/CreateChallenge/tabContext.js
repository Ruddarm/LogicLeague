import { children, createContext, useEffect, useState } from "react";

export const CreateChallengeTabContext = createContext();
export const CreateChallengeTabContextProvider = ({ children }) => {
  const [tab, setTab] = useState({
    basicTab: true,
    TestCaseTab: false,
    Setting: false,
  });

  return (
    <>
      <CreateChallengeTabContext.Provider
        value={{
          tabContext: { tab, setTab },
        }}
      >
        {children}
      </CreateChallengeTabContext.Provider>
    </>
  );
};
