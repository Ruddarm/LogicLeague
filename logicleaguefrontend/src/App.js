import Style from "./App.module.css";
import HomePage from "./Component/Home/home";
import LoginFrom from "./Component/login/loginform";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./Component/utils/header.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./Component/utils/authencation";
import ChallengePlayground from "./Component/Challenge/ChallengePlayground.jsx";
import { ResizeProvider } from "./Component/Challenge/ResizeContext.jsx";
import CreateChallengePage from "./Component/Challenge/CreateChallenge/create.jsx";
import { CreateChallengeTabContextProvider } from "./Component/Challenge/CreateChallenge/tabContext.js";
function App() {
  // console.log(process.env.REACT_APP_BASE_URL);
  const gclientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={gclientId}>
        <Router>
          <div className={Style.RouteBody}>
            <Header></Header>
            <Routes>
              <Route path="/login" element={<LoginFrom />} />
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/challenge"
                element={
                  <ResizeProvider>
                    <ChallengePlayground />
                  </ResizeProvider>
                }
              />
              <Route
                path="/challenge/create"
                element={
                  <CreateChallengeTabContextProvider>
                    <CreateChallengePage />
                  </CreateChallengeTabContextProvider>
                }
              />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </Router>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
