import React, { useEffect, useState } from "react";
import Style from "./TestCase.module.css";
import OpenAddTestCase from "./AddTestCase";
import { fetchTestCase, fetchTestCases, deleteTestCase } from "../Challengeapi";
import Loader from "../../utils/loading";
function TableRow({ index, testCase, onEdit }) {
  return (
    <>
      <tr className={Style.trth}>
        <td className={Style.tabledata}>{index + 1}</td>
        <td className={Style.tabledata}>
          <a>input00.txt</a>
        </td>
        <td className={Style.tabledata}>
          <a>Output00.txt</a>
        </td>
        <td className={Style.tabledata}>
          <input
            type="checkbox"
            onChange={() => {
              console.log("fuck you");
            }}
            value={testCase.isSample}
          ></input>
        </td>
        <td className={Style.tabledata}>
          <input
            type="number"
            onChange={() => {
              console.log("fuck you");
            }}
            value={testCase.marks}
          ></input>
        </td>
        <td className={Style.tabledata}>
          <button
            onClick={() => {
              onEdit(testCase.testCaseId);
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteTestCase(testCase.testCaseId)}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
function TestCasePage({ id }) {
  const [AddTestCase, openAddTestCase] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(true);

  const openEdit = async (testcaseId) => {
    setedit(testcaseId);
  };
  useEffect(() => {
    console.log("using effect bc ");
    getTestCase(id);
  }, [id]);
  // Fetch all task id,marks,issample  deitals for view only
  const getTestCase = async (challengeID) => {
    const response = await fetchTestCases(challengeID);
    setTestCases(response?.data.testCases);
    console.log(response);
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Loader msg={loading}></Loader>
      ) : (
        <div className={Style.AddtestContainer}>
          {AddTestCase ? (
            <OpenAddTestCase
              closefun={() => {
                openAddTestCase(!AddTestCase);
              }}
              id={id}
            ></OpenAddTestCase>
          ) : edit ? (
            <OpenAddTestCase
              closefun={() => {
                setedit(!edit);
              }}
              edit={edit}
            ></OpenAddTestCase>
          ) : (
            <></>
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
                <TableRow
                  key={index}
                  index={index}
                  testCase={data}
                  onEdit={openEdit}
                ></TableRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
export default TestCasePage;
