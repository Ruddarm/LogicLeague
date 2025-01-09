import Style from "./TerminalContainer.module.css";
// get index of test cases component
function GetIndex({ index, setIndex }) {
  return (
    <div
      onClick={() => {
        setIndex(index);
      }}
      className={Style.caseIndex}
    >
      Case {index + 1}
    </div>
  );
}
export default GetIndex;