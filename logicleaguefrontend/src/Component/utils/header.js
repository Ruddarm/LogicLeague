import React, { useState, useContext } from "react";

import Style from "./header.module.css";
import { AuthContext } from "./authencation";

function Header({ props }) {
  const { logedIn } = useContext(AuthContext);
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
              {!logedIn ? (
                <>
                  <li>
                    <a href="logout">Logout</a>
                  </li>
                  <li>
                    <a>Profile</a>
                  </li>
                </>
              ) : (
                <li>
                  <a>Login</a>
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
