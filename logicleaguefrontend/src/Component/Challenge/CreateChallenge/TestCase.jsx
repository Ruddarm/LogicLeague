import React, { useEffect, useState } from "react";
import Style from "./TestCase.module.css";
import OpenAddTestCase from "./AddTestCase";
import { fetchTestCase, fetchTestCases, deleteTestCase } from "../Challengeapi";
import Loader from "../../utils/loading";
function TableRow({ index, testCase, onEdit, onDelete }) {
  console.log(testCase)
  return (
    <>
      <tr className={Style.trth}>
        <td className={`${Style.tabledata} ${Style.sr}`}>{index + 1}</td>
        <td className={`${Style.tabledata} ${Style.textfile}`}>
          <a href="/nthng">input00.txt</a>
        </td>
        <td className={`${Style.tabledata} ${Style.textfile}`}>
          <a href="/nthng"> Output00.txt</a>
        </td>
        <td className={`${Style.tabledata} ${Style.example}`}>
          <input
            type="checkbox"
            onChange={() => {
              console.log("fuck you");
            }}
            checked={testCase.isSample}
            readOnly
          ></input>
        </td>
        <td className={`${Style.tabledata} ${Style.marks}`}>
          <input
            type="number"
            onChange={() => {
              console.log("fuck you");
            }}
            value={testCase.marks}
            readOnly
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
          <button
            onClick={() => {
              onDelete(testCase.testCaseId);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
function TestCasePage({challengeId}) {
  const [AddTestCase, openAddTestCase] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [edit, setedit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false)

  const openEdit = async (testcaseId) => {
    setedit(testcaseId);
  };
  useEffect(() => {
    getTestCases(challengeId);
  }, [challengeId,loading]);
  const handelDelete = (testcaseid) => {
    setLoading(true);
    deleteTestCase(challengeId, testcaseid);
    setLoading(false);
  };
  // Fetch all task id,marks,issample  deitals for view only
  const getTestCases = async (cId) => {
    const response = await fetchTestCases(cId);
    setTestCases(response?.data.testCases);
    setLoading(false);
  };
  return (
    <>
      <div className={Style.AddtestContainer}>
        {AddTestCase ? (
          <OpenAddTestCase
            closefun={() => {
              openAddTestCase(!AddTestCase);
            }}
            challengeId={challengeId}
          ></OpenAddTestCase>
        ) : edit ? (
          <OpenAddTestCase
            closefun={() => {
              setedit(!edit);
            }}
            challengeId={challengeId}
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
        <div className={Style.tableContainer}>
          <table className={Style.testCaseTable}>
            <thead className={Style.tableBody}>
              <tr className={Style.trth}>
                <th className={`${Style.tabledata} ${Style.sr}`}>Sr</th>
                <th className={`${Style.tabledata} ${Style.textfile}`}>
                  Input
                </th>
                <th className={`${Style.tabledata} ${Style.textfile}`}>
                  Output
                </th>
                <th className={`${Style.tabledata} ${Style.example}`}>
                  Eaxmple
                </th>
                <th className={`${Style.tabledata} ${Style.marks}`}>Marks</th>
                <th className={`${Style.tabledata}`}></th>
              </tr>
            </thead>
            <tbody className={Style.tableBody}>
              {testCases?.map((data, index) => (
                <TableRow
                  key={index}
                  index={index}
                  testCase={data}
                  onEdit={openEdit}
                  onDelete={handelDelete}
                ></TableRow>
              ))}
            </tbody>
          </table>
        </div>
        {loading && <Loader msg={loading}></Loader>}
      </div>
    </>
  );
}
export default TestCasePage;
