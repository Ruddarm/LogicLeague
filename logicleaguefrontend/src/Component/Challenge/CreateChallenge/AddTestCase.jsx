import React, { useEffect, useState } from "react";
import Style from "./AddTestCase.module.css";
import { fetchTestCase, updateTestCase, uploadTestCase } from "../Challengeapi";
import TextEditior, { DefualtEditior } from "./TextEditor";
import Loader from "../../utils/loading";
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
function OpenAddTestCase({ closefun, challengeId, edit }) {
  // modle for test case
  const [loading, setLoading] = useState(false);
  const [testCase, setTestCase] = useState({
    input: [{ variable: "", value: "" }],
    output: "",
    explaination: "",
    isSample: false,
    marks: 0,
    challengeID: challengeId,
  });
  const input = {
    variable: "",
    value: "",
  };

  useEffect(() => {
    if (edit) {
      getExistingTask(challengeId, edit);
    }
  }, [challengeId, edit]);
  const getExistingTask = async (challengeID, testCaseId) => {
    setLoading(true);
    const response = await fetchTestCase(challengeID, testCaseId);
    let oldTestCase = response.data.testCase;
    setTestCase((prev) => ({
      ...prev,
      input: oldTestCase.input,
      output: oldTestCase.output,
      explaination: oldTestCase.explaination,
      marks: oldTestCase.marks,
      isSample: oldTestCase.isSample,
    }));
    setLoading(false);
    console.log(oldTestCase);
  };
  const InputFeildHandel = (index, field, value) => {
    setTestCase((prev) => {
      const updatedInput = [...prev.input];
      updatedInput[index] = { ...updatedInput[index], [field]: value };
      return { ...prev, input: updatedInput };
    });
  };

  // console.log("Test case is ", TestCase);
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
    if (edit) {
      setLoading(true);
      const res = await updateTestCase(challengeId, edit, testCase);
      setLoading(false);
      return;
    }
    setLoading(true);
    const res = await uploadTestCase(edit, testCase);
    setLoading(false);
    closefun();
    // console.log(res);
  };
  console.log(testCase);

  return (
    <>
      <div className={Style.TestCaseContinaer}>
        {loading ? (
          <Loader msg={`${loading ? "fetching..." : "Uploading..."}`}></Loader>
        ) : (
          <>
            <div className={Style.TestCaseHeader}>
              <div>
                <h2>Add Test Case</h2>
              </div>
              <div>
                <button onClick={closefun} className={Style.closebtn}>
                  <img src="/close.png" alt="close"></img>
                </button>
              </div>
            </div>
            <div className={Style.inner}>
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
                  <b> For lists:</b> marks = [2, 5, 8] (values separated by
                  commas inside []).
                </p>
              </div>
              <div className={Style.InputContainer}>
                <div className={Style.InputinnerContainer}>
                  <div className={Style.marks}>
                    <div>Is sample</div>
                    <div>
                      <input
                        className={Style.marksInput}
                        type="checkbox"
                        value={testCase.isSample}
                        onChange={(e) => {
                          setTestCase((prev) => ({
                            ...prev,
                            isSample: e.target.checked,
                          }));
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className={Style.marks}>
                    <div>Marks</div>
                    <input
                      className={Style.marksInput}
                      onChange={(e) => {
                        setTestCase((prev) => ({
                          ...prev,
                          marks: e.target.value,
                        }));
                      }}
                      type="number"
                    ></input>
                  </div>
                </div>
              </div>
              <div className={Style.InputContainer}>
                <h4>Input:-</h4>
                {testCase.input?.map((data, index) => (
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
                <DefualtEditior
                  prevData={testCase.output}
                  setData={outPutHandel}
                ></DefualtEditior>
              </div>
              <div className={Style.InputContainer}>
                <h4>Explanation</h4>
                <TextEditior
                  prevData={testCase.explaination}
                  setData={explainationHandel}
                ></TextEditior>
              </div>
              <button id={Style.savebtn} onClick={upload}>
                Upload
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default OpenAddTestCase;

// <p>
//
