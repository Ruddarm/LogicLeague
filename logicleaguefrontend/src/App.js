import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Component/Home/home";
import LoginFrom from "./Component/login/loginform";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./Component/utils/privateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginFrom />} />
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
        <Route from="/" element={<Navigate to="/Login"></Navigate>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
