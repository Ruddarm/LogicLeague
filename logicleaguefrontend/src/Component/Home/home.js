import React, { PureComponent, useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [data, setdata] = useState("");
  const token = localStorage.getItem("jwttoken"); 
  console.log(token)
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
      <p>{data}</p>
    </>
  );
}

export default HomePage;
