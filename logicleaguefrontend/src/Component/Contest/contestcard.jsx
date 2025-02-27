import Style from "./contestcard.module.css";
function ContestCard({ contest }) {
  return (
    <div class={Style.contestcard}>
      <div className={Style.contestcardImageContainer}>
        <img
          id={Style.contestBgImg}
          src="/contestGreen.jpg"
          alt="contest-background"
        ></img>
      </div>
      <div className={Style.contestTitleContainer}>
        <div>
          <h1 id={Style.contesttitle}>Contest Name</h1>
        </div>
        <div>
          <button id={Style.regBtn}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default ContestCard;
