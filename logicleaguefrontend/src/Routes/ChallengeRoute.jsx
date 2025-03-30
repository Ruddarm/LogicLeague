import { Route, Routes } from "react-router-dom";
import ChallengeBoard from "../Component/Challenge/DisplayChallenge";
import { ChallengeContextProvider } from "../Component/Challenge/CreateChallenge/ChallengeContext";
import { CreateChallengeTabContextProvider } from "../Component/Challenge/CreateChallenge/tabContext";
import CreateChallengePage from "../Component/Challenge/CreateChallenge/create";
import { ResizeProvider } from "../Component/Challenge/ResizeContext";
import { PlayGroundChallengeContextProvider } from "../Component/Challenge/ChallengeContext";
import ChallengePlayground from "../Component/Challenge/ChallengePlayground.jsx";

function ChallengeRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChallengeBoard></ChallengeBoard>} />
        <Route
          path="/create"
          element={
            <ChallengeContextProvider>
              <CreateChallengeTabContextProvider>
                <CreateChallengePage />
              </CreateChallengeTabContextProvider>
            </ChallengeContextProvider>
          }
        />
        <Route
          path="/:id"
          element={
            <ResizeProvider>
              <PlayGroundChallengeContextProvider>
                <ChallengePlayground />
              </PlayGroundChallengeContextProvider>
            </ResizeProvider>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ChallengeContextProvider>
              <CreateChallengeTabContextProvider>
                <CreateChallengePage edit={true} />
              </CreateChallengeTabContextProvider>
            </ChallengeContextProvider>
          }
        />
      </Routes>
    </>
  );
}

export default ChallengeRoute;
