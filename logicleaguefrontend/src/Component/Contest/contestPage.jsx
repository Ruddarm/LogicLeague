import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./contestPage.module.css";
import axiosInstance from "../utils/request";
import ContestCard from "./contestcard";
import { fetchContestList } from "./api/contestapi";

function ContestTitle({ title }) {
  return <h2 style={{ margin: "0", color: "var(--lightGrey)" }}>{title}</h2>;
}
const ContestPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const [liveContestList, setLiveContestList] = useState([]);
  const [upcomingContestList, setUpcomingContestList] = useState([]);
  const [pastContestList, setPastContestList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getContestList = async () => {
    try {
      setLoading(true);
      let response = await fetchContestList();
      setLoading(false);
      setUpcomingContestList(response.data?.upcoming);
      setLiveContestList(response.data?.live);
      setPastContestList(response.data?.past);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleContestClick = (contestId) => {
    // Navigate to the contest details page with the contest ID
    navigate(`/contest/view/${contestId}`);
  };

  useEffect(() => {
    getContestList();
  }, []);

  return (
    <>
      {loading ? (
        "haan a raha hu bsdk"
      ) : (
        <div className={styles.contianer}>
          <div className={styles.spacer}>
            <h2>CONTEST</h2>
            <div style={{}}>
              <button className={styles.button1}>CREATE A CONTEST</button>
              <button className={styles.button2}>MANAGE CONTEST</button>
            </div>
          </div>

          <div className={styles.content1}>
            <div className={styles.head}>
              <ContestTitle title={"Live Contest"}></ContestTitle>
              <div className={styles.contestCardContainer}>
                {liveContestList.length === 0 ? (
                  <p>No active contests available.</p>
                ) : (
                  liveContestList.map((contest) => (
                    <ContestCard
                      key={contest.id}
                      onClick={handleContestClick}
                      contest={contest}
                    ></ContestCard>
                  ))
                )}
              </div>
            </div>

            <div className={styles.head}>
              <ContestTitle title={"Upcoming Contest"}></ContestTitle>
              <div className={styles.contestCardContainer}>
                {upcomingContestList.length === 0 ? (
                  <p>No upcoming contests available.</p>
                ) : (
                  upcomingContestList.map((contest) => (
                    <ContestCard
                      key={contest.id}
                      onClick={handleContestClick}
                      contest={contest}
                    ></ContestCard>
                  ))
                )}
              </div>
            </div>

            <div className={styles.head}>
              <ContestTitle title={"Past Contests"}></ContestTitle>
              <div className={styles.contestCardContainer}>
                {pastContestList.length === 0 ? (
                  <p>No past contests available.</p>
                ) : (
                  pastContestList.map((contest) => (
                    <ContestCard
                      key={contest.id}
                      onClick={handleContestClick}
                      contest={contest}
                    ></ContestCard>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContestPage;

/**
 * <div className={styles.contestCard} key={contest.id}>
                  <h5>{contest.name}</h5>
                  <p>{contest.description}</p>
                  <p>
                    <strong>Start Time:</strong>{" "}
                    {new Date(contest.start_time).toLocaleString()}
                  </p>
                  <p>
                    <strong>End Time:</strong>{" "}
                    {new Date(contest.end_time).toLocaleString()}
                  </p>
                  <button className={styles.button1}>REGISTER</button>
                </div>
 * 
 * 
 * 
 */
