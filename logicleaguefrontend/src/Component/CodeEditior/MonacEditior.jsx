import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = ({language}) => {
  const [code, setCode] = useState('// Write your code here');
  const handleEditorChange = (value) => {
    setCode(value);
  };
  
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MonacoEditor
        width="100%"
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-light"
      />
    </div>
  );
};

export default CodeEditor;
