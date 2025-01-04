import React, { useContext } from "react";
import Style from "./Optiontab.module.css";
import { CreateChallengeTabContext } from "./tabContext";
function OptionTab() {
  const { tabContext } = useContext(CreateChallengeTabContext);
  return (
    <>
      <div className={Style.OptiontabContainer}>
        <button
          onClick={() => {
            tabContext.setTab({
              basicTab: true,
              TestCaseTab: false,
              Setting: false,
              PDCode: false,
            });
          }}
          className={`${Style.OptionTabBtn} ${
            tabContext.tab.basicTab ? Style.activeBtn : ""
          }`}
        >
          Basic Details
        </button>
        <button
          onClick={() => {
            tabContext.setTab({
              basicTab: false,
              TestCaseTab: true,
              Setting: false,
              PDCode: false,
            });
          }}
          className={`${Style.OptionTabBtn} ${
            tabContext.tab.TestCaseTab ? Style.activeBtn : ""
          }`}
        >
          Test Case
        </button>
        <button
          onClick={() => {
            tabContext.setTab({
              basicTab: false,
              TestCaseTab: false,
              Setting: false,
              PDCode: true,
            });
          }}
          className={`${Style.OptionTabBtn} ${
            tabContext.tab.PDCode ? Style.activeBtn : ""
          }`}
        >
          Predefined Code
        </button>
        <button
          onClick={() => {
            tabContext.setTab({
              basicTab: false,
              TestCaseTab: false,
              Setting: true,
              PDCode: false,
            });
          }}
          className={`${Style.OptionTabBtn} ${
            tabContext.tab.Setting ? Style.activeBtn : ""
          }`}
        >
          Settings
        </button>
      </div>
    </>
  );
}

export default OptionTab;
