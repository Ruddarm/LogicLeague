// import React from "react";
import React, { useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

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
            [""],
          ],
        },
      });
    }
  }, []);
  console.log(data);
  return (
    <>
      <div
        ref={editorRef}
        style={{ height: "250px", backgroundColor: "white" }}
      />
    </>
  );
}
export default TextEditior;
