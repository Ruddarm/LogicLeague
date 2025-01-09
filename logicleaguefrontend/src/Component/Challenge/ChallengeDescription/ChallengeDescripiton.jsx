import React, { useContext, useEffect, useState } from "react";
import Style from "./ChallengeDescripiton.module.css";
import DescHead from "./DescHead.jsx";
import Loader from "../../utils/loading.jsx";
import Quill from "quill";
// import "quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { PlayGroundChallengeContext } from "../ChallengeContext.js";
function getHtmlformat(data) {
  if (data) {
    const quill = new Quill(document.createElement("div"));
    const delta = JSON.parse(data);
    quill.setContents(delta);
    const rawHtml = quill.root.innerHTML;
    return DOMPurify.sanitize(rawHtml);
  } else {
  }
  return "";
}
function GetInput({ variable, value }) {
  return (
    <>
      <div className={Style.inputContinaer}>
        <div>
          <b>{variable}</b>
        </div>
        <div className={Style.outputContinaer}>
          <div>
            <pre style={{ margin: 0 }}>{value}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
function GetExplaintaion({ testCase }) {
  console.log(testCase);
  return (
    <>
      <div className={Style.exampleContainer}>
        <div>
          {testCase.input?.map((data, key) => (
            <GetInput
              variable={data.variable}
              value={data.value}
              key={key}
            ></GetInput>
          ))}
        </div>
        <div>
          <GetInput variable={"Output"} value={testCase.output}></GetInput>
        </div>
        {testCase.explainaiton && (
          <div>
            Explaintaion
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: getHtmlformat(testCase.explainaiton),
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
}
function ChallengeDesc() {
  const { challengeContext, testCasesContext } = useContext(
    PlayGroundChallengeContext
  );
  const [data, setdata] = useState(false);
  useEffect(() => {
    setdata(true);
  }, [challengeContext.challengeData, challengeContext.testCaseData]);
  return (
    <>
      <div className={Style.descContainer}>
        <DescHead></DescHead>
        <div className={Style.content}>
          {/* challenge heading */}
          <div>
            <h1>{challengeContext.challengeData.challengeName}</h1>
            <div>
              <div className={Style.leveldiv}>
                {challengeContext.challengeData.challengeLevel}
              </div>
            </div>
          </div>
          {/* Challenge Description */}
          <div>
            <div>{challengeContext.challengeData.challengeDesc}</div>
          </div>
          {/* Problem Statement  */}
          <div>
            <hr></hr>
            <h4>Problem Statement</h4>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: getHtmlformat(
                  challengeContext.challengeData.problemStatement
                ),
              }}
            ></div>
          </div>
          {/* Example */}
          <hr></hr>
          <div>
            <h4>Examples</h4>
            {testCasesContext.testCaseData.map((data, key) => (
              <GetExplaintaion key={key} testCase={data}></GetExplaintaion>
            ))}
          </div>
          <hr></hr>
          {/* {Input format} */}
          <div>
            <h4>Input Format</h4>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: getHtmlformat(
                  challengeContext.challengeData.inputFormat
                ),
              }}
            ></div>
          </div>
          <hr></hr>
          {/* Output format */}
          <div>
            <h4>Output Format</h4>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: getHtmlformat(
                  challengeContext.challengeData.outputFormat
                ),
              }}
            ></div>
          </div>
          <hr></hr>
          {/* Constraints  */}
          <div>
            <h4>Constraints Format</h4>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: getHtmlformat(
                  challengeContext.challengeData.constraints
                ),
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeDesc;

// dangerouslySetInnerHTML={{
//   __html: getHtmlformat(challenge.challengeDesc),
// }}
