import React ,{ useContext,useState} from "react";
import Style from "./create.module.css";
import OptionTab from "./Optiontab";
import Basictab from "./Basic";
import TestCasePage from "./TestCase";
import { CreateChallengeTabContext } from "./tabContext";
function CreateChallengePage() {
  const {tabContext} = useContext(CreateChallengeTabContext)
  console.log(tabContext)
  return (
    <>
      <div className={Style.CreateContainer}>
        <div className={Style.Continaer}>
          <div className={Style.Header}>
            <h1 style={{ margin: 0 }}>Create Challenge</h1>
          </div>
          <div>
            <OptionTab></OptionTab>
          </div>
          <div className={Style.DesContainer}>
            {/* <Basictab></Basictab> */}
            <TestCasePage></TestCasePage>
          </div>
          <div className={Style.btnContainer}>
            <button className={Style.creatbtn}>Preview</button>
            <button className={Style.creatbtn}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateChallengePage;
