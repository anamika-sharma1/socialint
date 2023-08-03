import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Messenger.css";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import { AuthContext } from "../../Auth/AuthContextProvider";
import axios from "axios";
import { io } from "socket.io-client";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import { BASE_URL } from "../../base_url";

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  // socket.current = io("ws://localhost:8800");

  useEffect(() => {
    socket.current = io("ws://social-media-socket-fz01.onrender.com");
    socket?.current?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", user?._id);
    socket?.current?.on("getUsers", (users) => {
      let x = users.map((u) => {
        return u?.userId;
      });
      setOnlineUsers(x);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/conversation/` + user?._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/message/` + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
      (friend) => friend !== user?._id
    );

    socket?.current?.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      await axios.post(`${BASE_URL}/message`, message);

      setMessages([...messages, message]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="wrapper">
            <input
              type="text"
              className="friend"
              placeholder="Search Friends..."
            />
            {conversations?.map((c, index) => {
              return (
                <div key={index} onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="wrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m, index) => {
                    return (
                      <div ref={scrollRef}>
                        <Message
                          key={index}
                          message={m}
                          own={m?.sender === user?._id}
                          sender={m?.sender}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Type Message..."
                    className="chatInput"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                    value={newMessage}
                  />
                  <button className="chatSubmit" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="messageDefault">
                Open any Conversation to start Chat!
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="wrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
