import React from "react";
import Style from "./EditContest.module.css";
import ContestForm from "./ContestForm";
import ContestOptionTab, { OptionButton } from "./ContestOptionTab";
function EditContest() {
  return (
    <>
      
      <div className={Style.EditBodyContainer}>
        <div className={Style.OptionTabContaier}>
          <ContestOptionTab></ContestOptionTab>
        </div>
        <div className={Style.EditiorFormContainer}>
          <ContestForm></ContestForm>
        </div>
        <div className={Style.SaveTabContainer}>
            <button id={Style.contestSaveBtn}>Save</button>
        </div>
      </div>
    </>
  );
}

export default EditContest;
