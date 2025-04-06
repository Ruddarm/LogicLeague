import { createContest } from "../api/contestapi";
import { ContestInput, ContestLabel } from "../Create/ContestForm";
import Style from "./CreateContestPage.module.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function CreateContestPage() {
  const Navigate = useNavigate();
  const [contestName, setContestName] = useState("");
  const handleContestNameChange = (e) => {
    setContestName(e.target.value);
  };
  const handelCreateContest = async () => {
    try {
      let response = await createContest({ name: contestName });
      console.log(response.data);
      Navigate("/contest/edit/"+ response.data.contest_id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={Style.container}>
        <div className={Style.innerContainer}>
          <ContestLabel title={"Start With a Name"}></ContestLabel>
          <ContestInput
            value={contestName}
            changeHandeler={handleContestNameChange}
            placeholder={"Contest Name"}
          ></ContestInput>
          <div className="flex  flexend bgRed pdTopBottom">
            <button onClick={handelCreateContest} className="sucessBtn">
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateContestPage;
