import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./Profile.css";
import image from "../../images/user-icon.png";
import bg_image from "../../images/user-background.png";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const Profile = () => {
  const [user, setUser] = useState(null);
  const username = useParams().username;

  useEffect(() => {
    const getUser = async () => {
      // console.log("ooooppopo");
      let res;
      try {
        res = await axios.get(`${BASE_URL}/users/get?username=${username}`);
        // console.log(res);
        // if (res.data.message !== "User not found") {
        setUser(res.data.message);
        // } else {
        //   window.location.href = "/User Not Found";
        // }
      } catch (error) {
        window.location.href = `/${error.response.data.message}`;
        // console.log(error.response.data.message);
      }
    };
    getUser();
  }, [username]);

  return (
    <div className="home">
      <div className="top">
        <Navbar />
      </div>
      <div className="bottom">
        <div className="profile-left">
          <Sidebar />
        </div>
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="userPics">
              <img
                className="cover"
                src={user?.coverPicture || bg_image}
                alt="cover"
              />
              <img
                className="profile"
                src={user?.profilePicture || image}
                alt="Profile"
              />
            </div>
            <div className="userInfo">
              <span className="userTitle">Username : {user?.username}</span>
              <span className="userDesc">Description : {user?.desc}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed searchUser={user} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
