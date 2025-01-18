import React, { useContext } from "react";
import Loader from "../../utils/loading";
import TestCase from "./testCaseDisplay";
import Style from "./Submission.module.css";
// import { useContext } from "react";
import { CodeContext } from "../CodeContext";

function Submission() {
  const { submissionResultContext, pastSubmissionContext } =
    useContext(CodeContext);
  // console.log(pastSubmissionContext)
  console.log("res is ", pastSubmissionContext);

  return (
    <div className={Style.SubmissionContainer}>
      {submissionResultContext.submissionResult &&
        (!submissionResultContext.submissionResult?.submited ? (
          <>{Error(submissionResultContext.submissionResult.result)}</>
        ) : (
          <>
            <div className={Style.sucessContainer}>
              {getSucessAnimation()}
              <h2>Submited Sucessfully....</h2>
            </div>
          </>
        ))}
      <h2>Past Submissions</h2>
      {pastSubmissionContext.pastSubmissions && (
        <>
          {pastSubmissionContext.pastSubmissions.Solution?.map((data, index) => (
            <>
              <SubmissionRow key={index} solution={data}></SubmissionRow>
            </>
          ))}
        </>
      )}
    </div>
  );
}
export default Submission;

// display error cases
function Error(result) {
  console.log("result is ", result);
  return (
    <>
      <h2 style={{ color: "red" }}>Wrong answer</h2>
      {/*   dispaly input variables  */}
      {result[0]?.input?.map((data, index) => (
        <TestCase variable={data.variable} value={data.value}></TestCase>
      ))}
      {/* Output Got */}
      <TestCase variable={"Output"} value={result[0].ans}></TestCase>
      {/* expected Outpu */}
      <TestCase
        variable={"Expected Output"}
        value={result[0].output}
      ></TestCase>
    </>
  );
}

// Get sucess animation
function getSucessAnimation() {
  return (
    <>
      <video
        autoPlay
        muted
        playsInline
        width="100"
        height="100"
        style={{ display: "block" }}
      >
        <source src="/sucessfull.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
/**
 * This componet will render a row of past submitied solution
 * @param {solution} A solution which will have past data such as language , data, and runtie
 * @returns
 */
function SubmissionRow({ solution }) {
  console.log("fuck", solution);
  return (
    <>
      <div className={Style.submissionRow}>
        <div>
          {new Date(solution.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div>{solution.lang}</div>
        <div>{ solution.runtime?.toFixed(2)}ms</div>
      </div>
    </>
  );
}
