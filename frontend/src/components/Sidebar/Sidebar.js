import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import image from "../../images/anamika_new.jpeg";
import "./Sidebar.css";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthContextProvider";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../base_url";
import logo from "../../images/socialint-high-resolution-color-logo.png";

const Sidebar = () => {
  const { user, theme } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/users/getFollowers/` + user?._id
        );
        setFollowers(res?.data?.message);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowers();
  }, [user?._id]);

  return (
    <div className={theme === "light" ? "sidebar" : "sidebar dark"}>
      <div className="sidebar-wrapper">
        <img className="socialint-logo" src={logo} alt="logo" />
        <div className="top-of-wrapper">
          <ul className="ulist">
            <Link className="sidebar-link" to="/">
              <li className="item">
                <HomeIcon className="icon" /> Home
              </li>
            </Link>
            <Link className="sidebar-link" to={`/profile/${user?.username}`}>
              <li className="item">
                <PersonIcon className="icon" /> Profile
              </li>
            </Link>
            <Link className="sidebar-link" to="/messenger">
              <li className="item">
                <ChatIcon className="icon" /> Messenger
              </li>
            </Link>
            <Link className="sidebar-link" to="/settings">
              <li className="item">
                <SettingsIcon className="icon" /> Settings
              </li>
            </Link>
            <div
              className="sidebar-link"
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
            >
              <li className="item">
                <LogoutIcon className="icon" /> Sign Out
              </li>
            </div>
          </ul>
        </div>
        <hr />
        <div className="bottom-of-wrapper">
          <span className="Followers">My Followers</span>
          <div className="friends">
            {followers?.length > 0 ? (
              followers.map((friend, index) => {
                return (
                  <Link
                    className="link"
                    key={index}
                    to={"/profile/" + friend?.username}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="sidebar-friend">
                      <img
                        className="img"
                        src={friend?.profilePicture || image}
                        alt="user-friend"
                      />
                      <span>{friend?.username}</span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <span className="sidebar-span">Currently No Followers</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
