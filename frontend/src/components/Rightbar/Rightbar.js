import React, { useContext, useEffect, useState } from "react";
import "./Rightbar.css";
import ad1 from "../../images/ad1.png";
import ad2 from "../../images/ad2.png";
import axios from "axios";
import image from "../../images/user-icon.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContextProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { BASE_URL } from "../../base_url";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [currentUserfriends, setCurrentUserFriends] = useState([]);
  const { user: currentUser, dispatch, theme } = useContext(AuthContext);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    setFollow(currentUser?.following?.includes(user?._id));
  }, [user, currentUser]);

  //in this useeffect initially no dependencies were there
  useEffect(() => {
    if (!user) {
      const getFriends = async () => {
        try {
          const res = await axios.get(
            `${BASE_URL}/users/getFriends/` + currentUser?._id
          );
          setCurrentUserFriends(res?.data?.message);
        } catch (error) {
          console.log(error);
        }
      };
      getFriends();
    }
  }, [currentUser?._id, user]);

  useEffect(() => {
    if (user) {
      const getFriends = async () => {
        try {
          const res = await axios.get(
            `${BASE_URL}/users/getFriends/` + user?._id
          );
          setFriends(res?.data?.message);
        } catch (error) {
          console.log(error);
        }
      };
      getFriends();
    }
  }, [user]);

  const followUser = async () => {
    console.log("hello", currentUser);
    try {
      if (follow) {
        await axios.put(`${BASE_URL}/users/unfollow/` + user?._id, {
          userId: currentUser?._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user?._id });
      } else {
        await axios.put(`${BASE_URL}/users/follow/` + user?._id, {
          userId: currentUser?._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
      setFollow(!follow);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightBar = () => {
    return (
      <div
        className={
          theme === "light" ? "rightbar-default" : "rightbar-default dark"
        }
      >
        <div className="adds">
          <div className="img">
            <img src={ad1} alt="add" />
          </div>
          <div className="img">
            <img src={ad2} alt="add" />
          </div>
        </div>
        <hr className="hr-rb" />
        <span className="Following">My Following</span>
        <div className="home-friends">
          {currentUserfriends?.length > 0
            ? currentUserfriends.map((friend, index) => {
                return (
                  <Link
                    className="home-link"
                    key={index}
                    to={"/profile/" + friend?.username}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="home-friend">
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
            : "Currently No Following"}
        </div>
      </div>
    );
  };

  const ProfileRightBar = () => {
    return (
      <div className={theme === "light" ? "rightbar" : "rightbar dark"}>
        {user?.username !== currentUser?.username && (
          <button
            className="right-follow-user"
            onClick={followUser}
            style={
              follow ? { backgroundColor: "red" } : { backgroundColor: "blue" }
            }
          >
            {follow ? "Unfollow" : "Follow"}
            {follow ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h2 className="user-information">User Information</h2>
        <div className="item-desc">City: {user?.city}</div>
        <div className="item-desc">From: {user?.from}</div>
        <div className="item-desc">
          Relationship: {user?.relationship === 1 ? "Single" : "Married"}
        </div>
        <div className="item-desc">Followers: {user?.followers?.length}</div>
        <div className="item-desc">Following: {user?.following?.length}</div>
        <h2 className="user-friends">User Friends</h2>
        <div className="friendList">
          {friends?.length > 0
            ? friends.map((friend, index) => {
                return (
                  <Link
                    key={index}
                    to={"/profile/" + friend?.username}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="profile-friend">
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
            : "Currently No Friends"}
        </div>
      </div>
    );
  };

  return <>{user ? <ProfileRightBar /> : <HomeRightBar />}</>;
};

export default Rightbar;
