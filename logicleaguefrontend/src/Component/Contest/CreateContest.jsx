import React, { useState } from "react"; 
import styles from './CreateContest.module.css';

const CreateContest = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    prizes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/contests/admin/contests/", {  // Make sure this matches the backend API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Contest created successfully!");
      } else {
        const errorData = await response.json();
        alert("Error creating contest: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.contentspace}>
      <h1>Create a Contest</h1>
      <div className={styles.formdiv}>
        <form onSubmit={handleSubmit}>
          <div className={styles.box}>
            <label htmlFor="name">Contest Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.box}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={styles.box}>
            <label htmlFor="start_time">Start Time:</label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
            />
          </div>
          <div className={styles.box}>
            <label htmlFor="end_time">End Time:</label>
            <input
              type="datetime-local"
              id="end_time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
            />
          </div>
          <div className={styles.box}>
            <label htmlFor="prizes">Prizes:</label>
            <input
              type="text"
              id="prizes"
              name="prizes"
              value={formData.prizes}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateContest;
