import React from "react";
import Style from "./ProfilePage.module.css";
function ProfilePage() {
  return (
    <>
      <div className={Style.profileContainer}>
        <div className={Style.profileRightContainer}>
          <div className={Style.profileCardContainer}>
            <div className={Style.profileImgContainer}>
              <div className={Style.profileBgImgContainer}></div>
              <div className={Style.absoulteCotainer}>
                <div id={Style.profileIconDiv}>
                  <img
                    id={Style.profileIcon}
                    alt="profile-icon"
                    src={"/ruddram.jpg"}
                  ></img>
                </div>
              </div>
            </div>
            {/* User name */}
            <div className={Style.profileTitleContainer}>
              <h2>Jyotiraditya Mourya</h2>
              <p>@ruddarm</p>
            </div>
            {/* Description */}
            <div className={Style.profileHeadingContainer}>
              <p>
                Software Engineer| Full Stack Developer | Machine lead at GDG on
                campus | Investor | Passionate about Innovative Solutions and
                technologies | JAVA | PYTHON | JS
              </p>
            </div>
          </div>
        </div>
        <div className={Style.profileLeftContainer}></div>
      </div>
    </>
  );
}

export default ProfilePage;
