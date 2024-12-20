import React, { useState } from "react";
import Style from "./Code.module.css";
import CodeBar from "./CodeBar";
import CodeNavBar from "./CodeNavBar";
import CodeEditior from "./MonacEditior";
function CodeEditor() {
  const [code, setCode] = useState("");
  const [language,setLanguage] = useState("javascript")
  console.log(language)
  return (
    <>
      {/* Contianer div */}
      <div className={Style.EditorContianer}>
        <div className={Style.Editor}>
          {/* Editor head */}
          <div>
            <CodeBar></CodeBar>
          </div>
          {/* Code Editor nav bar */}
          <div>
            <CodeNavBar language={language} updateLanguage={(newlang)=>{setLanguage(newlang)}}></CodeNavBar>
          </div>
          {/* code block */}
          <div className={Style.CodeEditiorContainer}>
            {/* line  */}
            <CodeEditior language={language}></CodeEditior>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
