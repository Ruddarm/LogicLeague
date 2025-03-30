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
import ProfilePage from "./Component/Profile/ProfilePage.jsx";
import ChallengeRoute from "./Routes/ChallengeRoute.jsx";
import ContestRoute from "./Routes/ContestRoute.jsx";
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
              <Route
                path="/Challenge/*"
                element={<ChallengeRoute></ChallengeRoute>}
              />
              {/* edit challenge  route */}
              <Route
                path="/Contest/*"
                element={<ContestRoute></ContestRoute>}
              ></Route>
              {/* User Profiele */}
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
