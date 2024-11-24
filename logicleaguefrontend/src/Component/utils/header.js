import React from "react";
import Style from "./header.module.css";
function Header({ props }) {
  return (
    <>
      {/* Header container */}
      <div className={Style.headContainer}>
        {/* Logo contianer */}
        <div className={Style.Headlogo}>
          <div className={Style.logo}>LogicLeague</div>
          <div className={Style.Option}>
            <ul>
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
        {/* Profile Contaienr */}
        <div>
          <button>Profile</button>
        </div>
      </div>
    </>
  );
}

export default Header;
