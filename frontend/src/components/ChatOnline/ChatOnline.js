import React, { useEffect, useState } from "react";
import "./ChatOnline.css";
import img from "../../images/user-icon.png";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/users/getFriends/` + currentId
        );
        setFriends(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f?._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (friend) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/conversation/find/` + currentId + "/" + friend?._id
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends?.map((friend, index) => {
        return (
          <div
            className="chatOnlineFriend"
            key={index}
            onClick={() => {
              handleClick(friend);
            }}
          >
            <div className="chatOnlineTop">
              <img src={friend?.profilePicture || img} alt="online-friend" />
              <div className="onlineBadge"></div>
            </div>
            <span className="chatOnlineBottom">{friend?.username}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatOnline;
