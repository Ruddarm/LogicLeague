import "./App.css";
import HomePage from "./Component/Home/home";
import LoginFrom from "./Component/login/loginform";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./Component/utils/privateRoute";
import { AuthProvider } from "./Component/utils/authencation";
function App() {
  // console.log(process.env.REACT_APP_BASE_URL);
  const gclientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={gclientId}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginFrom />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
