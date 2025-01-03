import React, { useState, useContext, useRef } from "react";
import Style from "./ChallengePlayground.module.css";
import TestCase from "./Terminal/TerminalContainer";
import { ResizeContext } from "./ResizeContext";
import CodeEditor from "../CodeEditior/Code";

import Header from "../utils/header";
function CodeConainter() {
  const { heightContext, maxContext } = useContext(ResizeContext);
  const codeContainerRef = useRef(null);

  const handleVerticalMouseDown = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = codeContainerRef.current.offsetHeight;

    const handleMouseMove = (moveEvent) => {
      const newHeight = startHeight + (moveEvent.clientY - startY);
      if (newHeight >= 100) {
        heightContext.setHeight(newHeight);
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
    <>
      {maxContext.max.desc ? (
        <></>
      ) : (
        <>
          <div className={`${Style.CodeContainer}`}>
            {maxContext.max.terminal || maxContext.max.desc ? (
              <></>
            ) : (
              <>
                <div
                  ref={codeContainerRef}
                  style={{ height: heightContext.height }}
                  className={
                    maxContext.max.codeEditior
                      ? `${Style.CodeEditor} ${Style.flexOne}`
                      : Style.CodeEditor
                  }
                >
                  <CodeEditor />
                </div>
                <div
                  className={Style.VResizer}
                  onMouseDown={handleVerticalMouseDown}
                />
              </>
            )}

            <div
              className={
                maxContext.max.codeEditior || maxContext.max.desc
                  ? `${Style.TestCaseContainer} ${Style.displayNone}`
                  : maxContext.max.terminal
                  ? `${Style.TestCaseContainer} mt`
                  : Style.TestCaseContainer
              }
            >
              <TestCase></TestCase>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default CodeConainter;
