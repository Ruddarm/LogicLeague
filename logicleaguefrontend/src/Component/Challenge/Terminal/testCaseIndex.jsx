import Style from "./TerminalContainer.module.css";
// get index of test cases component
function GetIndex({ caseIndex,index, setIndex, result = "None" }) {
  console.log("data  is ", result);
  return (
    <>
      {result === "None" ? (
        <>
          <div
            style={{ backgroundColor: index === caseIndex ? "#f0f0f0" : "" }}
            onClick={() => {
              setIndex(index);
            }}
            className={Style.caseIndex}
          >
            Case {index + 1}
          </div>
        </>
      ) : result ? (
        <>
          <div
            onClick={() => {
              setIndex(index);
            }}
            style={{ backgroundColor: index === caseIndex ? "#f0f0f0" : "" }}
            className={Style.caseIndex}
          >
            <img className={Style.resultLogo} src="/mark.png" alt="pass"></img>
            Case {index + 1}
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => {
              setIndex(index);
            }}
            style={{ backgroundColor: index === caseIndex ? "#f0f0f0" : "" }}
            className={Style.caseIndex}
          >
            <img
              className={Style.resultLogo}
              style={{ width: "1rem" , height: "1rem" }}
              src="/wrong.png"
              alt="fail
            "
            ></img>
            Case {index + 1}
          </div>
        </>
      )}
    </>
  );
}
export default GetIndex;
