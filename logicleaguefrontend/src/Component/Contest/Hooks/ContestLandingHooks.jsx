import { fetchContestByID, fetchContestChallenges, updateContestById } from "../api/contestapi";
import { useState, useContext, createContext, useEffect } from "react";
import ContestChallenge from "../Create/ContestChallenge";
function useContestLanding(contestId) {
  const [contest, setContest] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getContest = async (contestId) => {
    try {
      let Response = await fetchContestByID(contestId);
      setContest(Response.data);
    } catch (err) {
      setError(err.error);
      console.log(err);
    }
  };
  const getContestChallenges = async (contestId) => {
    try {
      let response = await fetchContestChallenges(contestId);
      setChallenges(response.data);
    } catch (err) {
      setError(err.error);
    }
  };
  useEffect(() => {
    if (contestId) {
      getContest(contestId);
      getContestChallenges(contestId);
      // fetchChallenges();
      // fetchLeaderboard();
    }
  }, [contestId]);
  return {
    contest,
    challenges,
  };
}

const ContestEditContext = createContext();

// ✅ Provider Component
const ContestEditProvider = ({ children, contestId }) => {
  const [contest, setContest] = useState();
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   const [contestId,setContestId] = useState(null);

  // ✅ API Call Function
  const getContest = async (contestId) => {
    try {
      let response = await fetchContestByID(contestId);
      setContest(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.error);
      console.log(err);
    }
  };
  useEffect(() => {
    getContest(contestId);
  }, [contestId]);

  // ✅ Form ke data ko change karne ka function
  const handleContestChange = (eventName, value) => {
    setContest((prevData) => ({ ...prevData, [eventName]: value }));
  };
  const handelDate = (eventName, value) => {};
  const handelUpdate =  async () => {
    try {
      setLoading(true)
      const Response = await updateContestById(contestId,contest)
      getContest(contestId);
    } catch (err) {
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <ContestEditContext.Provider
      value={{ contest, getContest, handleContestChange, loading , handelUpdate}}
    >
      {children}
    </ContestEditContext.Provider>
  );
};

// ✅ Custom Hook for Easy Access
const useContestEdit = () => useContext(ContestEditContext);

export { useContestLanding, useContestEdit, ContestEditProvider };
