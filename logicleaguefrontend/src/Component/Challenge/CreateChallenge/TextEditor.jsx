// import React from "react";
import React, { useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
function DefualtEditior() {
  const editorRef = useRef();
  const quillInstanceRef = useRef(null); //
  const [data, setData] = useState([]);
  React.useEffect(() => {
    if (!quillInstanceRef.current) {
      // Initialize Quill only if it hasn't been initialized already
      quillInstanceRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: false
        },
      });
    }
  }, []);
  console.log(data);
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
function TextEditior() {
  const editorRef = useRef();
  const quillInstanceRef = useRef(null); //
  const [data, setData] = useState([]);
  React.useEffect(() => {
    if (!quillInstanceRef.current) {
      // Initialize Quill only if it hasn't been initialized already
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
    }
  }, []);
  console.log(data);
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
            height: "250px",
            backgroundColor: "white",
          }}
        />
      </div>
    </>
  );
}
export default TextEditior;

export {DefualtEditior}