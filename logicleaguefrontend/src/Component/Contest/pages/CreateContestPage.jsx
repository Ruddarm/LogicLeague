import { ContestInput, ContestLabel } from "../Create/ContestForm";
import Style from "./CreateContestPage.module.css";

function CreateContestPage() {
  return (
    <>
      <div className={Style.container}>
        <div className={Style.innerContainer}>
          <ContestLabel title={"Start With a Name"}></ContestLabel>
          <ContestInput placeholder={"Contest Name"}></ContestInput>
          <div className="flex  flexend bgRed pdTopBottom">
            <button className="sucessBtn">Create </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateContestPage;
