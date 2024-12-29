import { useContext } from "react";
import { ResizeContext } from "../Challenge/ResizeContext";
import React from "react";
import Style from "./CodeBar.module.css";
import CodeEditor from "./MonacEditior";
function CodeBar({ submit }) {
  const { maxContext } = useContext(ResizeContext);
  const maxCodeEditior = () => {
    maxContext.setMax((prev) => ({
      ...prev,
      codeEditior: !maxContext.max.codeEditior,
    }));
  };
  return (
    <>
      <div className={Style.CodeBarContainer}>
        <div className={Style.OptionContainer}>
          <button>
            <img src="/web-programming.png" alt="" />
            <span style={{ marginLeft: "5px", fontFamily: "times new roman" }}>
              <b>Code</b>
            </span>
          </button>
        </div>

        <div className={Style.OptionContainer}>
          <button onClick={maxCodeEditior}>
            <img
              src={maxContext.max.codeEditior ? "/minimize.png" : "/maximize.png"}
            ></img>
          </button>
        </div>
      </div>
    </>
  );
}
export default CodeBar;
