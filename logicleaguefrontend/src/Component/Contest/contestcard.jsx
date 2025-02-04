import Style from "./contestcard.module.css"
function ContestCard({contest}) {
    return (
      <div class={Style.card}>
        <div class={Style.contestTitle}>
          <h3 style={{margin:0}}>
            <a href="#">{contest.name}</a>
          </h3>
        </div>
        <div class={Style.contestDate}>
          <p>Registration open {new Date().toLocaleString(contest.start)}</p>
        </div>
        <div class={Style.Register}>
          <button class={Style.Regbtn}>Register</button>
        </div>
      </div>
    );
  }

export default ContestCard