import React, { PureComponent, useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/request";
function HomePage() {
  const [data, setdata] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const key = user.toUpperCase().includes("NIK");
  const getData = async () => {
    let response = await axiosInstance.get("users/getName/");
    setdata(response.data.msg);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Hello...{user.username}</h1>
      <h2>{key ? "hello Drlng.. I love you " : data}&#10084;</h2>
    </>
  );
}

export default HomePage;
