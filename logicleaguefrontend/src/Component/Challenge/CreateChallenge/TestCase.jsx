import React, { useEffect, useState } from "react";
import Style from "./TestCase.module.css";
import OpenAddTestCase from "./AddTestCase";

function TableRow() {
  return (
    <>
      <tr className={Style.trth}>
        <td className={Style.tabledata}>0</td>
        <td className={Style.tabledata}>
          <a>input00.txt</a>
        </td>
        <td className={Style.tabledata}>
          <a>Output00.txt</a>
        </td>
        <td className={Style.tabledata}>
          <input type="checkbox"></input>
        </td>
        <td className={Style.tabledata}>
          <input></input>
        </td>
        <td className={Style.tabledata}>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    </>
  );
}
function TestCasePage({ id }) {
  // JSON.stringify(value)
  const [AddTestCase, openAddTestCase] = useState(false);
  const [testCases, setTestCases] = useState([{}, {}]);
  const [newTestCase, setNewTestCase] = useState({
    input: [{ variable: "", value: "" }],
    output: "",
    explaination: "",
    isSample: false,
    marks: 0,
  });
  
  useEffect(() => {}, [id]);
  return (
    <>
      <div className={Style.AddtestContainer}>
        {AddTestCase && (
          <OpenAddTestCase
            closefun={() => {
              openAddTestCase(!AddTestCase);
            }}
            id={id}
          ></OpenAddTestCase>
        )}
        <div className={Style.GuideLineContainer}>
          <div className={Style.BtnContainer}>
            <button
              onClick={() => {
                openAddTestCase(!AddTestCase);
              }}
              className={Style.testCasebtn}
            >
              {" "}
              Add Test case
            </button>
          </div>
        </div>
        <table className={Style.testCaseTable}>
          <thead className={Style.theadtd}>
            <tr className={Style.trth}>
              <th className={Style.tabledata}>Sr</th>
              <th className={Style.tabledata}>Input</th>
              <th className={Style.tabledata}>Output</th>
              <th className={Style.tabledata}>Eaxmple</th>
              <th className={Style.tabledata}>Marks</th>
              <th className={Style.tabledata}></th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((data, index) => (
                <TableRow key={index} ></TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default TestCasePage;
