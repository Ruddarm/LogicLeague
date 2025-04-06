import {
  addContestChallenges,
  fetchContestByID,
  fetchContestChallenges,
  isRegisteredContest,
  registerContest,
  unregisterContest,
  updateContestById,
} from "../api/contestapi";
import { useState, useContext, createContext, useEffect } from "react";
import ContestChallenge from "../Create/ContestChallenge";
function useContestLanding(contestId) {
  const [contest, setContest] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // fetch conest by id
  const getContest = async (contestId) => {
    try {
      let Response = await fetchContestByID(contestId);
      setContest(Response.data);
      
    } catch (err) {
      setError(err.error);
      console.log(err);
    }
  };
  // fetch contest challenges by id
  const getContestChallenges = async (contestId) => {
    try {
      let response = await fetchContestChallenges(contestId);
      setChallenges(response.data);
    } catch (err) {
      setError(err.error);
    }
  };
  // register for contest
  const regUser = async () => {
    try {
      let response = await registerContest(contestId);
      console.log(response);
      setIsRegistered(true);
    } catch (err) {
      setError(err.error);
    }
  };
  // unregister for contest
  const unregUser = async () => {
    try {
      let response = await unregisterContest(contestId);
      setIsRegistered(false);
    } catch (err) {
      setError(err.error);
    }
  };
  // isRegistered for contest
  const isReg = async () => {
    try {
      let response = await isRegisteredContest(contestId);
      console.log(response);
      setIsRegistered(response.data.registered);
    } catch (err) {
      setError(err.error);
    }
  };
  // fetch contest by id and challenges
  const fetchFirst = async (contestId) => {
    setLoading(true);
    await getContest(contestId);
    await getContestChallenges(contestId);
    await isReg();
    setLoading(false);
  };

  useEffect(() => {
    if (contestId) {
      fetchFirst(contestId);
    }
  }, [contestId]);
  return {
    contest,
    challenges,
    regUser,
    unregUser,
    isRegistered,
    loading,
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
  const [optionTab, setOptionTab] = useState({
    basic: true,
    challengeTab: false,
    registrationTab: false,
    settingTab: false,
  });

  const handelOption = (key, value) => {
    setOptionTab((preData) => ({
      basic: false,
      challengeTab: false,
      registrationTab: false,
      settingTab: false,
      [key]: true,
    }));
  };

  const addChallenge = async (challenge) => {
    try {
      const response = await addContestChallenges(contestId, challenge);
      setLoading(true);
      await getChallenges(contestId);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };
  //   const [contestId,setContestId] = useState(null);

  // ✅ API Call Function
  const getContest = async (contestId) => {
    try {
      let response = await fetchContestByID(contestId);
      setContest(response.data);
    } catch (err) {
      setError(err.error);
      console.log(err);
    }
  };
  const getChallenges = async (contestId) => {
    try {
      let response = await fetchContestChallenges(contestId);
      setChallenges(response.data);
    } catch (err) {}
  };
  useEffect(() => {
    return async () => {
      await getContest(contestId);
      await getChallenges(contestId);
      setLoading(false);
    };
  }, [contestId]);

  // ✅ Form ke data ko change karne ka function
  const handleContestChange = (eventName, value) => {
    setContest((prevData) => ({ ...prevData, [eventName]: value }));
  };
  const handelDate = (eventName, value) => {};
  const handelUpdate = async () => {
    try {
      setLoading(true);
      const Response = await updateContestById(contestId, contest);
      getContest(contestId);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ContestEditContext.Provider
      value={{
        contest,
        getContest,
        handleContestChange,
        loading,
        handelUpdate,
        setOptionTab,
        optionTab,
        addChallenge,
        handelOption,
        challenges,
      }}
    >
      {children}
    </ContestEditContext.Provider>
  );
};

// ✅ Custom Hook for Easy Access
const useContestEdit = () => useContext(ContestEditContext);

export { useContestLanding, useContestEdit, ContestEditProvider };
