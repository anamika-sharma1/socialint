import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Home.css";
import { AuthContext } from "../../Auth/AuthContextProvider";
import { useParams } from "react-router-dom";

const Home = () => {
  const { theme } = useContext(AuthContext);
  const params = useParams().return;

  useEffect(() => {
    // console.log("in");
    if (params !== undefined) {
      alert(`${params}`);
      window.location.href = "/";
    }
  }, [params]);
  // console.log(params);
  // const { user, dispatch } = useContext(AuthContext);
  // if (!user) {
  //   dispatch({
  //     type: "LOGIN_PROCESS",
  //     payload: JSON.parse(localStorage.getItem("user")),
  //   });
  // }

  //console.log("user", user);

  return (
    <div className={theme === "light" ? "home" : "home dark"}>
      <div className="top">
        <Navbar />
      </div>
      <div className="bottom">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
