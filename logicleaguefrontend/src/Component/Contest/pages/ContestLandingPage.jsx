import { useParams } from "react-router-dom";
import ContestLanding from "../ContestLanding";
import ContestPage from "../contestPage";
import { useContestLanding } from "../Hooks/ContestLandingHooks";

function ContestLandingPage() {
  const { id } = useParams("id");
  const {
    contest,
    loading,
    challenges,
    isRegistered,
    regUser,
    unregUser,
  } = useContestLanding(id);
  return (
    <>
      {loading ? (
        <h1>Ruk ja bsdk</h1>
      ) : (
        <ContestLanding
          challenges={challenges}
          contest={contest}
          isRegistered={isRegistered}
          regUser={regUser}
          unregUser={unregUser}
        ></ContestLanding>
      )}
    </>
  );
}

export default ContestLandingPage;
