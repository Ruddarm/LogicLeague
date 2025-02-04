import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./contestPage.module.css";
import axiosInstance from "../utils/request";
import ContestCard from "./contestcard";
const ContestPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const [activeContests, setActiveContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);

  // Fetch contests when the page loads
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axiosInstance.get("/contests"); // Update with your actual API URL
        const data = response.data;
        console.log(data);
        setActiveContests(data.active_contests);
        setUpcomingContests(data.upcoming_contests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleCreateContest = () => {
    navigate("/create-contest"); // Navigate to Create Contest page
  };

  return (
    <div className={styles.contianer}>
      <div className={styles.spacer}>
        <h2>CONTEST</h2>
        <div style={{}}>
          <button className={styles.button1} onClick={handleCreateContest}>
            CREATE A CONTEST
          </button>
          <button className={styles.button2}>MANAGE CONTEST</button>
        </div>
      </div>

      <div className={styles.content1}>
        <div className={styles.head}>
          <h2 style={{margin:"0",color:"gainsboro"}}>Active Contests</h2>
          <div className={styles.contestsGrid}>
            {activeContests.length === 0 ? (
              <p>No active contests available.</p>
            ) : (
              activeContests.map((contest) => <ContestCard contest={contest}></ContestCard>)
            )}
          </div>
        </div>

        <div className={styles.head}>
          <h2 style={{margin:"0",color:"gainsboro"}}>Upcoming Contests</h2>
          <div className={styles.contestsGrid}>
            {upcomingContests.length === 0 ? (
              <p>No upcoming contests available.</p>
            ) : (
              upcomingContests.map((contest) => (
                <div className={styles.contestCard} key={contest.id}>
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
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
