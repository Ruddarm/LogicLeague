import { fetchContestByID, fetchContestChallenges } from "../api/contestapi";
import { useState, useEffect } from "react";
import ContestChallenge from "../Create/ContestChallenge";
function useContestLanding(contestId){
    const [contest, setContest] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getContest= async(contestId)=>{
        try{
            let Response = await fetchContestByID(contestId)
            setContest(Response.data)
        }catch(err){
            setError(err.error)
            console.log(err);
        }
    }
    const   getContestChallenges = async (contestId)=>{
        try{
            let response = await  fetchContestChallenges(contestId);
            setChallenges(response.data)
        }catch(err){
            setError(err.error);
        
        }
    }
    useEffect(() => {
        if (contestId) {
            getContest(contestId);
            getContestChallenges(contestId);
            // fetchChallenges();
            // fetchLeaderboard();
        }
    }, [contestId]);
    return{
        contest,
        challenges
    }

}

function useEditContest(contestId){
    const [contest, setContest] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getContest= async(contestId)=>{
        try{
            let Response = await fetchContestByID(contestId)
            setContest(Response.data)
        }catch(err){
            setError(err.error)
            console.log(err);
        }
    }
    useEffect(() => {
        if (contestId) {
            getContest(contestId);
            // getContestChallenges(contestId);
            // fetchChallenges();
            // fetchLeaderboard();
        }
    }, [contestId]);
    return (
        {
            contest
        }
    )
}


export  {useContestLanding,useEditContest};