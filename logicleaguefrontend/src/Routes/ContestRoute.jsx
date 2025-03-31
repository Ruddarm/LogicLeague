import { Routes, Route } from "react-router-dom";
import ContestPage from "../Component/Contest/contestPage.jsx";
import CreateContest from "../Component/Contest/Create/CreateContest.jsx";
import ContestLanding from "../Component/Contest/ContestLanding.jsx";
import EditContest from "../Component/Contest/Create/EditContest.jsx";
import CreateContestPage from "../Component/Contest/pages/CreateContestPage.jsx";
import ContestLandingPage from "../Component/Contest/pages/ContestLandingPage.jsx";
import ContestEditPage from "../Component/Contest/pages/ContestEditPage.jsx";

function ContestRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route
          path="/create"
          element={<CreateContestPage></CreateContestPage>}
        ></Route>
        <Route path="/edit/:id" element={<ContestEditPage></ContestEditPage>}></Route>
        <Route path="/view/:id" element={<ContestLandingPage></ContestLandingPage>} />
      </Routes>
    </>
  );
}

export default ContestRoute;
