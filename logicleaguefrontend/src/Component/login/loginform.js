import React from "react";
import { useState } from "react";
import Style from "./loginform.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LoginFrom() {
  const [isLogin, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeForm = () => {
    setLogin(!isLogin);
  };
  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      console.log({email,password})
      const response = await axios.post("http://127.0.0.1:8000/users/login/", {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("jwttoken", response.data.tokens);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={Style.Container}>
        <div>
          <form className={Style.loginform}
            onSubmit={handelLogin}
          >
            <input name="userName" placeholder="user name"></input>
            <br></br>
            <input
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br></br>
            <input
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br></br>
            {!isLogin && (
              <>
                <input
                  name="cnfpassowrd"
                  placeholder="confirm password"
                ></input>
                <br></br>
              </>
            )}
            <input type="submit"></input>
          </form>
          <div>
            <span>
              {(isLogin && <span>Don't have accoutn ... </span>) || (
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
