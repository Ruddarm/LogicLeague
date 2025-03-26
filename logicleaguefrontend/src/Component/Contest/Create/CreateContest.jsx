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
    <>

        
    </>
  );
};

export default CreateContest;
