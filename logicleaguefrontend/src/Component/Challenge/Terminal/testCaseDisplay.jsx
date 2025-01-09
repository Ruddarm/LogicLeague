import Style from "./TerminalContainer.module.css";
function TestCase({ variable, value }) {
  return (
    <>
      <div className={Style.Case}>
        <span>{variable}</span>
        <div style={{height:"auto"}}><pre style={{margin:0}}>{value}</pre></div>
      </div>
    </>
  );
}
export default TestCase;