import { children, createContext, useEffect, useState } from "react";

export const ResizeContext = createContext();
export const ResizeProvider = ({ children }) => {
  const [width, setWidth] = useState(450);
  const [height, setHeight] = useState(250);
  const [max, setMax] = useState({
      desc: false,
      codeEditior:false,
      terminal: false,
    });
  return (
    <>
      <ResizeContext.Provider
        value={{
          widthContext: { width, setWidth },
          heightContext: { height, setHeight },
          maxContext :{max,setMax}
        }}
      >
        {children}
      </ResizeContext.Provider>
    </>
  );
};
