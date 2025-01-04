import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

const CustomMonacoEditor = ({ language = "javascript", value = "", onChange }) => {
  const editorRef = useRef(null); // Reference for the editor container
  const monacoEditorInstance = useRef(null); // Reference for the editor instance

  useEffect(() => {
    if (editorRef.current) {
      // Initialize the editor
      monacoEditorInstance.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: "vs-light",
        automaticLayout: true, // Automatically adjust size
      });

      // Subscribe to editor changes
      const model = monacoEditorInstance.current.getModel();
      const disposable = model.onDidChangeContent(() => {
        if (onChange) {
          onChange(model.getValue());
        }
      });

      // Cleanup on component unmount
      return () => {
        disposable.dispose();
        monacoEditorInstance.current.dispose();
      };
    }
  }, [language, value, onChange]);

  return (
    <div
      ref={editorRef}
      style={{
        height: "100%", // Adjust height based on parent
        width: "100%", // Adjust width based on parent
        overflow: "hidden",
      }}
    />
  );
};

export default CustomMonacoEditor;
