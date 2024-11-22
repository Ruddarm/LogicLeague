import React from "react";
import { useState } from "react";
import Style from "./loginform.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LoginFrom() {
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
    // console.log(name);
    // console.log(e);
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
    // }
    // else{
    // console.log("gadabad hai ")
    // }
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
    }
    setValidate(isValidFields);
    return isValidFields;
  };
  const handelChange = (e) => {
    let { name, value } = e.target;
    if (name == "username") {
      setUserName(username);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "cnfPassword") {
      setCnfPassword(value);
    }
    validateFeild(name);
  };
  const handelLogin = async (e) => {
    //   console.log(e.target.elements)
    e.preventDefault();

    if (isLogin) {
      setValidate(validate());
      if (validate()) {
        try {
          console.log({ email, password });
          const response = await axios.post(
            "http://127.0.0.1:8000/users/login/",
            {
              email,
              password,
            }
          );
          if (response.status === 200) {
            localStorage.setItem("jwttoken", response.data.tokens.access);
            navigate("/home");
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setValidate(validate());
      if (isvalid) {
        if (password === cnfPassword) {
          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/users/register/",
              { username, email, password }
            );
            if (response.status === 201) {
              setSingUP(true);
              setLogin(true);
              navigate("/login");
              console.log("login sucesfull");
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          setError("Invalid Data");
          setWarning(true);
        }
      } else {
        console.log("there");
        setError("Confirm password should match with password");
        setWarning(true);
      }
    }
  };
  //   //Implment login / singup handel
  //   setValidate(validateFields());
  //   if (isLogin && isvalid) {
  //
  //   } else if (!isLogin && isvalid) {
  //     if (password !== cnfPassword) {
  //     }

  return (
    <>
      <div className={Style.Container}>
        <div>
          {(singUP && (
            <>
              <p>Account created please login</p>
            </>
          )) ||
            (showWarning && <div>{error}</div>)}
          <form className={Style.loginform} onSubmit={handelLogin}>
            {!isLogin && (
              <>
                <input
                  id="username"
                  className={Style.forminput}
                  name="username"
                  placeholder="user name"
                  onChange={handelChange}
                ></input>
                <div className={Style.errorblock}>User name is required</div>
              </>
            )}
            <input
              id="email"
              name="email"
              placeholder="email"
              onChange={handelChange}
              className={Style.forminput}
            ></input>
            <div className={Style.errorblock}>Email is required</div>
            <input
              id="password"
              name="password"
              placeholder="password"
              onChange={handelChange}
              className={Style.forminput}
            ></input>
            <div className={Style.errorblock}>Password is required</div>
            {!isLogin && (
              <>
                <input
                  id="cnfPassword"
                  name="cnfPassword"
                  placeholder="confirm password"
                  onChange={handelChange}
                  className={Style.forminput}
                ></input>
                <div className={Style.errorblock}>
                  Confirm Password is required
                </div>
              </>
            )}
            <input type="submit" value={isLogin ? "login" : "singup"}></input>
          </form>
          <div>
            <span>
              {(isLogin && <span>Don't have account ... </span>) || (
                <>
                  <span>Already have account ?...</span>
                </>
              )}
              <button onClick={changeForm} id={Style.singupBtn}>
                {isLogin ? "sing up now" : "Login now"}
              </button>
            </span>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default LoginFrom;
