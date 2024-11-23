import React, { PureComponent } from "react";
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
                <a>Contest</a>
              </li>
              <li>
                <a>Challenges</a>
              </li>
              <li>
                <a>About Us</a>
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
