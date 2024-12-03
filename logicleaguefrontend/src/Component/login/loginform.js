import React, { useContext } from "react";
import { useState } from "react";
import Style from "./loginform.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../utils/header";
import axiosInstance from "../utils/request";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../utils/authencation";

function LoginFrom() {
  const {isLogedIN, SetLogedIn} = useContext(AuthContext);
  const [singUP, setSingUP] = useState(false);
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setWarning] = useState(false);
  const [username, setUserName] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isvalid, setValidate] = useState(false);
  const changeForm = () => {
    setLogin(!isLogin);
    setUserName("");
    setCnfPassword("");
    setEmail("");
    setError("");
    setValidate(false);
  };
  const validateFeild = (name) => {
    let e = document.getElementById(name);
    if (!e) {
      console.warn(`Element with id ${name} not found`);
      return false;
    }

    if (e.value.trim() === "") {
      e.classList.remove(Style.greenborder);
      e.classList.add(Style.warnborder);
      e.nextSibling.classList.add(Style.display);
      return false;
    } else {
      e.nextSibling.classList.remove(Style.display);
      e.classList.remove(Style.warnborder);
      e.classList.add(Style.greenborder);
      return true;
    }
  };
  const validate = () => {
    let isValidFields = true;

    if (isLogin) {
      isValidFields = validateFeild("email") && validateFeild("password");
    } else {
      isValidFields =
        validateFeild("username") &&
        validateFeild("email") &&
        validateFeild("password") &&
        validateFeild("cnfPassword");
      console.log("vlaidating ", isValidFields);
    }
    setValidate(isValidFields);
    return isValidFields;
  };
  const handelChange = (e) => {
    let { name, value } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "cnfPassword") {
      setCnfPassword(value);
    }
    validateFeild(name);
  };
  const handelLogin = async (e) => {
    e.preventDefault();
    setWarning(false);
    setError("");

    if (isLogin) {
      setValidate(validate());
      if (validate()) {
        try {
          console.log({ email, password });
          const response = await axiosInstance.post("users/login/", {
            email,
            password,
          });
          if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            SetLogedIn(true);
            navigate("/home");
          }
        } catch (err) {
          if (err.response?.data) {
            console.log(err.response.data);
            if (err.response.data) {
              setError("Invalid email or password");
              setWarning(true);
            }
          } else {
            console.log(err);
          }
        }
      }
    } else {
      if (validate()) {
        if (password === cnfPassword) {
          try {
            console.log(username, password, email);
            const response = await axiosInstance.post("users/register/", {
              username,
              email,
              password,
            });
            if (response.status === 201) {
              setSingUP(true);
              setLogin(true);
              navigate("/login");
            }
          } catch (e) {
            if (e.response.data) {
              setError("Email already exist.. please try to login");
              setWarning(true);
            }
            console.log(e);
          }
        } else {
          setError("Confirm password should match with password");

          setWarning(true);
        }
      } else {
        setError("Invalid Details");
        setWarning(true);
      }
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const access_token = tokenResponse.access_token;
      try {
        const response = await axiosInstance.post("users/api/auth/google/", {
          token: access_token,
        });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        SetLogedIn(true);
        navigate("/home");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    onError: (err) => console.log("Login Failed", err),
  });

  return (
    <>
      {/* {localStorage.removeItem("jwttoken")} */}
      <Header></Header>
      <div className={Style.blockContainer}>
        <div className={Style.Container}>
          <div className={Style.loginContainer}>
            <div>
              <h1>Welcome Back!</h1>
              <h2>Login to you account</h2>
              <p>It's being a long time..</p>
            </div>
            {(singUP && (
              <>
                <p>Account created please login</p>
              </>
            )) ||
              (showWarning && (
                <div className={`${Style.errorblock} ${Style.display}`}>
                  {error}
                </div>
              ))}
            <form className={Style.loginform} onSubmit={handelLogin}>
              {!isLogin && (
                <>
                  <input
                    id="username"
                    className={Style.forminput}
                    name="username"
                    placeholder="User name"
                    onChange={handelChange}
                  ></input>
                  <div className={Style.errorblock}>User name is required</div>
                </>
              )}
              <input
                id="email"
                name="email"
                placeholder="Email"
                onChange={handelChange}
                className={Style.forminput}
              ></input>
              <div className={Style.errorblock}>Email is required</div>
              <input
                id="password"
                name="password"
                placeholder="Password"
                onChange={handelChange}
                className={Style.forminput}
              ></input>
              <div className={Style.errorblock}>Password is required</div>
              {!isLogin && (
                <>
                  <input
                    id="cnfPassword"
                    name="cnfPassword"
                    placeholder="Confirm Password"
                    onChange={handelChange}
                    className={Style.forminput}
                  ></input>
                  <div className={Style.errorblock}>
                    Confirm Password is required
                  </div>
                </>
              )}
              <input
                type="submit"
                id={Style.loginbtn}
                value={isLogin ? "Log In" : "Sign Up"}
              ></input>
            </form>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <span>
                {(isLogin && <span>Don't have an account ... </span>) || (
                  <>
                    <span>Already have account ?...</span>
                  </>
                )}
                <button onClick={changeForm} id={Style.singupBtn}>
                  {isLogin ? "Sign UP" : "Login now"}
                </button>
              </span>
            </div>
            <hr></hr>

            <div className={Style.oauth}>
              <button onClick={googleLogin}>
                <img alt="googlelogo" src="/google.png"></img>
                Continue with Google
              </button>
            </div>
          </div>
          <div className={Style.ImgContainer}>
            <img src="/mountain.jpg"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFrom;
