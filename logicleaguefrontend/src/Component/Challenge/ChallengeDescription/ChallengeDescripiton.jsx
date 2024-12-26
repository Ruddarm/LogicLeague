import React from "react";
import Style from "./ChallengeDescripiton.module.css";
import DescHead from "./DescHead.jsx";
function ChallengeDesc() {
  return (
    <>
      <div className={Style.descContainer}>
        <DescHead></DescHead>
        <div className={Style.content}>
          <div>
            <h1>Add Two Numbers</h1>
            <div>
              <div>Easy</div>
            </div>
          </div>
          <div>
            <p>
              You are given two non-empty linked lists representing two
              non-negative integers. The digits are stored in reverse order, and
              each of their nodes contains a single digit. Add the two numbers
              and return the sum as a linked list.
            </p>
            <p>
              You may assume the two numbers do not contain any leading zero,
            </p>
          </div>
          <div>
            <div>
              <p></p>
              <p><b>Input : </b> l1 = [2,4,3], l2 = [5,6,4]</p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeDesc;
