import React, { useEffect, useState } from "react";
import "./Message.css";
import img from "../../images/user-icon.png";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const Message = ({ message, own, sender }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/get?userId=` + sender);
        setUser(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [sender]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={user?.profilePicture || img} alt="message" />
        <span className="messageText">{message?.text}</span>
      </div>
      <div className="messageBottom">
        <span>{moment(message?.createdAt).fromNow()}</span>
      </div>
    </div>
  );
};

export default Message;
