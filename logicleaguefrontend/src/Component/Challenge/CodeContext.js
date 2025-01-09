import { children, createContext, useEffect, useState } from "react";

export const CodeContext = createContext();
export const CodeContextProvider = ({ children }) => {
  // code state
  const [code, setCode] = useState("write ur code here\n\n\n\n");
  // result state
  const [result, setResult] = useState({
    output: "",
    error: "",
    result: [],
  });
  // loading state
  const [load, setLoading] = useState(false);
  // terminal state
  const [terminal, openTerminal] = useState(false);

  return (
    <>
      <CodeContext.Provider
        value={{
          codeContext: { code, setCode },
          resultContext: { result, setResult },
          loadContext: { load, setLoading },
          terminalContext : {terminal,openTerminal}
        }}
      >
        {children}
      </CodeContext.Provider>
    </>
  );
};
