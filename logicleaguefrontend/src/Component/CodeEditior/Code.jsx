import React, { useEffect, useRef, useState } from "react";
import Style from "./Code.module.css";
import CodeBar from "./CodeBar";
import CodeNavBar from "./CodeNavBar";
import CodeEditior from "./MonacEditior";
import axiosInstance from "../utils/request.js";
import { useContext } from "react";

import { useParams } from "react-router-dom";
import { CodeContext } from "../Challenge/CodeContext.js";

/**
 * UnderList compoente 
 * It render a codeEditior interface on playground 
 * 
 * @returns code editor interface 
 */
function CodeEditor() {
  // id of challenge
  const { id } = useParams();
  // code state
  const [code, setCode] = useState("");
  // context to get result and loading
  const {
    testCaseContext,
    loadContext,
    resultContext,
    tabContext,
    submissionResultContext,
  } = useContext(CodeContext);
  // const EditiorContianer = useRef(null);
  const [language, setLanguage] = useState("javascript");
  // run code
  const RunCode = async () => {
    try {
      loadContext.setLoading(true);
      const response = await axiosInstance.post(
        `challenges/challenge/runcode/${id}/`,
        {
          code: code,
          lang: language,
        }
      );

      loadContext.setLoading(false);
      // console.log("res when run code is  ", response);
      if (response?.status === 200) {
        resultContext.setCodeResult((prev) => ({
          ...prev,
          output: response?.data?.output,
          error: response.data.error,
          isError: response.data.isError,
        }));
        testCaseContext.setTestCases(response.data.result);
      }
    } catch (e) {}
  };
  /**
   * This funciton will handel submiton  of user solution 
   * @returns 
   */
  const submitCode = async () => {
    loadContext.setLoading(true);
    const response = await axiosInstance.post(
      `challenges/challenge/${id}/submit/`,
      {
        code: code,
        lang: language,
      }
    );
    loadContext.setLoading(false);
    // console.log("res is ", response);

    if (response?.status === 200) {
      if (response.data.isError) {
        resultContext.setCodeResult((prev) => ({
          ...prev,
          output: response?.data?.output,
          error: response.data.error,
          isError: response.data.isError,
        }));
        testCaseContext.setTestCases(response.data.result);
        return;
      }
      tabContext.setTab((prev) => ({
        testCase: false,
        terminal: false,
        submission: true,
      }));
      submissionResultContext.setSubmissionResult(response.data);
    }
  };

  return (
    <>
      {/* Contianer div */}
      <div className={Style.EditorContianer}>
        <div className={Style.Editor}>
          {/* {console.log("editor render")} */}
          {/* Editor head */}
          <div>
            <CodeBar></CodeBar>
          </div>
          {/* Code Editor nav bar */}
          <div>
            <CodeNavBar
              language={language}
              updateLanguage={(newlang) => {
                setLanguage(newlang);
              }}
              runCode={RunCode}
              submitCode={submitCode}
            ></CodeNavBar>
          </div>
          {/* code block */}
          <div className={Style.CodeEditiorContainer}>
            {/* line  */}
            <CodeEditior
              code={code}
              setCode={setCode}
              language={language}
            ></CodeEditior>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
