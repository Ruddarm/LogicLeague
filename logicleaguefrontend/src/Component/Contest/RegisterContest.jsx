import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./RegisterContest.module.css";

const RegisterContest = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch contest details
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await fetch(`/contests/contests/${contestId}/`);
        if (!response.ok) throw new Error("Failed to fetch contest details");

        const data = await response.json();
        const { participants, challenges, ...filteredData } = data;
        setContest(filteredData);
      } catch (error) {
        console.error("Error fetching contest details:", error);
        setMessage("Error fetching contest details. Please try again.");
      }
    };

    fetchContestDetails();
  }, [contestId]);

  // Retrieve user ID from localStorage
  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        setUserId(JSON.parse(user).id);
      } else {
        setMessage("You are not logged in. Please log in first.");
      }
    } catch (error) {
      console.error("Error reading user data:", error);
      setMessage("Failed to retrieve user information.");
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      setMessage("User ID is missing. Please log in first.");
      return;
    }
  
    const userData = { user_id: userId };
    console.log("Sending request:", JSON.stringify(userData)); // Debugging log
  
    try {
      const response = await fetch(`/contests/contests/${contestId}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const responseData = await response.json().catch(() => ({}));
      console.log("Server response:", response.status, responseData); // Debugging log
  
      if (!response.ok) {
        throw new Error(responseData.error || "Error registering for contest.");
      }
  
      setMessage("You have successfully registered for the contest!");
    } catch (error) {
      console.error("Error registering for contest:", error);
      setMessage(error.message);
    }
  };

  return (
    <div id={styles.registerPage}>
      <img id={styles.registerImage} src="/aicontest.jpg" alt="Contest" />
      <div id={styles.registerContainer}>
        {contest ? (
          <>
            <h2 className={styles.regcontestName}>{contest.name}</h2>
            <p className={styles.regdetail}>{contest.description}</p>
            <p className={styles.regdetail}>
              <strong>Start Time:</strong> {new Date(contest.start_time).toLocaleString()}
            </p>
            <p className={styles.regdetail}>
              <strong>End Time:</strong> {new Date(contest.end_time).toLocaleString()}
            </p>
            <p className={styles.regdetail}>
              <strong>Prizes:</strong> {contest.prizes}
            </p>

            <form id={styles.registerForm} onSubmit={handleSubmit}>
              <button type="submit" id={styles.registerButton}>
                COMPETE
              </button>
            </form>
            {message && <p id={styles.registerMessage}>{message}</p>}
          </>
        ) : (
          <p id={styles.loadingMessage}>Loading contest details...</p>
        )}
      </div>
    </div>
  );
};

export default RegisterContest;
