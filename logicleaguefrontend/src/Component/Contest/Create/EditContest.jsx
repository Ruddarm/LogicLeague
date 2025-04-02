import React from "react";
import Style from "./EditContest.module.css";
import ContestForm from "./ContestForm";
import ContestOptionTab, { OptionButton } from "./ContestOptionTab";
import ContestChallenge from "./ContestChallenge";
import { useParams } from "react-router-dom";
import { useContestEdit } from "../Hooks/ContestLandingHooks";
function EditContest() {
  const { loading , handelUpdate } = useContestEdit();
  return (
    <>
      <div className={Style.EditBodyContainer}>
        <div className={Style.OptionTabContaier}>
          <ContestOptionTab></ContestOptionTab>
        </div>
        <div className={Style.EditiorFormContainer}>
          {loading ? "land le le bc" : <ContestForm></ContestForm>}
          {/* <ContestForm  ></ContestForm> */}
          {/* <ContestChallenge></ContestChallenge> */}
        </div>
        <div className={Style.SaveTabContainer}>
          <button onClick={handelUpdate} id={Style.contestSaveBtn}>Save</button>
        </div>
      </div>
    </>
  );
}

export default EditContest;
