import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./RegisterContest.module.css";

const RegisterContest = () => {
  const { contestId } = useParams(); // Get contestId from URL
  const [contest, setContest] = useState(null); // Store contest details
  const [username, setUsername] = useState(""); // Store username
  const [email, setEmail] = useState(""); // Store email
  const [message, setMessage] = useState(""); // Display messages

  // Fetch contest details
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const response = await fetch(`/contests/contests/${contestId}/`); // Fetch contest details
        if (!response.ok) {
          throw new Error("Failed to fetch contest details");
        }
        const data = await response.json();
        const { participants, challenges, ...filteredData } = data; // Exclude participants and challenges
        setContest(filteredData); // Update contest state
      } catch (error) {
        console.error("Error fetching contest details:", error);
        setMessage("Error fetching contest details. Please try again.");
      }
    };

    fetchContestDetails();
  }, [contestId]);

  // Retrieve user details from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    } else {
      setMessage("You are not logged in. Please log in first.");
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email };

    try {
      const response = await fetch(`/contests/contests/${contestId}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Send username and email here
      });

      if (response.ok) {
        setMessage("You have successfully registered for the contest!");
      } else {
        const data = await response.json();
        setMessage(data.error || "Error registering for contest.");
      }
    } catch (error) {
      console.error("Error registering for contest:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div id={styles.registerPage}>
      <img
        id={styles.registerImage}
        src="/aicontest.jpg" // Replace with your image path
        alt="Contest"
      />
      <div id={styles.registerContainer}>
        {contest ? (
          <>
            {/* Centered Contest Name */}
            <h2 className={styles.regcontestName}>{contest.name}</h2>

            {/* Right-Aligned Contest Details */}
            <p className={styles.regdetail}>{contest.description}</p>
            <p className={styles.regdetail}>
              <strong>Start Time:</strong>{" "}
              {new Date(contest.start_time).toLocaleString()}
            </p>
            <p className={styles.regdetail}>
              <strong>End Time:</strong>{" "}
              {new Date(contest.end_time).toLocaleString()}
            </p>
            <p className={styles.regdetail}>
              <strong>Prizes:</strong> {contest.prizes}
            </p> 
            
            <form id={styles.registerForm} onSubmit={handleSubmit}>
              <button type="submit" id={styles.registerButton}>
                REGISTER
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
