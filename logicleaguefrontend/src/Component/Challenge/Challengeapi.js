import axiosInstance from "../utils/request.js";
//Fet Challenge based on iD
async function FetchChallengeByID(id) {
  const response = await axiosInstance.get(`/challenges/challenge/${id}`);
  return response;
}
const create_challenge = async (ChallengeState) => {
  const response = await axiosInstance.post("challenges/challenge/", {
    ChallengeState,
  });
  return response;
};
const update_challenge = async (ChallengeState, id) => {
  const response = await axiosInstance.put(`challenges/challenge/${id}/`, {
    ChallengeState,
  });
  return response;
};

const fetchTestCase = async (id) => {
  const response = await axiosInstance.get(
    `challenges/challenge/${id}/testCase`
  );
  return response;
};
const uploadTestCase = async (id, testCase) => {
  const response = await axiosInstance.post(
    `challenges/challenge/${id}/testCase/`,
    {
      testCase,
    }
  );
  return response;
};

export {
  FetchChallengeByID,
  create_challenge,
  update_challenge,
  fetchTestCase,
  uploadTestCase,
};
