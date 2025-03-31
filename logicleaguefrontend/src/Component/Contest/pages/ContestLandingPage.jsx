import { useParams } from "react-router-dom";
import ContestLanding from "../ContestLanding";
import ContestPage from "../contestPage";
import {useContestLanding} from "../Hooks/ContestLandingHooks";

function ContestLandingPage() {
  const { id } = useParams("id");
  const { contest ,challenges } = useContestLanding(id);
  console.log(challenges);
  return (
    <>
      {contest ? (
        <ContestLanding challenges={challenges} contest={contest} ></ContestLanding>
      ) : (
        "wait mc"
      )}
    </>
  );
}

export default ContestLandingPage;
