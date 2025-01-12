import Style from "./App.module.css";
import HomePage from "./Component/Home/home";
import LoginFrom from "./Component/login/loginform";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./Component/utils/header.js";
import ContestPage from "./Component/Contest/contestPage.js";
import CreateContest from "./Component/Contest/CreateContest.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./Component/utils/authencation";
import ChallengePlayground from "./Component/Challenge/ChallengePlayground.jsx";
import { PlayGroundChallengeContextProvider } from "./Component/Challenge/ChallengeContext.js";
import { ResizeProvider } from "./Component/Challenge/ResizeContext.jsx";
import CreateChallengePage from "./Component/Challenge/CreateChallenge/create.jsx";
import ChallengeBoard from "./Component/Challenge/DisplayChallenge.jsx";
import { ChallengeContextProvider } from "./Component/Challenge/CreateChallenge/ChallengeContext.js";
import { CreateChallengeTabContextProvider } from "./Component/Challenge/CreateChallenge/tabContext.js";
function App() {
  const gclientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={gclientId}>
        <div className={Style.RouteBody}>
          <Header></Header>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginFrom />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/Challenge" element={<ChallengeBoard />} />
              <Route path="/contest" element={<ContestPage />} />
              <Route path="/create-contest" element={<CreateContest />} />
              <Route
                path="/challenge/edit/:id"
                element={
                  <ChallengeContextProvider>
                    <CreateChallengeTabContextProvider>
                      <CreateChallengePage edit={true} />
                    </CreateChallengeTabContextProvider>
                  </ChallengeContextProvider>
                }
              />
              <Route
                path="/challenge/:id"
                element={
                  <ResizeProvider>
                    <PlayGroundChallengeContextProvider>
                      <ChallengePlayground />
                    </PlayGroundChallengeContextProvider>
                  </ResizeProvider>
                }
              />

              <Route
                path="/challenge/create"
                element={
                  <ChallengeContextProvider>
                    <CreateChallengeTabContextProvider>
                      <CreateChallengePage />
                    </CreateChallengeTabContextProvider>
                  </ChallengeContextProvider>
                }
              />

              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </Router>
        </div>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
