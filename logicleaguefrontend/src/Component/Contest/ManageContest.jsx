import React, { useState, useEffect } from "react";
import styles from "./ManageContest.module.css";

const ManageContest = () => {
  const [contestList, setContestList] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [contestDetails, setContestDetails] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    prizes: "",
  });
  const [challengeList, setChallengeList] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [addedChallenges, setAddedChallenges] = useState([]); // New state to store added challenges

  // Fetch contests and challenges on component mount
  useEffect(() => {
    fetchAllContests();
    fetchAllChallenges();
  }, []);

  const fetchAllContests = () => {
    fetch("/contests/admin/manage/")
      .then((response) => response.json())
      .then((data) => setContestList(data || []))
      .catch((error) => console.error("Error fetching contests:", error));
  };

  const fetchAllChallenges = () => {
    fetch("/challenges/challenge/")
      .then((response) => response.json())
      .then((data) => setChallengeList(data.challenges || []))
      .catch((error) => console.error("Error fetching challenges:", error));
  };

  const handleSelectContest = (e) => {
    const contestId = e.target.value;
    const selected = contestList.find((contest) => contest.id === parseInt(contestId));
    setSelectedContest(selected);

    if (selected) {
      setContestDetails({
        name: selected.name || "",
        description: selected.description || "",
        start_time: selected.start_time ? selected.start_time.slice(0, 16) : "",
        end_time: selected.end_time ? selected.end_time.slice(0, 16) : "",
        prizes: selected.prizes || "",
      });
    } else {
      resetContestDetails();
    }
  };

  const resetContestDetails = () => {
    setContestDetails({
      name: "",
      description: "",
      start_time: "",
      end_time: "",
      prizes: "",
    });
  };

  const handleContestInputChange = (e) => {
    const { name, value } = e.target;
    setContestDetails({ ...contestDetails, [name]: value });
  };

  const handleUpdateContest = (e) => {
    e.preventDefault();

    if (!selectedContest) {
      alert("Please select a contest to update.");
      return;
    }

    const updatedData = {
      ...contestDetails,
    };

    fetch(`/contests/admin/contests/${selectedContest.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Contest updated successfully!");
        fetchAllContests();
      })
      .catch((error) => console.error("Error updating contest:", error));
  };

  const handleDeleteContest = () => {
    if (!selectedContest) {
      alert("Please select a contest to delete.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this contest?")) {
      fetch(`/contests/admin/contests/${selectedContest.id}/delete/`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 204) {
            alert("Contest deleted successfully!");
            fetchAllContests();
            setSelectedContest(null);
            resetContestDetails();
          } else {
            return response.text().then((text) => {
              throw new Error(`Failed to delete contest: ${text}`);
            });
          }
        })
        .catch((error) => console.error("Error deleting contest:", error));
    }
  };

  const handleAddChallengeToList = () => {
    if (!selectedChallenge) {
      alert("Please select a challenge.");
      return;
    }

    if (addedChallenges.includes(selectedChallenge)) {
      alert("Challenge is already added.");
      return;
    }

    setAddedChallenges([...addedChallenges, selectedChallenge]);
    setSelectedChallenge(""); // Clear the selection after adding
  };

  const handleAddChallengesToContest = () => {
    if (!selectedContest) {
        alert("Please select a contest to add challenges.");
        return;
    }

    if (addedChallenges.length === 0) {
        alert("Please add at least one challenge to the list.");
        return;
    }

    // Send challenges in the correct format
    const payload = {
        challenges: addedChallenges, // Ensure it matches the format ["uuid"]
    };

    fetch(`/contests/admin/contests/${selectedContest.id}/addchallenge/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (response.ok) {
                alert("Challenges added to contest successfully!");
                setAddedChallenges([]); // Reset addedChallenges after successful addition
            } else {
                return response.text().then((text) => {
                    throw new Error(`Failed to add challenges: ${text}`);
                });
            }
        })
        .catch((error) => console.error("Error adding challenges to contest:", error));
};

  return (
    <div className={styles.manageContainer}>
      <h1 className={styles.manageHeader}>Manage Contests</h1>

      <form onSubmit={handleUpdateContest} className={styles.manageForm}>
        <fieldset>
          <legend>Contest Details</legend>
          <div className={styles.manageBox}>
            <label htmlFor="contest-dropdown" className={styles.manageLabel}>
              Select Contest:
            </label>
            <select
              id="contest-dropdown"
              onChange={handleSelectContest}
              defaultValue=""
              className={styles.manageSelect}
            >
              <option value="" disabled>
                -- Select a Contest --
              </option>
              {contestList.map((contest) => (
                <option key={contest.id} value={contest.id}>
                  {contest.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.manageBox}>
            <label htmlFor="contest-name" className={styles.manageLabel}>
              Name:
            </label>
            <input
              type="text"
              id="contest-name"
              name="name"
              placeholder="Enter contest name"
              value={contestDetails.name}
              onChange={handleContestInputChange}
              className={styles.manageInput}
            />
          </div>

          <div className={styles.manageBox}>
            <label htmlFor="contest-description" className={styles.manageLabel}>
              Description:
            </label>
            <textarea
              id="contest-description"
              name="description"
              placeholder="Enter contest description"
              value={contestDetails.description}
              onChange={handleContestInputChange}
              className={styles.manageTextarea}
            ></textarea>
          </div>

          <div className={styles.manageBox}>
            <label htmlFor="contest-start-time" className={styles.manageLabel}>
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="contest-start-time"
              name="start_time"
              value={contestDetails.start_time}
              onChange={handleContestInputChange}
              className={styles.manageInput}
            />
          </div>

          <div className={styles.manageBox}>
            <label htmlFor="contest-end-time" className={styles.manageLabel}>
              End Time:
            </label>
            <input
              type="datetime-local"
              id="contest-end-time"
              name="end_time"
              value={contestDetails.end_time}
              onChange={handleContestInputChange}
              className={styles.manageInput}
            />
          </div>

          <div className={styles.manageBox}>
            <label htmlFor="contest-prizes" className={styles.manageLabel}>
              Prizes:
            </label>
            <input
              type="text"
              id="contest-prizes"
              name="prizes"
              placeholder="Enter contest prizes"
              value={contestDetails.prizes}
              onChange={handleContestInputChange}
              className={styles.manageInput}
            />
          </div>

          <div>
            <label htmlFor="challenge-dropdown" className={styles.manageLabel}>
              Select Challenge:
            </label>
          </div>
          <div className={styles.manageChallengeBox}>
            <select
              id="challenge-dropdown"
              value={selectedChallenge}
              onChange={(e) => setSelectedChallenge(e.target.value)}
              className={styles.manageSelect}
            >
              <option value="" disabled>
                -- Select a Challenge --
              </option>
              {Array.isArray(challengeList) &&
                challengeList.map((challenge) => (
                  <option key={challenge.challengeID} value={challenge.challengeID}>
                    {challenge.challengeName}
                  </option>
                ))}
            </select>
            <button
              type="button"
              onClick={handleAddChallengeToList}
              className={styles.manageAddChallengeButton}
            >
              +
            </button>
          </div>

          <div className={styles.addedChallengesBox}>
            <label className={styles.manageLabel}>Added Challenges:</label>
            <textarea
              value={addedChallenges.join(", ")}
              readOnly
              className={styles.manageTextarea}
            ></textarea>
          </div>
        </fieldset>

        <div className={styles.manageButtonGroup}>
          <button type="submit" className={styles.manageUpdateButton}>
            Update Contest
          </button>
          <button
            type="button"
            onClick={handleDeleteContest}
            className={`${styles.manageButton} ${styles.manageDeleteButton}`}
          >
            Delete Contest
          </button>
          <button
            type="button"
            onClick={handleAddChallengesToContest}
            className={`${styles.manageButton} ${styles.manageAddChallengeButton}`}
          >
            Add Challenges to Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageContest;
