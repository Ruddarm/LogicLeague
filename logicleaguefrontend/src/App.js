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

function App() {
  console.log(process.env.REACT_APP_BASE_URL)
  const gclientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={gclientId}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginFrom />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
    
    
  );
}

export default App;
