import React from "react";

import Style from "./ContestOptionTab.module.css";
import { useContestEdit } from "../Hooks/ContestLandingHooks";
function OptionButton({ Cta, isActive, handelFunction ,name}) {
  return (
    <>
      <button
        onClick={(e) => handelFunction(name, e.target.value)}
        className={`${Style.ContestButton} ${
          isActive ? Style.ContestButtonActive : ""
        }`}
      >
        {Cta}
      </button>
    </>
  );
}
function ContestOptionTab() {
  const { handelOption } = useContestEdit();
  // console.log(setOptionTab)
  return (
    <>
      <div className={Style.ContestOptionTabBody}>
        <OptionButton isActive={true} Cta={"Basic Details"} name={'basic'} handelFunction={handelOption}></OptionButton>
        <OptionButton Cta={"Challenges"} name={'challengeTab'} handelFunction={handelOption}></OptionButton>
        <OptionButton Cta={"Registartion"} handelFunction={handelOption}></OptionButton>
        <OptionButton Cta={"Settings"} handelFunction={handelOption}></OptionButton>
      </div>
    </>
  );
}

export default ContestOptionTab;

export { OptionButton };
