import { children, createContext, useEffect, useState } from "react";

export const ContestTabContext = createContext();
export const ContestTabContextProvider = ({ children }) => {
  const [tab, setTab] = useState({
    basicTab: true,
    Challenge: false,
    Setting: false,
    Register: false,
  });

  return (
    <>
      <ContestTabContext.Provider
        value={{
          tabContext: { tab, setTab },
        }}
      >
        {children}
      </ContestTabContext.Provider>
    </>
  );
};
