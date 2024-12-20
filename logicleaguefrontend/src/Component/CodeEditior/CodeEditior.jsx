import React, { useState, useRef } from "react";
import Style from "./CodeEditior.module.css";
const CodeEditor = () => {
  const editorRef = useRef(null);
  const [lines, updateLine] = useState(["",""]);
  const operationQueue = useRef([]);

  // Function to execute queued operations in a single animation frame
  const processOperations = () => {
    while (operationQueue.current.length) {
      const operation = operationQueue.current.shift();
      operation();
    }
  };

  const enqueueOperation = (operation) => {
    operationQueue.current.push(operation);
    requestAnimationFrame(processOperations);
  };

  // console.log(edtiorref);
  const saveCursor = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;
    const parentNode = range.startContainer;
    return { startOffset, parentNode };
  };
  const restoreCursorPosition = (cursor) => {
    console.dir(cursor)
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

  //Handle method for input in code editior
  const handelOnInput = (index, text) => {
    // console.log(text);
    const cursor = saveCursor();
    const newLines = [...lines];
    newLines[index] = text;
    updateLine(newLines);
    requestAnimationFrame(()=>{
      restoreCursorPosition(cursor);
    })
  };
  // Handel key donw evetns
  const handelKeyDown = (event, index) => {
    let cursor = saveCursor();
    // console.log(event);
    if (event.key === "Enter") {
      event.preventDefault();
      enqueueOperation(() => {
        const updatedCode = [...lines];
        updatedCode.splice(index + 1, 0, "");
        updateLine(updatedCode);
        focusNextLine(index + 1);
      });
    } else if (event.key === "Backspace") {
      console.log(cursor.startOffset);
      if (index > 0 && cursor.startOffset === 0 && !lines[index].trim()) {
        event.preventDefault();
        enqueueOperation(() => {
          const updatedCode = [...lines];
          updatedCode.splice(index, 1); // Remove the empty line
          updateLine(updatedCode);
          focusNextLine(index - 1, false); // Place the cursor at the end of the previous line
        });
      }
    } else if (event.key === "ArrowDown") {
      let cursor = saveCursor();
      requestAnimationFrame(() => {
        const nextLine = editorRef?.current?.children[index + 1];
        if (nextLine) {
          const selection = window.getSelection();
          const range = document.createRange();
          const textLength = nextLine.textContent.length;
          const offset = Math.min(cursor.startOffset, textLength);
          range.setStart(nextLine.firstChild || nextLine, offset);
          range.collapse(true);

          selection.removeAllRanges();
          selection.addRange(range);
        }
      });
    } else if (event.key === "ArrowUp") {
      let cursor = saveCursor();
      requestAnimationFrame(() => {
        const prevLine = editorRef?.current?.children[index - 1];
        if (prevLine) {
          const selection = window.getSelection();
          const range = document.createRange();
          const textLength = prevLine.textContent.length;

          // Set cursor offset to same as the next line or end of previous line
          const offset = Math.min(cursor.startOffset, textLength);
          range.setStart(prevLine.firstChild || prevLine, offset);
          range.collapse(true);

          selection.removeAllRanges();
          selection.addRange(range);
        }
      });
    } else if (event.ctrlKey && event.key == "a") {
      event.preventDefault();
      // console.log(editorRef)
      const codeElements = Array.from(editorRef.current.children);
      console.log(codeElements);
      const selection = window.getSelection();
      selection.removeAllRanges();
      const range = document.createRange();

      range.setStart(codeElements[0], 0);
      const lastElement = codeElements[codeElements.length - 1];
      range.setEnd(
        lastElement.lastChild || lastElement,
        lastElement.textContent.length
      );
      selection.addRange(range);

      // console.log("copy rkna hia mc ko ")
    } else if (event.key === "Delete" || event.key === "Backspace") {
      const selection = window.getSelection();
      if (!selection.isCollapsed) {
        event.preventDefault();
        // deleteSelectedContent();
      }
    }
  };
  // Handel paste event
  const handelPaste = (event, index) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text/plain");
    const pastedLines = pastedData.split("\n");
    const updatedCode = [...lines];
    updatedCode.splice(index, 1, ...pastedLines);
    updateLine(updatedCode);
    requestAnimationFrame(() => {});
  };
  // foucse on nExt line
  const focusNextLine = (index, atStart = true) => {
    const nextLine = editorRef.current.children[index];
    if (nextLine) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(nextLine);
      range.collapse(atStart);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
  return (
    <div className={Style.CodeEditiorContainer}>
      {/* create lines Index  */}
      <div className={Style.LineIndexContainer}>
        {lines.map((line, index) => (
          <div className={Style.lineIndex}>{index}</div>
        ))}
      </div>
      {/* Create editalbe lines */}
      <div ref={editorRef} className={Style.LineContainer}>
        {lines.map((line, index) => {
          return (
            <div
              key={index}
              contentEditable={true}
             
              onInput={(e) => {
                handelOnInput(index, e.target.innerText);
              }}
              onPaste={(e) => {
                handelPaste(e);
              }}
              onKeyDown={(e) => {
                handelKeyDown(e, index);
              }}

              className={`${Style.line} ${Style.code}`}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CodeEditor;
