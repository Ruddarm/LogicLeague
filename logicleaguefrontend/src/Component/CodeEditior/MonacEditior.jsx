import React, { useEffect, useRef, useState, useContext } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ResizeContext } from "../Challenge/ResizeContext";
import Style from "./MonacEditior.module.css";
const CodeEditor = ({ code, setCode, language }) => {
  const { heightContext, widthContext , maxContext } = useContext(ResizeContext);
  // const [code, setCode] = useState("// Write your code here");
  const editorref = useRef(null);
  const handleEditorChange = (value) => {
    setCode(value);
  };

  useEffect(() => {
    editorref.current?.layout();
  }, [heightContext.height, widthContext.width , maxContext.max]);
  const handelOnMount = (editor) => {
    editorref.current = editor;
    editorref.current.layout();
  };

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
      {/* Recreate MonacoEditor on key cFhange */}
      <MonacoEditor
        language={language}
        className={Style.MonacoEditor}
        value={code}
        onChange={handleEditorChange}
        theme="vs-light"
        options={{
          selectOnLineNumbers: true,
          automaticLayout: false,
        }}
        onMount={handelOnMount}
      />
    </div>
  );
};

export default CodeEditor;
