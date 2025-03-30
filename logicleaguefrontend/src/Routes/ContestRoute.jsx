import { Routes , Route } from "react-router-dom";
import ContestPage from "../Component/Contest/contestPage.jsx";
import CreateContest from "../Component/Contest/Create/CreateContest.jsx";
import ContestLandingPage from "../Component/Contest/ContestLanding.jsx";
import EditContest from "../Component/Contest/Create/EditContest.jsx";

function ContestRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ContestPage />} />
        <Route
          path="/create"
          element={<CreateContest></CreateContest>}
        ></Route>
        <Route
          path="/edit/:id"
          element={<EditContest></EditContest>}
        ></Route>
        <Route path="/view/:id" element={<ContestLandingPage />} />
      </Routes>
    </>
  );
}


export default ContestRoute;