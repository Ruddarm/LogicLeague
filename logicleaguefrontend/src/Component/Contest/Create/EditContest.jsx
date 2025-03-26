import React from "react";
import Style from "./EditContest.module.css";
import ContestForm from "./ContestForm";
function EditContest() {
  return (
    <>
      <div className={Style.EditBodyContainer}>
        <div className={Style.OptionTabContaier}></div>
        <div className={Style.EditiorFormContainer}>
          <ContestForm></ContestForm>
        </div>
        <div className={Style.SaveTabContainer}></div>
      </div>
    </>
  );
}

export default EditContest;
