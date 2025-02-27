import Style from "./App.module.css";
import HomePage from "./Component/Home/home";
import LoginFrom from "./Component/login/loginform";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./Component/utils/header.js";
import ContestPage from "./Component/Contest/contestPage.jsx";
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
import ProfilePage from "./Component/Profile/ProfilePage.jsx";
function App() {
  const gclientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={gclientId}>
        <div className={Style.RouteBody}>
          <Header></Header>
          <Router>
            <Routes>
              {/* login page */}
              <Route path="/login" element={<LoginFrom />} />
              {/* home page */}
              <Route path="/home" element={<HomePage />} />
              {/* challenge page */}
              <Route path="/Challenge" element={<ChallengeBoard />} />
              {/* contest page */}
              <Route path="/contest" element={<ContestPage />} />
              {/* create-contest page */}
              <Route path="/create-contest" element={<CreateContest />} />
              {/* edit challenge  route */}
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
              {/* get challenge */}
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
              {/* get route  */}
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
              <Route path="/profile" element={<ProfilePage></ProfilePage>} />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </Router>
        </div>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
