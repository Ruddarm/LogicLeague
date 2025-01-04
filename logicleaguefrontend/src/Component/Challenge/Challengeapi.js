import axiosInstance from "../utils/request.js";
//Fecth all challenge from backend
async function FetchChallenges() {
  const response = await axiosInstance.get(`/challenges/challenge/`);
  return response;
}
//fecth challenge based on challenge id
async function FetchChallengeByID(id) {
  const response = await axiosInstance.get(`/challenges/challenge/${id}`);
  return response;
}
//create a new challenge
const create_challenge = async (ChallengeState) => {
  const response = await axiosInstance.post("challenges/challenge/", {
    ChallengeState,
  });
  return response;
};
// updatae challenge
const update_challenge = async (ChallengeState, id) => {
  const response = await axiosInstance.put(`challenges/challenge/${id}/`, {
    ChallengeState,
  });
  return response;
};

// fetch testcase as view [testId,marks,sample]
const fetchTestCases = async (challengeId, userview = false , desc=false) => {
  if (userview) {
    const response = await axiosInstance.get(
      `challenges/challenge/${challengeId}/testCase/`
    );
    return response;
  }
  if(desc){
    const response = await axiosInstance.get(`challenges/challenge/${challengeId}/testCase/desc`)
    return response;
  }
  const response = await axiosInstance.get(
    `/challenges/challenge/admin/${challengeId}/testCase/`
  );
  return response;
};
// fetch a particular task to edit if edit = true or a deils view of testcases
const fetchTestCase = async (challengeId, testCaseId, edit = true) => {
  if (edit) {
    const response = await axiosInstance.get(
      `/challenges/challenge/admin/${challengeId}/1/testCase/${testCaseId}/`
    );
    return response;
  }
  // const response = await axiosInstance.get(
  //   `challenges/challenge/${challengeId}/testCase/${testCaseId}`
  // );

  // return response;
};

//upload a new testcase
const uploadTestCase = async (challegneID, testCase) => {
  const response = await axiosInstance.post(
    `challenges/challenge/admin/${challegneID}/testCase/`,
    {
      testCase,
    }
  );
  return response;
};

const deleteTestCase = async (challegneID,testCaseId)=>{
  const response = await axiosInstance.delete(`challenges/challenge/admin/${challegneID}/testCase/${testCaseId}/`)
  return response
}

export {
  FetchChallengeByID,
  create_challenge,
  update_challenge,
  fetchTestCase,
  uploadTestCase,
  FetchChallenges,
  fetchTestCases,
  deleteTestCase
};
