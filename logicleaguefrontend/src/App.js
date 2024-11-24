import logo from "./logo.svg";
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
  const gclientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    // <GoogleOAuthProvider clientId={gclientId}>
    //   <Router>
    //     <Routes>
    //       <Route path="/login" element={<LoginFrom />} />
    //       <Route
    //         path="/home"
    //         element={<PrivateRoute element={<HomePage />} />}
    //       />
    //       <Route from="/" element={<Navigate to="/Login" />}></Route>
    //     </Routes>
    //   </Router>
    // </GoogleOAuthProvider>
    <>
      <h1>Hello bc no bcs</h1>
    </>
  );
}

export default App;
