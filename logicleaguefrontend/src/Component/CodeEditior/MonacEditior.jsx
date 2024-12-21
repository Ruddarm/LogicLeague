import React, { useEffect, useRef, useState , useContext } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ResizeContext } from "../Challenge/ResizeContext";
import Style from "./MonacEditior.module.css";
import { Editor } from "@monaco-editor/react";
const CodeEditor = ({ language }) => {
  const { heightContext, widthContext } = useContext(ResizeContext);
  const [code, setCode] = useState("// Write your code here");
  const editorref = useRef(null)
  const handleEditorChange = (value) => {

    setCode(value);
    console.log(code)
  };
  useEffect(()=>{
    console.log(editorref.current)
    editorref.current?.layout()
  },[heightContext.height,widthContext.width])
  const handelOnMount =(editor)=>{
    editorref.current=editor
    editorref.current.layout()
  }
  

  return (
    <div
      className={Style.demo}
      style={{
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      {/* Recreate MonacoEditor on key change */}
      <MonacoEditor
        ref={editorref}
        language={language}
        className={Style.MonacoEditor}
        value={code}
        onChange={handleEditorChange}
        theme="vs-light"
        options={{
          selectOnLineNumbers: true,
          automaticLayout:false
        }}
        onMount={handelOnMount}
        
      /> 

    </div>
  );
};

export default CodeEditor;
