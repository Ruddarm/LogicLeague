import React, { useRef, useState, useEffect, useContext } from "react";
import Style from "./ChallengePlayground.module.css";
import CodeEditor from "../CodeEditior/Code";
import { ResizeContext } from "./ResizeContext";
import ChallengeDesc from "./ChallengeDescription/ChallengeDescripiton";
import TestCase from "./Terminal/TerminalContainer";
import Header from "../utils/header";
import CodeConainter from "./ChallengeCodeContainer";
import { CodeContextProvider } from "./CodeContext";
export default () => {
  const { heightContext, widthContext, maxContext } = useContext(ResizeContext);
  const descBoxRef = useRef(null);
  const codeContainerRef = useRef(null);

  const handleHorizontalMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = descBoxRef.current.offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth >= 100) {
        widthContext.setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={Style.PlaygroundContainer}>
      <div className={Style.innerPlayground}>
        <div
          ref={descBoxRef}
          style={{ width: widthContext.width, maxWidth: "70%" }}
          className={
            maxContext.max.codeEditior || maxContext.max.terminal
              ? `${Style.ChallengeDescBox} ${Style.displayNone}`
              : Style.ChallengeDescBox
          }
        >
          <ChallengeDesc />
        </div>
        {maxContext.codeEditior || maxContext.terminal || maxContext.desc || (
          <div
            className={Style.Resizer}
            onMouseDown={handleHorizontalMouseDown}
          />
        )}

        <CodeContextProvider>
          <CodeConainter></CodeConainter>
        </CodeContextProvider>
      </div>
    </div>
  );
};
