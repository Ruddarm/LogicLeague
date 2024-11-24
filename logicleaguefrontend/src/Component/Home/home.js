import React, { PureComponent, useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/request";
function HomePage() {
  const [data, setdata] = useState("");
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  const getData = async () => {
    let response = await axiosInstance.get("users/getName/");
    setdata(response.data.msg)
  };
  useEffect(()=>{
  getData();
  },[])

  return (
    <>
      <h1>{user.username}</h1>
      <p>{data}</p>
    </>
  );
}

export default HomePage;
