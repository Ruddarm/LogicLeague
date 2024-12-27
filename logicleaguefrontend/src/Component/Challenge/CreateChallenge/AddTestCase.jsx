import React from "react";
import Style from "./AddTestCase.module.css";
import TextEditior, { DefualtEditior } from "./TextEditor";
function GetInputField() {
  return (
    <>
      <div className={Style.InputinnerContainer}>
        <div className={Style.VariableContainer}>
          <label className={Style.inputlabel}>Variable Name</label>
          <input placeholder="name" className={Style.inputbox}></input>
        </div>
        <div className={Style.ValueContainer}>
          <label className={Style.inputlabel}>Value</label>
          <div className={Style.deletectn}>
            <input placeholder="'Jhon'" className={Style.inputbox}></input>
            <button>
              <img src="/delete.png"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function OpenAddTestCase({closefun}) {
  return (
    <>
      <div className={Style.TestCaseContinaer}>
        <div className={Style.TestCaseHeader}>
          <div>
            <h2>Add Test Case</h2>
          </div>
          <div>
            <button onClick={closefun} className={Style.closebtn}>
              <img src="/close.png"></img>
            </button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <div className={Style.GuideLineContainer}>
            <p>
              <b>Input Guidelines</b> <br></br>
              <p>Each test case defines input variables and their values.</p>
              <p>Use the following format:</p>
              <p>
                <b>For strings: </b>name = "Ruddarm"
              </p>
              <p>
                <b>For numbers:</b> age = 18 For lists: marks = [2, 5, 8]
                (values separated by commas).
              </p>
            </p>
          </div>
          <div className={Style.InputContainer}>
            <h4>Input:-</h4>
            {GetInputField()}
            {GetInputField()}
            <button id={Style.addInputfeildBtn}>Add Input Feild </button>
          </div>
          <div className={Style.InputContainer}>
            <div className={Style.GuideLineContainer}>
              <p>
                <b>Output Guidelines</b>
                <p> Provide the expected output for the input.</p>
                <p>Each output value must be on a new line (\n).</p>
              </p>
            </div>
            <h4>Output:-</h4>
            <DefualtEditior></DefualtEditior>
          </div>
          <div className={Style.InputContainer}>
            <h4>Explanation</h4>
            <TextEditior>

            </TextEditior>
          </div>
          <button id={Style.savebtn}>Upload</button>
        </div>
      </div>
    </>
  );
}

export default OpenAddTestCase;

// <p>
//
