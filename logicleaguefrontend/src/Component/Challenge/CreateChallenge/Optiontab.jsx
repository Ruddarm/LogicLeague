import React from "react";
import Style from "./Optiontab.module.css";
function OptionTab() {
  return (
    <>
      <div className={Style.OptiontabContainer}>
        <button className={`${Style.OptionTabBtn} ${Style.activeBtn} 'baseClr`}>Basic Details</button>
        <button className={`${Style.OptionTabBtn}`}>Test Case</button>
        <button className={`${Style.OptionTabBtn}`}>Predefined Code</button>
        <button className={Style.OptionTabBtn}>Settings</button>
      </div>
    </>
  );
}

export default OptionTab;
