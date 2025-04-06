import EditContest from "../Create/EditContest";
import { useParams } from "react-router-dom";
import {
  ContestEditProvider,
  useContestEdit,
} from "../Hooks/ContestLandingHooks";

function ContestEditPage() {
  const urlData = useParams();
  return (
    <>
      {
        <ContestEditProvider contestId={urlData.id}>
          <EditContest></EditContest>
        </ContestEditProvider>
      }
    </>
  );
}

export default ContestEditPage;
