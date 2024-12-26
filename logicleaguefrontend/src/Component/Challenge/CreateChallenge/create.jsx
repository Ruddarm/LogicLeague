import React from "react";
import Editor from "./TextEditor";
import Style from "./create.module.css";
function CreateChallengePage() {
  return (
    <>
      <div className={Style.CreateContainer}>
        <div className={Style.Continaer}>
          <div className={Style.Header}>
            <h1>Create Challenge</h1>
          </div>
          <div className={Style.DesContainer}>
            <div className={Style.InputContainer}>
              <label>Challenge Name</label>
              <input></input>
            </div>
            <div className={Style.InputContainer}>
              <label>Challenge Description</label>
              <textarea></textarea >
            </div>
            <div className={Style.InputContainer}>
              <label>Problem Statement</label>
              <Editor></Editor>
            </div>
            <div className={Style.InputContainer}>
              <label>Input Format</label>
              <Editor></Editor>
            </div>
            <div className={Style.InputContainer}>
              <label>Output Format</label>
              <Editor></Editor>
            </div>
            <div className={Style.InputContainer}>
              <label>Constraints</label>
              <Editor></Editor>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateChallengePage;
