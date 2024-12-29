import React, { useState } from "react";
import Style from "./AddTestCase.module.css";
import { fetchTestCase, uploadTestCase } from "../Challengeapi";
import TextEditior, { DefualtEditior } from "./TextEditor";
function GetInputField({ index, data, InputFeildHandel }) {
  return (
    <>
      <div className={Style.InputinnerContainer}>
        <div className={Style.VariableContainer}>
          <label className={Style.inputlabel}>Variable Name</label>
          <input
            placeholder="name"
            className={Style.inputbox}
            value={data.variable}
            onChange={(e) =>
              InputFeildHandel(index, "variable", e.target.value)
            }
          />
        </div>
        <div className={Style.ValueContainer}>
          <label className={Style.inputlabel}>Value</label>
          <div className={Style.deletectn}>
            <input
              placeholder="'John'"
              className={Style.inputbox}
              value={data.value}
              onChange={(e) => InputFeildHandel(index, "value", e.target.value)}
            />
            <button>
              <img src="/delete.png" alt="delete" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function OpenAddTestCase({ closefun, id }) {
  const [inputFeild, setInputField] = useState(0);
  const input = {
    variable: "",
    value: "",
  };
  const [TestCase, setTestCase] = useState({
    input: [{ variable: "", value: "" }],
    output: "",
    explaination: "",
    isSample: false,
    marks: 0,
    challengeID: id,
  });
  const InputFeildHandel = (index, field, value) => {
    setTestCase((prev) => {
      const updatedInput = [...prev.input];
      updatedInput[index] = { ...updatedInput[index], [field]: value };
      return { ...prev, input: updatedInput };
    });
  };

  console.log("Test case is ", TestCase);
  const AddinputFeild = () => {
    setTestCase((prev) => ({ ...prev, input: [...prev.input, input] }));
  };
  const outPutHandel = (data) => {
    const formattedOutput = data.trim().split("\n").join("\n");
    setTestCase((prev) => ({ ...prev, output: formattedOutput }));
  };
  const explainationHandel = (data) => {
    setTestCase((prev) => ({
      ...prev,
      explaination: data,
    }));
  };
  const upload = async () => {
    const res = await uploadTestCase(id, TestCase);
    console.log(res);
  };
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={Style.GuideLineContainer}>
            <b>Input Guidelines</b> <br></br>
            <p>Each test case defines input variables and their values.</p>
            <p>Use the following format:</p>
            <p>
              <b>For strings: </b>name = Ruddarm
            </p>
            <p>
              <b>For numbers:</b> age = 18
            </p>
            <p>
              <b> For lists:</b> marks = [2, 5, 8] (values separated by commas
              inside []).
            </p>
          </div>
          <div className={Style.InputContainer}>
            <h4>Input:-</h4>
            {TestCase.input?.map((data, index) => (
              <GetInputField
                key={index}
                data={data}
                index={index}
                InputFeildHandel={InputFeildHandel}
              />
            ))}
            <button onClick={AddinputFeild} id={Style.addInputfeildBtn}>
              Add Input Feild{" "}
            </button>
          </div>
          <div className={Style.InputContainer}>
            <div className={Style.GuideLineContainer}>
              <b>Output Guidelines</b>
              <p> Provide the expected output for the input.</p>
              <p>Each output value must be on a new line (\n).</p>
            </div>
            <h4>Output:-</h4>
            <DefualtEditior setData={outPutHandel}></DefualtEditior>
          </div>
          <div className={Style.InputContainer}>
            <h4>Explanation</h4>
            <TextEditior setData={explainationHandel}></TextEditior>
          </div>
          <button id={Style.savebtn} onClick={upload}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default OpenAddTestCase;

// <p>
//
