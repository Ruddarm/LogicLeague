import React from "react";
import Style from "./ContestForm.module.css";
import ContestDateTimePicker from "./DateTime";
import TextEditior from "../../Challenge/CreateChallenge/TextEditor";

function ContestLabel({ title }) {
  return <label className={Style.ContestLabel}>{title}</label>;
}
function DatePicker({ value }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <input
        type="date"
        className={Style.ContestInput}
        value={value}
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

function TimePicker({ value, setValue, generateTimeOptions }) {
  console.log('vali s' ,value)
  return (
    <>
      <select
        className={Style.ContestInput}
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
// contest input
function ContestInput({ placeholder }) {
  return (
    <>
      <input placeholder={placeholder} className={Style.ContestInput}></input>
    </>
  );
}
function ContestForm({ contest }) {
  console.log(contest.start_time);
  const startDateTime = new Date(contest.start_time);
  const startDate = startDateTime.toISOString().split("T")[0]; // "2024-04-01"
  const startTime = startDateTime.toISOString().split("T")[1].split("Z")[0];
  //
  const generateTimeOptions = () => {
    let times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 15) {
        let time = `${hour.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}`;
        times.push(time+':00');
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
            <input value={contest.name} className={Style.ContestInput}></input>
          </div>
          <div className={Style.DateTimeInputContainer}>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"Start Date"}></ContestLabel>
              <DatePicker  value={startDate} ></DatePicker>
            </div>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"Start Time"}></ContestLabel>
              <TimePicker
                value={startTime}
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

export { ContestLabel, ContestInput };
