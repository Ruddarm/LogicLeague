import { children, createContext, useEffect, useState } from "react";

export const ResizeContext = createContext();
export const ResizeProvider = ({ children }) => {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(250);
  return (
    <>
      <ResizeContext.Provider
        value={{
          widthContext: { width, setWidth },
          heightContext: { height, setHeight },
        }}
      >
        {children}
      </ResizeContext.Provider>
    </>
  );
};
