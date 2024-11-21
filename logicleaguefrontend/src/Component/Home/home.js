import React, { PureComponent, useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [data, setdata] = useState("");
  const token = localStorage.getItem("jwttoken"); 
  console.log(token)
  const getData = async () => {
    data = await axios.get("http://127.0.0.1:8000/users/getName/", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token
      },
    });
    console.log(data);
  };
  // useEffect(getData,[])
  getData();

  return (
    <>
      <p>Welocome to home page bc</p>
    </>
  );
}

export default HomePage;
