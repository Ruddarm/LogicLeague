import Style from "./contestcard.module.css";
function ContestCard({ contest, onClick }) {
  return (
    <div className={Style.contestcard}>
      <div className={Style.contestcardImageContainer}>
        <img
          id={Style.contestBgImg}
          src="/contestGreen.jpg"
          alt="contest-background"
        ></img>
      </div>
      <div className={Style.contestTitleContainer}>
        <div>
          <h1 id={Style.contesttitle}>{contest.name}</h1>
        </div>
        <div>
          <button
            onClick={() => {
              onClick(contest.id);
            }}
            id={Style.regBtn}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContestCard;
