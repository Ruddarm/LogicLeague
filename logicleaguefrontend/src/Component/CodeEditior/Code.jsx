import React, { useEffect, useRef, useState } from "react";
import Style from "./Code.module.css";
import CodeBar from "./CodeBar";
import CodeNavBar from "./CodeNavBar";
import CodeEditior from "./MonacEditior";
import axiosInstance from "../utils/request.js";
function CodeEditor() {
  const [code, setCode] = useState("");

  const EditiorContianer = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const Submit = async () => {
    console.log("called")
    try {
     const  data = await axiosInstance.post("challenges/solution/",{code:code});
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
            <CodeBar submit = {Submit}></CodeBar>
          </div>
          {/* Code Editor nav bar */}
          <div>
            <CodeNavBar
              language={language}
              updateLanguage={(newlang) => {
                setLanguage(newlang);
              }}
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
