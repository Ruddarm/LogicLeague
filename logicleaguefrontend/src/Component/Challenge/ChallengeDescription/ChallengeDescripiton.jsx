import React, { useEffect, useState } from "react";
import Style from "./ChallengeDescripiton.module.css";
import DescHead from "./DescHead.jsx";
import Loader from "../../utils/loading.jsx";
import Quill, { Delta } from "quill";
import DOMPurify from "dompurify";

function getHtmlformat(data) {
  // const [data,setData] = useState({})
  if (data) {
    const quill = new Quill(document.createElement("div"));
    const delta = JSON.parse(data);
    quill.setContents(delta);
    const rawHtml = quill.root.innerHTML;
    return DOMPurify.sanitize(rawHtml);
  }
  else{

  }
  return "";
}
function ChallengeDesc({ challenge }) {
  const [loading, setLoading] = useState(true);
  // console.log(challenge);
  return (
    <>
      <div className={Style.descContainer}>
        <DescHead></DescHead>
        <div className={Style.content}>
          <div>
            <h1>{challenge.challengeName}</h1>
            <div>
              <div>{challenge.challengeLevel}</div>
            </div>
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: getHtmlformat(challenge.outputFormat),
              }}
            />
          </div>
          <div>
            <div>
              <p></p>
              <p>
                <b>Input : </b> l1 = [2,4,3], l2 = [5,6,4]
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeDesc;
