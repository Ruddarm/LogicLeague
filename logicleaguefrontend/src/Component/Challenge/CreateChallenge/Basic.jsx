import React from "react";
import Style from "./create.module.css";
import Editor from "./TextEditor";

function Basictab() {
  return (
    <>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Challenge Name</label>
        <input className={`${Style.lits} ${Style.its}`}></input>
      </div>
      <div className={Style.InputContainer}>
        <label>Challenge Description</label>
        <textarea className={`${Style.lits} ${Style.its}`}></textarea>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}> Diffuclty</label>
        <select className={`${Style.lits} ${Style.its}`}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Problem Statement</label>
        <Editor></Editor>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Input Format</label>
        <Editor></Editor>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Output Format</label>
        <Editor></Editor>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Constraints</label>
        <Editor></Editor>
      </div>
    </>
  );
}
export default Basictab;
