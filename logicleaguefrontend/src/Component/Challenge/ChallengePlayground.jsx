import React from 'react'
import Style from './ChallengePlayground.module.css'
import CodeEditor from '../CodeEditior/Code'
import ChallengeDesc from './ChallengeDescripiton'
export default ()=>{
    return(
        <>
            <div className={Style.PlaygroundContainer}>
                <div className={Style.ChallengeDescBox}>
                    <ChallengeDesc></ChallengeDesc>
                </div>
                <div className={Style.CodeContainer}>
                    <div className={Style.CodeEditor}>
                        <CodeEditor></CodeEditor>
                    </div>
                    <div className={Style.TestCaseContainer}>
                       
                    </div>
                </div>
            </div>
        </>
    )
}