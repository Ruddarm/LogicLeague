import { useState } from "react";

function ContestDateTimePicker() {
  // Get today's date in "YYYY-MM-DD" format
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState("12:00");
  const [endDate, setEndDate] = useState(today);
  const [endTime, setEndTime] = useState("12:15");

  // Generate time options for dropdown (every 15 minutes)
  const generateTimeOptions = () => {
    let times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 15) {
        let time = `${hour.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  // Validate and update the end time if needed
  const validateEndTime = (newEndTime) => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${newEndTime}`);

    if (startDate === endDate && endDateTime <= startDateTime) {
      alert("End time must be after start time.");
      return;
    }
    setEndTime(newEndTime);
  };

  // Convert date & time to ISO format
  const convertToISO = (date, time) => {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toISOString();
  };

  return (
    <div>

      {/* Start Date & Time */}
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          if (new Date(e.target.value) > new Date(endDate)) {
            setEndDate(e.target.value); // Auto adjust end date if invalid
          }
        }}
        min={today} // Prevent past dates
      />

      <label>Start Time:</label>
      <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
        {generateTimeOptions().map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      <br />

      {/* End Date & Time */}
      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        min={startDate} // Cannot be before start date
      />

      <label>End Time:</label>
      <select value={endTime} onChange={(e) => validateEndTime(e.target.value)}>
        {generateTimeOptions().map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      <br />

      {/* Display Selected Date & Time */}
      <p>
        <strong>Start:</strong> {startDate} at {startTime}  
        <br />
        <strong>ISO Format:</strong> {convertToISO(startDate, startTime)}
      </p>
      <p>
        <strong>End:</strong> {endDate} at {endTime}  
        <br />
        <strong>ISO Format:</strong> {convertToISO(endDate, endTime)}
      </p>
    </div>
  );
}

export default ContestDateTimePicker;
