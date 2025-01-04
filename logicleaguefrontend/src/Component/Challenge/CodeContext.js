import { children, createContext, useEffect, useState } from "react";

export const CodeContext = createContext();
export const CodeContextProvider = ({ children }) => {
  const [code, setCode] = useState("write ur code here\n\n\n\n");
  const [result, setResult] = useState({
    output: "",
    error: "",
  });
  const [load, setLoading] = useState(false);
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
