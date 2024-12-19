import React, { useState, useRef } from "react";

const CodeEditor = () => {
  const [lines, setLines] = useState([""]); // Initial empty line
  const editorRef = useRef(null); // Reference to the parent div

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    const parentNode = range.startContainer;

    return { startOffset, parentNode };
  };

  const restoreCursorPosition = (cursor) => {
    if (!cursor || !cursor.parentNode) return;

    const selection = window.getSelection();
    const range = document.createRange();

    try {
      range.setStart(cursor.parentNode, cursor.startOffset);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      console.error("Error restoring cursor:", error);
    }
  };

  const handleInput = (index, text) => {
    const cursor = saveCursorPosition();

    const updatedLines = [...lines];
    updatedLines[index] = text;
    setLines(updatedLines);

    requestAnimationFrame(() => {
      restoreCursorPosition(cursor); // Restore cursor after the DOM update
    });
  };

  const handleKeyDown = (e, index) => {
    const cursor = saveCursorPosition();

    if (e.key === "Enter") {
      e.preventDefault();
      const updatedLines = [...lines];
      updatedLines.splice(index + 1, 0, ""); // Insert a new line
      setLines(updatedLines);

      requestAnimationFrame(() => {
        // Move the cursor to the new line
        const newLine = editorRef.current.children[index + 1];
        if (newLine) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(newLine);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      });
    } else if (e.key === "Backspace" && lines[index] === "" && index > 0) {
      e.preventDefault();
      const updatedLines = [...lines];
      updatedLines.splice(index, 1); // Delete the current line
      setLines(updatedLines);

      requestAnimationFrame(() => {
        // Move the cursor to the end of the previous line
        const previousLine = editorRef.current.children[index - 1];
        if (previousLine) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(previousLine);
          range.collapse(false); // Move to the end of the line
          selection.removeAllRanges();
          selection.addRange(range);
        }
      });
    }
  };

  return (
    <div
      ref={editorRef}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        fontFamily: "monospace",
      }}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          contentEditable="true"
          suppressContentEditableWarning={true}
          onInput={(e) => handleInput(index, e.target.innerText)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            whiteSpace: "pre",
            outline: "none",
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default CodeEditor;
