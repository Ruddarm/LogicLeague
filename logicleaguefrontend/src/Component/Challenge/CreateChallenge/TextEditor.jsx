// import React from "react";
import React, { useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
function DefualtEditior({ setData, prevData = "" }) {
  const editorRef = useRef();
  const quillInstanceRef = useRef(null); //
  React.useEffect(() => {
    if (!quillInstanceRef.current) {
      // Initialize Quill only if it hasn't been initialized already
      quillInstanceRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: false,
        },
      });
      quillInstanceRef.current.on("text-change", () => {
        const plainText = quillInstanceRef.current.getText();
        setData(plainText);
      });
      if (prevData) {
        try {
          console.log(prevData)
          quillInstanceRef.current.setText(prevData);
        } catch (e) {
          console.error("Error parsing prevData:", e);
        }
      }
    }
  }, [prevData, setData]);
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(110,110,110,0.7)",
          border: "1px solid rgb(223, 223, 223)",
          borderRadius: "5px",
          overflow: "hidden",
          flexWrap: "nowrap",
        }}
      >
        <div
          ref={editorRef}
          style={{
            height: "100px",
            backgroundColor: "white",
          }}
        />
      </div>
    </>
  );
}
function TextEditior({ setData, prevData = "" }) {
  const editorRef = useRef();
  const quillInstanceRef = useRef(null);

  React.useEffect(() => {
    if (!quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "code-block"],
          ],
        },
      });

      quillInstanceRef.current.on("text-change", () => {
        setData(JSON.stringify(quillInstanceRef.current.getContents()));
      });

      if (prevData) {
        try {
          const parsedData = JSON.parse(prevData); // Parse prevData if it's a string
          quillInstanceRef.current.setContents(parsedData);
        } catch (e) {
          console.error("Error parsing prevData:", e);
        }
      }
    }
  }, [prevData, setData]);

  return (
    <div
      style={{
        backgroundColor: "rgba(110,110,110,0.7)",
        border: "1px solid rgb(223, 223, 223)",
        borderRadius: "5px",
        overflow: "hidden",
        flexWrap: "nowrap",
      }}
    >
      <div
        ref={editorRef}
        style={{
          height: "250px",
          backgroundColor: "white",
        }}
      />
    </div>
  );
}
export default TextEditior;
export { DefualtEditior };
