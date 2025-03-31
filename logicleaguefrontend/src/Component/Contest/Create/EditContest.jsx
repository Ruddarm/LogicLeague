import React from "react";
import Style from "./EditContest.module.css";
import ContestForm from "./ContestForm";
import ContestOptionTab, { OptionButton } from "./ContestOptionTab";
import ContestChallenge from "./ContestChallenge";
import { useParams } from "react-router-dom";
function EditContest({contest,tab,challenges}) {

  return (
    <>
      
      <div className={Style.EditBodyContainer}>
        <div className={Style.OptionTabContaier}>
          <ContestOptionTab  ></ContestOptionTab>
        </div>
        <div className={Style.EditiorFormContainer}>
          <ContestForm contest={contest} ></ContestForm>
          {/* <ContestChallenge></ContestChallenge> */}
        </div>
        <div className={Style.SaveTabContainer}>
            <button id={Style.contestSaveBtn}>Save</button>
        </div>
      </div>
    </>
  );
}

export default EditContest;
