import React from 'react'
import Style from "./CodeBar.module.css"
function CodeBar(){
    return(
        <>
            <div className={Style.CodeBarContainer}>
                <div>
                    code
                </div>
                <div>
                    Run
                </div>
                <div>
                    min-max
                </div>
            </div>
        </>
    )
}
export default CodeBar;