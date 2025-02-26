import React from "react";
import Style from "./CodeNavBar.module.css";
function CodeNavBar({ language, updateLanguage, runCode, submitCode }) {
  const setofLang = ["java", "javascript", "python"];
  const handleChange = (e) => {
    console.log("called");
    updateLanguage(e.target.value);
  };

  return (
    <>
      <div className={Style.NavContainer}>
        <select
          className={Style.select}
          value={language}
          onChange={handleChange}
        >
          {setofLang.map((lang, index) => (
            <option key={index} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
        <div className={Style.OptionContainer}>
          <button id={Style.submitBtn}
            onClick={submitCode}
          >Submit</button>
          <button onClick={runCode}>
            <img src="/play-button.png" alt="run"></img>
            <span>Run</span>
          </button>
        </div>
      </div>
    </>
  );
}
export default CodeNavBar;
