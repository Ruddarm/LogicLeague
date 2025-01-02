import React, { useEffect, useState } from "react";
import Style from "./create.module.css";
import Editor from "./TextEditor";
import axiosInstance from "../../utils/request";
function challengeForm({ ChallengeState, setChallengeState, inputHandel }) {
  return (
    <>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Challenge Name</label>

        <input
          name="challengeName"
          onChange={(e) => {
            inputHandel(e);
          }}
          className={`${Style.lits} ${Style.its}`}
          value={ChallengeState.challengeName ?? ""}
        ></input>
        <p id="challengeNameError" className={Style.ErrorMsg}>
          Challenge name is required
        </p>
      </div>
      <div className={Style.InputContainer}>
        <label className={Style.lits}>Challenge Description</label>
        <textarea
          onChange={(e) => {
            inputHandel(e);
          }}
          name="challengeDesc"
          className={`${Style.lits} ${Style.its}`}
          value={ChallengeState.challengeDesc ?? ""}
        ></textarea>
        <p id="challengeDescError" className={Style.ErrorMsg}>
          Problem Statement is required\
        </p>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}> Diffuclty</label>
        <select
          name="challengeLevel"
          onChange={(e) => {
            inputHandel(e);
          }}
          value={ChallengeState.challengeLevel ?? "easy"}
          className={`${Style.lits} ${Style.its}`}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Problem Statement</label>
        <Editor
          setData={(data) =>
            setChallengeState((prevState) => ({
              ...prevState,
              problemStatement: data,
            }))
          }
          prevData={ChallengeState.problemStatement ?? ""}
        ></Editor>
        <p id="problemStatementError" className={Style.ErrorMsg}>
          Problem Statement is required
        </p>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Input Format</label>
        <Editor
          setData={(data) =>
            setChallengeState((prevState) => ({
              ...prevState,
              inputFormat: data,
            }))
          }
          prevData={ChallengeState.inputFormat ?? ""}
        ></Editor>
        <p id="inputFormatError" className={Style.ErrorMsg}>
          Problem Statement is required
        </p>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Output Format</label>
        <Editor
          setData={(data) =>
            setChallengeState((prevState) => ({
              ...prevState,
              outputFormat: data,
            }))
          }
          prevData={ChallengeState.outputFormat ?? ""}
        ></Editor>
        <p id="outputFormatError" className={Style.ErrorMsg}>
          Problem Statement is required
        </p>
      </div>
      <div className={Style.InputContainer}>
        <label className={`${Style.lits}`}>Constraints</label>
        <Editor
          setData={(data) =>
            setChallengeState((prevState) => ({
              ...prevState,
              constraints: data,
            }))
          }
          prevData={ChallengeState.constraints ?? ""}
        ></Editor>
        <p id="constraintsError" className={Style.ErrorMsg}>
          Problem Statement is required
        </p>
      </div>
    </>
  );
}
export default challengeForm;
