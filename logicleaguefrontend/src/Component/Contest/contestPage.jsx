import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './contestPage.module.css';

const ContestPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const [activeContests, setActiveContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);

  // Fetch contests when the page loads
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('/contests'); // Update with your actual API URL
        const data = await response.json();
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

  const handleManageContest = () => {
    navigate("/manage-contest");
  };

  const handleRegisterContest = (contestId) => {
    navigate(`/register-contest/${contestId}`); // Navigate to Register Contest page with contestId
  };

  const handleParticipateContest = (contestId) => {
    navigate(`/participate-contest/${contestId}`); // Navigate to Participate Contest page with contestId
  };

  return (
    <div>
      <div className={styles.spacer}>
        <h3>CONTEST</h3>
        <button className={styles.button1} onClick={handleCreateContest}>CREATE A CONTEST</button>
        <button className={styles.button2} onClick={handleManageContest}>MANAGE CONTEST</button>
      </div>

      <div className={styles.content1}>
        <div className={styles.head}>
          <h4>Active Contests</h4>
          <div className={styles.contestsGrid}>
            {activeContests.length === 0 ? (
              <p>No active contests available.</p>
            ) : (
              activeContests.map((contest) => (
                <div className={styles.contestCard} key={contest.id}>
                  <h5>{contest.name}</h5>
                  <p>{contest.description}</p>
                  <p><strong>Start Time:</strong> {new Date(contest.start_time).toLocaleString()}</p>
                  <p><strong>End Time:</strong> {new Date(contest.end_time).toLocaleString()}</p>
                  <button
                    className={styles.button1}
                    onClick={() => handleParticipateContest(contest.id)}
                  >
                    PARTICIPATE
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.head}>
          <h4>Upcoming Contests</h4>
          <div className={styles.contestsGrid}>
            {upcomingContests.length === 0 ? (
              <p>No upcoming contests available.</p>
            ) : (
              upcomingContests.map((contest) => (
                <div className={styles.contestCard} key={contest.id}>
                  <h5>{contest.name}</h5>
                  <p>{contest.description}</p>
                  <p><strong>Start Time:</strong> {new Date(contest.start_time).toLocaleString()}</p>
                  <p><strong>End Time:</strong> {new Date(contest.end_time).toLocaleString()}</p>
                  <button
                    className={styles.button1}
                    onClick={() => handleRegisterContest(contest.id)}
                  >
                    REGISTER
                  </button>
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
