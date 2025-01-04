import React, { useContext } from "react";
import Style from "./DescHead.module.css";
import { ResizeContext } from "../ResizeContext.jsx";
function DescHead() {
  const { maxContext } = useContext(ResizeContext);
  const maxDiscription = () => {
    maxContext.setMax((prev) => ({
      ...prev,
      desc: !maxContext.max.desc,
    }));
  };
  return (
    <>
      <div className={Style.Container}>
        <div>
          <button className={Style.maxiBtn}>
            <img src="/document.png"></img>
            <span>Discripiton</span>
          </button>
        </div>
        <div>
          <button className={Style.maxiBtn}
            onClick={maxDiscription}
          >

            <img src={"/maximize.png"}></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default DescHead;
