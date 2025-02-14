import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ParticipateContest.module.css";

const ParticipateContest = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [contest, setContest] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  // Fetch contest details
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await fetch(`/contests/contests/${contestId}/`);
        if (!response.ok) throw new Error("Failed to fetch contest details");

        const data = await response.json();
        setContest(data);
      } catch (error) {
        console.error("Error fetching contest details:", error);
      }
    };

    fetchContestDetails();
  }, [contestId]);

  // Fetch user ID from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserId(JSON.parse(user).id);
    } else {
      setError("You need to log in to compete in this contest.");
    }
  }, []);

  // Navigate to Compete page
  const handleCompete = () => {
  if (!contest || !userId) {
    setError("Invalid contest or user information.");
    return;
  }

  if (!contestId) {
    setError("Contest ID is missing. Please check the URL or try again.");
    return;
  }

  // Check if user is in the participants list
  if (contest.participants.includes(userId)) {
    navigate(`/compete?contestId=${contestId}`);
  } else {
    setError("You are not a participant in this contest.");
  }
};

  return (
    <div id={styles.participateContestPage}>
      <img
        id={styles.participateContestImage}
        src="/aicontest.jpg"
        alt="Contest"
      />
      <div id={styles.participateContestContainer}>
        {contest ? (
          <>
            <legend className={styles.participateContestLegend}>
              Contest Details
            </legend>
            <div id = {styles.participatedetailsbox}>
            <h2 className={styles.participateContestName}>{contest.name}</h2>
            <p className={styles.participateContestDescription}>
              {contest.description}
            </p>
            <p className={styles.participateContestDetail}>
              <strong>Start Time:</strong>{" "}
              {new Date(contest.start_time).toLocaleString()}
            </p>
            <p className={styles.participateContestDetail}>
              <strong>End Time:</strong>{" "}
              {new Date(contest.end_time).toLocaleString()}
            </p>
            <p className={styles.participateContestDetail}>
              <strong>Prizes:</strong> {contest.prizes}
            </p>
            <button
              id={styles.participateContestButton}
              onClick={handleCompete}
            >
              COMPETE
            </button>
            {error && (
              <p className={styles.participateContestError}>{error}</p>
            )}
            </div>
          </>
        ) : (
          <p id={styles.participateContestLoadingMessage}>
            Loading contest details...
          </p>
        )}
      </div>
    </div>
  );
};


export default ParticipateContest;
