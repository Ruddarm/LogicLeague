import React, { PureComponent, useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [data, setdata] = useState("");
  const token = localStorage.getItem("jwttoken"); 
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  const getData = async () => {
    let response = await axios.get("http://127.0.0.1:8000/users/getName/", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token
      },
    });
    console.log(response.data)
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
