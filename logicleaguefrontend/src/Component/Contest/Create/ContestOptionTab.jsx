import React from "react";

import Style from "./ContestOptionTab.module.css";
function OptionButton({ Cta, isActive }) {
  return (
    <>
      <button
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
  return (
    <>
      <div className={Style.ContestOptionTabBody}>
        <OptionButton isActive={true} Cta={"Basic Details"}></OptionButton>
        <OptionButton Cta={"Challenges"}></OptionButton>
        <OptionButton Cta={"Registartion"}></OptionButton>
        <OptionButton Cta={"Settings"}></OptionButton>
      </div>
    </>
  );
}

export default ContestOptionTab;

export {OptionButton}