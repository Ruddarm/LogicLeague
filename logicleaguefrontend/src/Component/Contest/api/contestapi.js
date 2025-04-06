import axiosInstance from "../../utils/request";

async function createContest(contest) {
  console.log(contest);
  const response = await axiosInstance.post("/contests/", contest);
  return response;
}

async function fetchContestByID(id) {
  const response = await axiosInstance.get("/contests/" + id);
  return response;
}
async function fetchContestChallenges(id) {
  return await axiosInstance.get(`/contests/${id}/challenges`);
}
async function addContestChallenges(id, challenge) {
  return await axiosInstance.post(`/contests/${id}/challenges/`, challenge);
}

async function updateContestById(contestId, contest) {
  console.log("uudid", contestId);
  return await axiosInstance.put(`/contests/edit/${contestId}/`, contest);
}

async function fetchContestList() {
  return await axiosInstance.get("/contests/list");
}
async function isRegisteredContest(id) {
  return await axiosInstance.get(`/contests/${id}/register`);
}
async function registerContest(id) {
  return await axiosInstance.post(`/contests/${id}/register/`);
}
async function unregisterContest(id) {
  return await axiosInstance.delete(`/contests/${id}/register/`);
}

export {
  fetchContestByID,
  fetchContestChallenges,
  updateContestById,
  addContestChallenges,
  fetchContestList,
  createContest,
  isRegisteredContest,
  registerContest,
  unregisterContest,
};
