import React, { useContext } from "react";
import Loader from "../../utils/loading";
import TestCase from "./testCaseDisplay";
import Style from "./Submission.module.css";
// import { useContext } from "react";
import { CodeContext } from "../CodeContext";

function Submission() {
  const { submissionResultContext } = useContext(CodeContext);
  console.log("res is ", submissionResultContext);
  const dumb = true;
  return (
    <div className={Style.SubmissionContainer}>
      {!submissionResultContext.submissionResult.submited ? (
        <>{Error(submissionResultContext.submissionResult.result)}</>
      ) : (
        <>
          <div className={Style.sucessContainer}>
            {getSucessAnimation()}
            <h2>Submited Sucessfully....</h2>
          </div>
        </>
      )}
    </div>
  );
}
export default Submission;

// display error cases
function Error(result) {
  console.log("result is ", result)
  return (
    <>
      <h2 style={{ color: "red" }}>Wrong answer</h2>
      {/*   dispaly input variables  */}
      {result[0]?.input?.map((data,index) => (<TestCase variable={data.variable} value={data.value}></TestCase>))}
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
