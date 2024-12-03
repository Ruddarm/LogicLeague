import React, { useState, useContext } from "react";

import Style from "./header.module.css";
import { AuthContext } from "./authencation";
import axiosInstance from "./request";

function Header({ props }) {
  const { logedIn, SetLogedIn } = useContext(AuthContext);
  let logout = document.getElementById("logout");
  logout?.addEventListener("click", async () => {
    const response = await axiosInstance.post("users/logout/");
    if (response.status == 200) {
      SetLogedIn(false);
    }
  });
  return (
    <>
      {/* Header container */}
      <div className={Style.headContainer}>
        {/* Logo contianer */}
        <div className={Style.Headlogo}>
          <div className={Style.logo}>LogicLeague</div>
          <div className={Style.listContainer}>
            <ul className={Style.unorderlist}>
              <li>
                <a href="#">Contest</a>
              </li>
              <li>
                <a href="#">Challenges</a>
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
        <div></div>
      </div>
    </>
  );
}

export default Header;
