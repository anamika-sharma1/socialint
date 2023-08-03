import React, { useState, useEffect } from "react";
import img from "../../images/user-icon.png";
import "./Conversation.css";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null); //other user

  useEffect(() => {
    const friendId = conversation.members.find((f) => f !== currentUser?._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/get?userId=` + friendId);
        setUser(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);
  return (
    <div className="conversation">
      <img
        className="img"
        src={user?.profilePicture || img}
        alt="conversation"
      />
      <span>{user?.username}</span>
    </div>
  );
};

export default Conversation;
