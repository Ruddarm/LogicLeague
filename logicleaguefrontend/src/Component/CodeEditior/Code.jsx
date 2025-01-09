import React, { useEffect, useRef, useState } from "react";
import Style from "./Code.module.css";
import CodeBar from "./CodeBar";
import CodeNavBar from "./CodeNavBar";
import CodeEditior from "./MonacEditior";
import axiosInstance from "../utils/request.js";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CodeContext } from "../Challenge/CodeContext.js";
// code editor component
function CodeEditor() {
  // id of challenge
  const { id } = useParams();
  // code state
  const [code, setCode] = useState("");
  // context to get result and loading
  const { resultContext, loadContext } = useContext(CodeContext);
  // const EditiorContianer = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const RunCode = async () => {
    try {
      loadContext.setLoading(true);
      const response = await axiosInstance.post(`challenges/challenge/runcode/${id}/`, {
        code: code,
        lang: language,
      });
      loadContext.setLoading(false);
      console.log(response);
      if (response?.status === 200) {
        resultContext.setResult((res) => ({
          ...res,
          output: response?.data?.output,
          error: response.data.error,
          isError: response.data.isError,
          result: response.data.result,
        }));
      }
    } catch (e) {}
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
              runcode={RunCode}
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
