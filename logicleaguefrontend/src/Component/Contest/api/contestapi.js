import axiosInstance from "../../utils/request";


async function  CreateContest(contestName){
    const response = await axiosInstance.post("/contests/");
    return response
}

async function fetchContestByID(id){
    const response = await axiosInstance.get("/contests/"+id);
    return response;
}
async function fetchContestChallenges(id) {
    return   await axiosInstance.get(`/contests/${id}/challenges`)

}


export  {fetchContestByID,fetchContestChallenges}