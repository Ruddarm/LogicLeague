import EditContest from "../Create/EditContest";
import { useParams } from "react-router-dom";
import { useEditContest } from "../Hooks/ContestLandingHooks";

function ContestEditPage() {
  const data = useParams();
  const { contest } = useEditContest(data.id);
  
  return (
    <>{contest ? <EditContest contest={contest}></EditContest> : "w8 kr bkl"}</>
  );
}

export default ContestEditPage;
