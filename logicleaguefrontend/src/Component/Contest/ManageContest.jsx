import React, { useState, useEffect } from "react";
import styles from "./ManageContest.module.css";

const ContestManagement = () => {
  const [contests, setContests] = useState([]); // List of contests
  const [selectedContest, setSelectedContest] = useState(null); // Currently selected contest
  const [contestInfo, setContestInfo] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    prizes: "",
  }); // Contest details
  const [challenges, setChallenges] = useState([]); // List of all challenges
  const [selectedChallenges, setSelectedChallenges] = useState([]); // Challenges selected for a contest
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  // Fetch all contests and challenges on component load
  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const response = await fetch("/contests/admin/manage/");
        if (response.ok) {
          const data = await response.json();
          setContests(data || []);
        } else {
          setError("Failed to fetch contests.");
        }
      } catch (err) {
        setError("Error fetching contests: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchChallenges = async () => {
      try {
        const response = await fetch("/challenges/challenge/");
        if (response.ok) {
          const data = await response.json();
          console.log("Challenges API Response:", data); // Log the response
          setChallenges(data.challenges || []); // Access the challenges array from the response
        } else {
          setError("Failed to fetch challenges.");
        }
      } catch (err) {
        setError("Error fetching challenges: " + err.message);
      }
    };

    fetchContests();
    fetchChallenges();
  }, []);

  // Handle contest selection
  const handleContestSelect = (e) => {
    const contestId = e.target.value;
    const selected = contests.find((contest) => contest.id === parseInt(contestId));
    setSelectedContest(selected);
    if (selected) {
      setContestInfo({
        name: selected.name,
        description: selected.description,
        start_time: selected.start_time ? selected.start_time.slice(0, 16) : "",
        end_time: selected.end_time ? selected.end_time.slice(0, 16) : "",
        prizes: selected.prizes,
      });
    } else {
      setContestInfo({
        name: "",
        description: "",
        start_time: "",
        end_time: "",
        prizes: "",
      });
    }
  };

  // Handle input changes in contest details
  const handleInputChange = (e) => {
    setContestInfo({
      ...contestInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding challenges to the selected contest
  const handleAddChallenges = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    if (!selectedContest) {
      setError("Please select a contest first.");
      return;
    }
  
    // Log the selected challenges to ensure we are sending the correct challenge IDs
    const challengeIds = selectedChallenges.map((challengeId) => challengeId.toString());
    console.log("Selected challenge IDs:", challengeIds); // Log the challenge IDs being sent
  
    try {
      const response = await fetch(`/contests/admin/contests/${selectedContest.id}/add_problem/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ challenges: challengeIds }), // Send challenge IDs as strings
      });
  
      if (response.ok) {
        setSuccessMessage("Challenges added successfully!");
        setSelectedChallenges([]); // Clear selected challenges after successful submission
      } else {
        const errorData = await response.json();
        console.log("Error Response:", errorData); // Log the error response for debugging
        setError("Error adding challenges: " + JSON.stringify(errorData));
      }
    } catch (err) {
      setError("An unexpected error occurred: " + err.message);
    }
  };
  

  // Render component
  return (
    <div className={styles.contentspace}>
      <h1>Manage Contest</h1>
      {loading && <p>Loading contests...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <div className={`${styles.formdiv} ${styles.scrollable}`}>
        <form onSubmit={handleAddChallenges}>
          {/* Contest Selection */}
          <div className={styles.box}>
            <label htmlFor="contestSelect">Select Contest:</label>
            <select
              id="contestSelect"
              onChange={handleContestSelect}
              value={selectedContest?.id || ""}
            >
              <option value="">--Select a Contest--</option>
              {contests.length > 0 ? (
                contests.map((contest) => (
                  <option key={contest.id} value={contest.id}>
                    {contest.name} {new Date(contest.start_time) > new Date() ? "(Upcoming)" : "(Active)"}
                  </option>
                ))
              ) : (
                <option disabled>Loading contests...</option>
              )}
            </select>
          </div>

          {/* Add Challenges Section */}
          <div className={styles.box}>
            <label htmlFor="challenges">Select Challenges:</label>
            <select
              id="challenges"
              multiple
              value={selectedChallenges}
              onChange={(e) =>
                setSelectedChallenges(Array.from(e.target.selectedOptions, (option) => option.value))
              }
            >
              {(() => {
                const challengeOptions = [];
                if (Array.isArray(challenges) && challenges.length > 0) {
                  for (let i = 0; i < challenges.length; i++) {
                    const challenge = challenges[i];
                    challengeOptions.push(
                      <option key={challenge.challengeID} value={challenge.challengeID}>
                        {challenge.challengeName}
                      </option>
                    );
                  }
                } else {
                  challengeOptions.push(<option key="no-challenges" disabled>No challenges available</option>);
                }
                return challengeOptions;
              })()}
            </select>
          </div>

          <button type="submit" disabled={!selectedContest}>
            Add Challenges
          </button>
        </form>

        {/* Contest Details */}
        <form>
          <div className={styles.box}>
            <label htmlFor="name">Contest Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contestInfo.name}
              onChange={handleInputChange}
              disabled={!selectedContest}
            />
          </div>

          <div className={styles.box}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={contestInfo.description}
              onChange={handleInputChange}
              disabled={!selectedContest}
            ></textarea>
          </div>

          <div className={styles.box}>
            <label htmlFor="start_time">Start Time:</label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              value={contestInfo.start_time}
              onChange={handleInputChange}
              disabled={!selectedContest}
            />
          </div>

          <div className={styles.box}>
            <label htmlFor="end_time">End Time:</label>
            <input
              type="datetime-local"
              id="end_time"
              name="end_time"
              value={contestInfo.end_time}
              onChange={handleInputChange}
              disabled={!selectedContest}
            />
          </div>

          <div className={styles.box}>
            <label htmlFor="prizes">Prizes:</label>
            <input
              type="text"
              id="prizes"
              name="prizes"
              value={contestInfo.prizes}
              onChange={handleInputChange}
              disabled={!selectedContest}
            />
          </div>

          <button type="submit" disabled={!selectedContest}>
            Update Contest
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContestManagement;
