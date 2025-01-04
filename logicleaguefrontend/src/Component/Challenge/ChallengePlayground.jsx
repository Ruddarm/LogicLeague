import React, { useRef, useState, useEffect, useContext } from "react";
import Style from "./ChallengePlayground.module.css";
import { useParams } from "react-router-dom";
// import CodeEditor from "../CodeEditior/Code";
import { ResizeContext } from "./ResizeContext";
import ChallengeDesc from "./ChallengeDescription/ChallengeDescripiton";
// import TestCase from "./Terminal/TerminalContainer";
import {
  FetchChallengeByID,
  fetchTestCase,
  fetchTestCases,
} from "./Challengeapi";
// import Header from "../utils/header";
import CodeConainter from "./ChallengeCodeContainer";
import { CodeContextProvider } from "./CodeContext";
import { PlayGroundChallengeContext } from "./ChallengeContext";
// import axiosInstance from "../utils/request";
import Loader from "../utils/loading";
export default () => {
  const { widthContext, maxContext } = useContext(ResizeContext);
  const { challengeContext, testCasesContext } = useContext(
    PlayGroundChallengeContext
  );
  const descBoxRef = useRef(null);
  const { id } = useParams();
  const [loadChallenge, setLoadChallenge] = useState(true);
  useEffect(() => {
    GetChallenge();
  }, [id]);
  const GetChallenge = async () => {
    const response = await FetchChallengeByID(id);
    const testcaseresponse = await fetchTestCases(id, false, true);
    console.log(testcaseresponse);
    setLoadChallenge(false);
    if (response?.status == 200 && testcaseresponse?.status == 200) {
      challengeContext.setChallengeData(response.data?.challenge);
      testCasesContext.setTestCaseData(testcaseresponse.data?.testCases);
    } else if (response?.status == 200) {
      challengeContext.setChallengeData(response.data?.challenge);
    }
  };
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
          style={{
            width: widthContext.width,
            maxWidth: maxContext.max.desc ? "100%" : "70%",
          }}
          className={
            maxContext.max.codeEditior || maxContext.max.terminal
              ? `${Style.ChallengeDescBox} ${Style.displayNone}`
              : maxContext.max.desc
              ? `${Style.ChallengeDescBox} ${Style.flexOne}`
              : Style.ChallengeDescBox
          }
        >
          {loadChallenge && <Loader></Loader>}
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
