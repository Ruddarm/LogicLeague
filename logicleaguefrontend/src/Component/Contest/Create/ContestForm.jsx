import React from "react";
import Style from "./ContestForm.module.css";
import ContestDateTimePicker from "./DateTime";
import TextEditior from "../../Challenge/CreateChallenge/TextEditor";

function ContestLabel({ title }) {
  return <label className={Style.ContestLabel}>{title}</label>;
}
function DatePicker({ startDate }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <input
        type="date"
        className={Style.ContestInput}
        value={startDate}
        onChange={(e) => {
          // setStartDate(e.target.value);
          // if (new Date(e.target.value) > new Date(endDate)) {
          //   setEndDate(e.target.value); // Auto adjust end date if invalid
          // }
        }}
        min={today} // Prevent past dates
      />
    </>
  );
}

function TimePicker({ startTime, setStartTime, generateTimeOptions }) {
  return (
    <>
      <select
        className={Style.ContestInput}
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      >
        {generateTimeOptions().map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </>
  );
}
function ErrorMsg({ msg }) {}
function ContestForm() {
  //
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
  return (
    <>
      <div className={Style.Container}>
        <div className={Style.ContainerInner}>
          <div className={Style.InputContainer}>
            <ContestLabel title={"Contest Name"}></ContestLabel>
            <input className={Style.ContestInput}></input>
          </div>
          <div className={Style.DateTimeInputContainer}>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"Start Date"}></ContestLabel>
              <DatePicker></DatePicker>
            </div>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"Start Time"}></ContestLabel>
              <TimePicker
                generateTimeOptions={generateTimeOptions}
              ></TimePicker>
            </div>
          </div>
          <div className={Style.DateTimeInputContainer}>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"End Date"}></ContestLabel>
              <DatePicker></DatePicker>
            </div>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"End Time"}></ContestLabel>
              <TimePicker
                generateTimeOptions={generateTimeOptions}
              ></TimePicker>
            </div>
          </div>
          <div className={Style.InputContainer}>
            <ContestLabel title={"About Contest"}></ContestLabel>
            <textarea className={Style.ContestInput}></textarea>
          </div>
          <div className={Style.InputContainer}>
            <ContestLabel title={"Rules"}></ContestLabel>
            <TextEditior></TextEditior>
          </div>
          <div className={Style.InputContainer}>
            <ContestLabel title={"Prizes"}></ContestLabel>
            <TextEditior></TextEditior>
          </div>
          <div className={Style.InputContainer}>
            <ContestLabel title={"Scoring"}></ContestLabel>
            <TextEditior></TextEditior>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContestForm;
