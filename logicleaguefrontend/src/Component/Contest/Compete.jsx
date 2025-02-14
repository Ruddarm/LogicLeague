import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Compete.module.css";

const Compete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contestId, setContestId] = useState(null);
  const [contest, setContest] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  // Extract contestId from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("contestId");
    setContestId(id);
    console.log("Contest ID from query:", id); // Debugging
  }, [location.search]);

  // Fetch contest details and challenges
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        if (!contestId) throw new Error("Invalid contest ID");

        const response = await fetch(`/contests/contests/${contestId}/`);
        if (!response.ok) throw new Error("Failed to fetch contest details");

        const data = await response.json();
        setContest(data);

        // Debug: Log the fetched contest data
        console.log("Fetched contest data:", data);

        // Fetch challenge details if challenges are present
        if (data.challenges && data.challenges.length > 0) {
          const fetchedChallenges = await Promise.all(
            data.challenges.map(async (challengeId) => {
              try {
                const challengeResponse = await fetch(
                  `/challenges/challenge/${challengeId}/`
                );
                if (!challengeResponse.ok) {
                  console.error(`Failed to fetch challenge with ID ${challengeId}`);
                  return { id: challengeId, name: "Unknown Challenge" };
                }
                const challengeData = await challengeResponse.json();
                console.log("Fetched challenge data:", challengeData); // Debugging
                return {
                  id: challengeId,
                  name: challengeData.challenge.challengeName || "Unnamed Challenge",
                };
              } catch (error) {
                console.error("Error fetching challenge:", error);
                return { id: challengeId, name: "Error fetching challenge" };
              }
            })
          );
          setChallenges(fetchedChallenges);
        } else {
          setChallenges([]);
        }
      } catch (error) {
        console.error("Error fetching contest details:", error);
        setError("Unable to load contest details. Please try again later.");
      }
    };

    if (contestId) {
      fetchContestDetails();
    }
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

  // Navigate to the compete page
  const handleCompete = () => {
    if (!contest || !userId) {
      setError("Invalid contest or user information.");
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
    <div id={styles.competeContestPage}>
      <img id={styles.competeContestImage} src="/aicontest.jpg" alt="Contest" />
      <div id={styles.competeContestContainer}>
        {contest ? (
          <>
            <legend className={styles.competeContestLegend}>
              Contest Details
            </legend>
            <div id={styles.competeDetailsBox}>
              <h2 className={styles.competeContestName}>{contest.name}</h2>
              <p className={styles.competeContestDescription}>
                {contest.description}
              </p>
              <p className={styles.competeContestDetail}>
                <strong>Prizes:</strong> {contest.prizes}
              </p>
              <ul className={styles.competeContestChallengeList}>
                {challenges.length > 0 ? (
                  challenges.map((challenge) => (
                    <li
                      key={challenge.id}
                      className={styles.competeContestChallenge}
                    >
                      {challenge.name}
                    </li>
                  ))
                ) : (
                  <p>No challenges available for this contest yet.</p>
                )}
              </ul>
              <button
                id={styles.competeContestButton}
                onClick={handleCompete}
              >
                COMPETE
              </button>
              {error && (
                <p className={styles.competeContestError}>{error}</p>
              )}
            </div>
          </>
        ) : (
          <p id={styles.competeContestLoadingMessage}>
            Loading contest details...
          </p>
        )}
      </div>
    </div>
  );
};

export default Compete;
