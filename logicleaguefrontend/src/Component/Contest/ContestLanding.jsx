// A React js page for Contest Landing Page
import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// Importing the CSS file for the Contest Landing Page
import Style from "./ContestLanding.module.css";
import { getHtmlformat } from "../Challenge/ChallengeDescription/ChallengeDescripiton";
// Function to create a Contest Info Card

function ContestInfoCard(title, content) {
  return (
    <>
      <div className={Style.ContestInfoCard}>
        <span id={Style.infoHeading}>{title}</span>
        <div className={Style.content}>{content}</div>
      </div>
    </>
  );
}
function contestDivHtml(title, content) {
  return (
    <>
      <div className={Style.ContestInfoCard}>
        <span id={Style.infoHeading}>{title}</span>
        {/* <div className={Style.content}>{content}</div> */}
        <div
          className={`${Style.content} ql-editor`}
          dangerouslySetInnerHTML={{
            __html: getHtmlformat(content),
          }}
        ></div>
      </div>
    </>
  );
}

// Function to create the Contest Banner
function ContestBanner({ name, start, end }) {
  const startDateTime = convertUTCtoIST(new Date(start));
  const endDateTime = convertUTCtoIST(new Date(end));
  const startDate = startDateTime.toISOString().split("T")[0];
  // "2024-04-01"
  const startTime = startDateTime
    .toISOString()
    .split("T")[1]
    .split("Z")[0]
    .substring(0, 5);

  const endDate = endDateTime.toISOString().split("T")[0];
  const endTime = endDateTime
    .toISOString()
    .split("T")[1]
    .split("Z")[0]
    .substring(0, 5);

  return (
    <>
      <div className={Style.ContestBannerContainer}>
        <img
          id={Style.trophyImage}
          src="\trophy.png"
          alt="Contest Banner"
          className={Style.ContestBannerImage}
        />
        <span id={Style.ContestBannerText}>{name}</span>
        <span id={Style.timerText}>
          {startDate} {startTime} - {endDate} {endTime}
        </span>
      </div>
    </>
  );
}
// Function to create the Contest Challenge Board
function ContestChallengeBoard({ challenges, contestID }) {
  const Navigate = useNavigate();

  const NavigateToplayGround = (id) => {
    Navigate(`/challenge/${id}/?envtype=contest&contestid=${contestID}`);
  };
  return (
    <>
      <div className={Style.ContestInfoCard}>
        <span id={Style.infoHeading}>Challenges</span>
        <div className={Style.ChalenegeBox}>
          {challenges.map((challenge, indx) => (
            <ContestChallengeCard
              title={challenge.challenge_name}
              id={challenge.challenge}
              marks={challenge.marks}
              navigate={NavigateToplayGround}
              key={indx}
            ></ContestChallengeCard>
          ))}
        </div>
      </div>
    </>
  );
}
// Function to create the Contest Challenge Card
function ContestChallengeCard({ title, id, marks, navigate }) {
  return (
    <>
      <div className={Style.ChallengeCard}>
        <div className={`${Style.flexCentercolumn} `}>
          <div id={Style.infoHeading}>{title}</div>
          <div
            style={{
              padding: "0rem 0.5rem",
              fontFamily: "lato",
              fontSize: "0.9rem",
            }}
          >
            Max Score: <span>{marks}</span>
          </div>
        </div>
        <div className={Style.flexCenter}>
          <button
            onClick={() => {
              navigate(id);
            }}
          >
            Solve
          </button>
        </div>
      </div>
    </>
  );
}
// Function to create the Contest Landing Page
function ContestLanding({
  contest,
  challenges,
  isRegistered,
  regUser,
  unregUser,
  leaders,
  isUpcomming,
  isOngoing,
  isPast,
}) {
  const [upComing, setUpComing] = useState(
    new Date(contest?.start_time) > new Date()
  );

  // setUpComing(contestStartTime > currentTime);
  return (
    <>
      <div className={Style.ContestLandingPageContainer}>
        <div>
          {
            <ContestBanner
              name={contest.name}
              start={contest.start_time}
              end={contest.end_time}
            />
          }
          <div className={Style.ContestContentContainer}>
            <div className={Style.ContestInfoContainer}>
              {ContestInfoCard("About Contest", contest.description)}
              {contestDivHtml("Rules", contest.rules)}
              {contestDivHtml("Prizes", contest.prizes)}
              {contestDivHtml("Scoring", contest.scoring)}
            </div>
            <div className={Style.ContestChallengeBoardContainer}>
              {
                <ContestChallengeBoard
                  challenges={challenges}
                  contestID={contest.id}
                />
              }
            </div>
            <div className={Style.ContestLeaderboardContainer}>
              <ContestLeaderboard leaders={[]} />
            </div>
            {upComing ? (
              <div className={Style.reg_btn_container}>
                <button
                  onClick={isRegistered ? unregUser : regUser}
                  id={isRegistered ? Style.unreg_btn : Style.unreg_btn}
                >
                  {isRegistered ? "Unregister" : "Register Now"}
                </button>
              </div>
            ) : (
              <>
                <h4>You can not Register</h4>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
// Function to create a contest Leaderboard
function ContestLeaderboard({ leaders }) {
  return (
    <>
      <div className={Style.ContestInfoCard}>
        <span id={Style.infoHeading}>Leaderboard</span>
        <table className={Style.LeaderboardBox}>
          <thead className={Style.LeaderboardHead}>
            <tr>
              <th className={Style.rank}>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Submission</th>
            </tr>
          </thead>
          <tbody className={Style.LeaderboardHead}>
            {leaders.length > 0 ? (
              leaders.map((user, indx) => (
                <tr key={indx}>
                  <UserCard user={user}></UserCard>
                </tr>
              ))
            ) : (
              <tr>No submission found yet</tr>
            )}
            {/* <tr>{userCard(1, "ruddarm", 10)}</tr>
            <tr>{userCard(2, "Niks", 9)}</tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UserCard({ user }) {
  return (
    <>
      <td className={Style.rank}>{user.rank}</td>
      <td className={Style.name}>{user.name}</td>
      <td children={user.score} className={Style.score}>
        {user.score}
      </td>
      <td className={Style.submission}>
        <button>View Submission</button>
      </td>
    </>
  );
}

function convertISTtoUTC(dateStr, timeStr) {
  const [year, month, day] = dateStr.split("-");
  const [hour, minute] = timeStr.split(":");

  // Create Date object in IST manually (no timezone offset issues)
  const istDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

  // Now subtract 5.5 hours to get UTC
  const utcDate = new Date(istDate.getTime() - 5.5 * 60 * 60 * 1000);
  return utcDate.toISOString();
}
// const convertISTtoUTC = (dateStr, timeStr) => {
function convertUTCtoIST(utcString) {
  const date = new Date(utcString);
  date.setMinutes(date.getMinutes() + 330); // +5.5 hours
  return date;
}
export default ContestLanding;
