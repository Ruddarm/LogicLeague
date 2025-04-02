import React, { useState } from "react";
import Style from "./ContestForm.module.css";
import ContestDateTimePicker from "./DateTime";
import TextEditior from "../../Challenge/CreateChallenge/TextEditor";
import { useEffect } from "react";
import { useContestEdit } from "../Hooks/ContestLandingHooks";

function ContestLabel({ title }) {
  return <label className={Style.ContestLabel}>{title}</label>;
}
function DatePicker({ onchange,value }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <input
        type="date"
        className={Style.ContestInput}
        value={value}
        onChange={(e) => {
            onchange(e.target.value);
        }}
        min={today} // Prevent past dates
      />
    </>
  );
}

function TimePicker({ value, setTime,  generateTimeOptions, name }) {
  // confirm()
  return (
    <>
      <select
        className={Style.ContestInput}
        value={value}
        name={name}
        onChange={(e) => setTime(e.target.value)}
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
function ContestForm() {
  const { contest, handleContestChange  } = useContestEdit();
  console.log(contest);
  const startDateTime = new Date(contest.start_time);
  const endDateTime = new Date(contest.end_time);
  const [startDate, setStartDate] = useState(
    startDateTime.toISOString().split("T")[0]
  ); // "2024-04-01"
  const [startTime, setStartTime] = useState(
    startDateTime.toISOString().split("T")[1].split("Z")[0].substring(0, 5)
  );
  const [endDate, setEndDate] = useState(
    endDateTime.toISOString().split("T")[0]
  );
  const [endTime, setEndTime] = useState(
    endDateTime.toISOString().split("T")[1].split("Z")[0].substring(0, 5)
  );
  useEffect(() => {
    handleContestChange("start_time", `${startDate}T${startTime}:00Z`);
  }, [startDate, startTime]);
  useEffect(() => {
    handleContestChange("end_time", `${startDate}T${startTime}:00Z`);
  }, [endDate, endTime]);

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
            <input
              name="name"
              onChange={(e) => {
                handleContestChange(e.target.name, e.target.value);
              }}
              value={contest.name}
              className={Style.ContestInput}
            ></input>
          </div>
          <div className={Style.DateTimeInputContainer}>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"Start Date"}></ContestLabel>
              <DatePicker onchange={setStartDate}  value={startDate}></DatePicker>
            </div>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"Start Time"}></ContestLabel>
              <TimePicker
                value={startTime}
                setTime={setStartTime}
                name={"startTime"}
                generateTimeOptions={generateTimeOptions}
              ></TimePicker>
            </div>
          </div>
          <div className={Style.DateTimeInputContainer}>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"End Date"}></ContestLabel>
              <DatePicker onchange={setEndDate} value={endDate}></DatePicker>
            </div>
            <div className={Style.InputContainer2}>
              <ContestLabel title={"End Time"}></ContestLabel>
              <TimePicker
                name={"end_time"}
                setTime={setEndTime}
                value={endTime}
                generateTimeOptions={generateTimeOptions}
              ></TimePicker>
            </div>
          </div>
          <div className={Style.InputContainer}>
            <ContestLabel title={"About Contest"}></ContestLabel>
            <textarea
              name="description"
              onChange={(e) => {
                handleContestChange(e.target.name, e.target.value);
              }}
              value={contest.description}
              className={Style.ContestInput}
            ></textarea>
          </div>
          <div className={Style.InputContainer}>
            <ContestLabel title={"Rules"}></ContestLabel>
            <TextEditior
              setData={(data) => {
                handleContestChange("rules", data);
              }}
              prevData={""}
            ></TextEditior>
          </div>
          <div className={Style.InputContainer}>
            <ContestLabel title={"Prizes"}></ContestLabel>
            <TextEditior
              setData={(data) => {
                handleContestChange("prizes", data);
              }}
              prevData={""}
            ></TextEditior>
          </div>
          <div className={Style.InputContainer}>
            <ContestLabel title={"Scoring"}></ContestLabel>
            <TextEditior
              setData={(data) => {
                handleContestChange("scoring", data);
              }}
              prevData=""
            ></TextEditior>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContestForm;

export { ContestLabel, ContestInput };
