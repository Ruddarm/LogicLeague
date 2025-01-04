import React, { PureComponent, useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/request";
import Style from "./home.module.css";

function contestCard() {
  return (
    <div class={Style.card}>
      <div class={Style.contestTitle}>
        <h3>
          <a href="#">Hackathon</a>
        </h3>
      </div>
      <div class={Style.contestDate}>
        <p>Registration open till 30/12/2024</p>
      </div>
      <div class={Style.Register}>
        <button class={Style.Regbtn}>Register</button>
      </div>
    </div>
  );
}
function HomePage() {
  const [contest, setContest] = useState([1, 2, 34]);
  const [data, setdata] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const getData = async () => {
    let response = await axiosInstance.get("users/getName/");
    setdata(response?.data.msg);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={Style.bodyContainer}>
        {/* Coding Qutoe */}
        <div className={Style.main}>
          <div className={Style.mainContainer}>
            <h2 id={Style.heading}>"Code is the voice of your logic"</h2>
            <div id={Style.Qutoe}>
              Competitive coding is more than just solving problems it's a
              journey of sharpening your mind and pushing your limits.
              <br />
              <br />
              It challenges you to think critically, strategize effectively, and
              create solutions that are both elegant and efficient.
              <br />
              <br />
            </div>
          </div>
        </div>
        {/* Why join codeing league */}
        <div className={Style.main2}>
          <h1 id={Style.heading}>WHY JOIN LOGICLEAGUE ?</h1>
          <div className={Style.mainContainer2}>
            <div className={Style.compilerImgContainer}>
              <img src="/playground.png" alt="" id={Style.img} />
            </div>
            <div id={Style.info}>
              <ul id={Style.list}>
                <li>Exciting Challenges</li>
                <p>Compete in diverse contests Designed to push your limits</p>
                <li>Prizes and Recognization</li>
                <p>Win amazing prizes and earn a spot on Leadboard</p>
                <li>Learn and Grow</li>
                <p>Hone your skills with real world problems and solutions</p>
                <li>Community</li>
                <p>
                  Connect with fellow Coders and share to grow ,<br />
                  code ,compete and conquer
                </p>
              </ul>
            </div>
          </div>
        </div>
        {/* Start with us */}
        <div className={Style.main3}>
          <div className={Style.main3Content}>
            <h1>Start your journey with us</h1>
          </div>
          <div className={Style.main3ImgContainer}>
            <img className={Style.image} src="codeEditior.png" alt="" />
          </div>
        </div>
        {/* Contest Card */}
        <div className={Style.contest}>
          <h2>UPCOMING CONTESTS</h2>
          <div class={Style.contestContainer}>
            <div class={Style.contestCardContainer}>
              {contest.map(() => contestCard())}
            </div>
          </div>
        </div>
        {/* Clg info */}
        <div className={Style.BharatiVidyapeeth}>
          <div className={Style.title}>
            <h2>Bharati Vidyapeeth(Deemed To be University),Navi Mumbai</h2>
          </div>
          <div className={Style.contentContainer}>
            <div className={Style.photo}>
              <img id={Style.Bvdu_image} src="BVDU_DMS.webp"  alt="college"/>
            </div>
            <div className={Style.paragraph}>
              <ul id={Style.Intro}>
                <li>
                  Bharati Vidyapeeth is an organization established in the year
                  1964 by <b> Dr. Patangraoji Kadam.</b>
                </li>
                <li>
                  Eminent in the field of education, Bharati Vidyapeeth is one
                  of the largest network of educational institutions in India
                  and overseas.
                </li>
                <li>
                  <b>Bharati Vidyapeeth (Deemed to be University) </b>has been
                  <b>Accredited to A+ grade in its third Cycle by ‘NAAC’ </b>in
                  2017 (BVDU accredited to Grade ‘A’ in 2004 and 2011).
                </li>
                <li>
                  <b>Why BVDU ?</b>
                  <br />
                  <br />
                  Empowering students to aim higher and enabling them to reach
                  their goals. &nbsp;it is committed to providing value-based
                  Programmes and innovative learning &nbsp;
                  <button a id={Style.Read_more_btn}>
                    <a
                      href="https://www.bvuniversity.edu.in/about/bharati-vidyapeeth"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More..
                    </a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Social Media */}
        <div className={Style.social_media}>
          <div class={Style.logo_with_name}>
            <img src="/Bvp_logo_final.png" id={Style.bvp} />
            <div class={Style.name_contianer}>
              <sapn>Bharti Vidyapeeth Deemeed to be University</sapn>
              <span>(DMS), Kharghar ,Navi Mumbai</span>
            </div>
          </div>
          <div class={Style.social}>
            <div class={Style.follow}>
              <p>Follow us :</p>
            </div>
            <div class={Style.symbol}>
              <ul class={Style.icon}>
                <a href="#">
                  <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="#">
                  <i class="fa-brands fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="#">
                  <i class="fa-brands fa-youtube"></i>
                </a>
              </ul>
            </div>
          </div>
          <div class={Style.copywrite}>
            <h4>Copywrite &#169; &nbsp; 2025 &nbsp;LogicLeague</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
