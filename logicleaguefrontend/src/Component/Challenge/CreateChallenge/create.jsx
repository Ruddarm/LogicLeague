import React, { useContext, useEffect, useState } from "react";
import Style from "./create.module.css";
import OptionTab from "./Optiontab";
// import { Navigate } from "react-router-dom";
import { FetchChallengeByID } from "../Challengeapi";
import ChallengeForm from "./ChallengeForm";
import TestCasePage from "./TestCase";
import { CreateChallengeTabContext } from "./tabContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../../utils/loading";
import axiosInstance from "../../utils/request";
import { create_challenge, update_challenge } from "../Challengeapi";
function CreateChallengePage({ edit = false }) {
  const navigate = useNavigate();
  const [ChallengeState, setChallengeState] = useState({
    challengeName: "",
    challengeDesc: "",
    challengeLevel: "Easy",
    problemStatement: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
  });
  const [loading, setLoading] = useState(true);
  const { tabContext } = useContext(CreateChallengeTabContext);
  const [uploadChallenge, setUploadChallenge] = useState(false);
  const { id } = useParams("id");
  const keys = [
    "challengeName",
    "challengeDesc",
    "problemStatement",
    "inputFormat",
    "outputFormat",
    "constraints",
  ];
  const handelOnchange = (e) => {
    const { name, value } = e.target;
    setChallengeState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    for (let key of keys) {
      const value = ChallengeState[key]?.trim();
      const errorElement = document.getElementById(`${key}Error`);
      if (!value) {
        isValid = false;
        errorElement.classList.add(Style.display);
      } else {
        errorElement.classList.remove(Style.display);
      }
    }
    return isValid;
  };
  const update = async () => {
    setLoading(true);
    const res = await update_challenge(ChallengeState, id);
    setLoading(false);
  };
  const create = async () => {
    setLoading(true);
    const response = await create_challenge(ChallengeState, id);
    setLoading(false);
    navigate(`/challenge/edit/${response.data.id}`);
  };
  useEffect(() => {
    return async () => {
      if (edit) {
        const response = await FetchChallengeByID(id);

        if (response?.status == 200) {
          const responseChallenge = response.data.challenge;
          setChallengeState((prev) => ({
            ...prev,
            challengeName: responseChallenge.challengeName,
            challengeDesc: responseChallenge.challengeDesc,
            challengeLevel: responseChallenge.challengeLevel,
            problemStatement: responseChallenge.problemStatement,
            inputFormat: responseChallenge.inputFormat,
            outputFormat: responseChallenge.outputFormat,
            constraints: responseChallenge.constraints,
          }));
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
  }, [id]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className={Style.CreateContainer}>
            <div className={Style.Continaer}>
              <div className={Style.Header}>
                <h1 style={{ margin: 0 }}>
                  {edit ? ChallengeState.challengeName : "Create Challenge"}
                </h1>
              </div>
              <div>{edit && <OptionTab></OptionTab>}</div>
              <div className={Style.DesContainer}>
                {edit
                  ? tabContext.tab.basicTab &&
                    edit && (
                      <ChallengeForm
                        ChallengeState={ChallengeState}
                        setChallengeState={setChallengeState}
                        F
                        inputHandel={handelOnchange}
                      ></ChallengeForm>
                    )
                  : tabContext.tab.basicTab && (
                      <ChallengeForm
                        ChallengeState={ChallengeState}
                        setChallengeState={setChallengeState}
                        inputHandel={handelOnchange}
                      ></ChallengeForm>
                    )}

                {tabContext.tab.TestCaseTab && (
                  <TestCasePage id={id}></TestCasePage>
                )}
              </div>
              <div className={Style.btnContainer}>
                <button className={Style.creatbtn}>Preview</button>
                <button
                  className={Style.creatbtn}
                  onClick={edit ? update : create}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default CreateChallengePage;
