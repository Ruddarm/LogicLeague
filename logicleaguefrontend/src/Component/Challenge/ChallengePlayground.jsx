import React, { useRef, useState, useEffect, useContext } from "react";
import Style from "./ChallengePlayground.module.css";
import CodeEditor from "../CodeEditior/Code";
import { ResizeContext } from "./ResizeContext";
import ChallengeDesc from "./ChallengeDescripiton";
import TestCase from "./TestCase";

export default () => {
  const { heightContext, widthContext } = useContext(ResizeContext);
  const descBoxRef = useRef(null);
  const codeContainerRef = useRef(null);
  

  // Handel horizonatlly layout
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

  //handle layout verticaly
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
    <div className={Style.PlaygroundContainer}>
      {/* <div
        ref={descBoxRef}
        style={{ width: widthContext.width }}
        className={Style.ChallengeDescBox}
      >
        <ChallengeDesc />
      </div>
      <div className={Style.Resizer} onMouseDown={handleHorizontalMouseDown} />
      <div className={Style.CodeContainer}>
        <div
          ref={codeContainerRef}
          style={{ height: heightContext.height , maxHeight:'80%'}}
          className={Style.CodeEditor}
        >
          <CodeEditor />
        </div>
        <div className={Style.VResizer} onMouseDown={handleVerticalMouseDown} />
        <div className={Style.TestCaseContainer}>
          <TestCase></TestCase>
        </div>
      </div> */}
      <div className={Style.demo}>
        fuck you
      </div>
    </div>
  );
};
