import React, { useState, useContext, useEffect } from "react";

import Style from "./header.module.css";
import { AuthContext } from "./authencation";
import axiosInstance from "./request";

function Header({ sticky }) {
  const { logedIn, SetLogedIn } = useContext(AuthContext);
  const [isMenuOpen, openMenu] = useState(false);

  let logout = document.getElementById("logout");
  useEffect(()=>{
    logout?.addEventListener("click", async () => {
      console.log("called logout")
      const response = await axiosInstance.post("users/logout/");
      if (response.status == 200) {
        console.log("logedout")
        SetLogedIn(false);
      }
    });
  },[])
  //Setting event listiner on hamburger menubutton
  const handelMenu = () => {
    openMenu(!isMenuOpen);
  };
  return (
    <>
      {/* Header container */}
      <div className={Style.headContainer}>
        {/* Logo contianer */}
        <div className={Style.Headlogo}>
          <div className={Style.logo}><a href="/">LogicLeague</a></div>
        </div>
        <div className={`${Style.NavBar} ${isMenuOpen ? Style.Open : ""}`}>
          <div className={Style.closeMenu}>
            <button onClick={handelMenu}>
              <img src="/close.png"></img>
            </button>
          </div>
          <div className={Style.NavContainer}>
            <div className={Style.Option}>
              <div className={Style.listContainer}>
                <ul className={Style.unorderlist}>
                  <li>
                    <a href="#">Contest</a>
                  </li>
                  <li>
                    <a href="/challenge">Challenges</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={Style.profileContianer}>
              <div className={Style.listContainer}>
                <ul className={Style.unorderlist}>
                  {logedIn ? (
                    <>
                      <li>
                        <a id="logout">Logout</a>
                      </li>
                      <li>
                        <a>Profile</a>
                      </li>
                    </>
                  ) : (
                    <li>
                      <a href="/login">Login</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.HamBurger}>
          <button id="menubtn" onClick={handelMenu}>
            <img src="/menu.png"></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
