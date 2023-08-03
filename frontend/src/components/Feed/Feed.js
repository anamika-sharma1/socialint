import Post from "../Post/Post";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Feed.css";
// import { posts } from "../../dummydata";
import { AuthContext } from "../../Auth/AuthContextProvider";
import CreatePost from "../CreatePost/CreatePost";
import { BASE_URL } from "../../base_url";

const Feed = ({ searchUser }) => {
  const [posts, setPosts] = useState([]);
  const { user, theme } = useContext(AuthContext);

  useEffect(() => {
    // console.log(searchUser);
    const fetchPosts = async () => {
      const res = searchUser?.username
        ? await axios.get(
            `${BASE_URL}/posts/getUserPosts/${searchUser?.username}`
          )
        : await axios.get(`${BASE_URL}/posts/getAll/${user?._id}`);
      const helpPosts = res?.data?.message;
      helpPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPosts(helpPosts);
    };
    fetchPosts();
  }, [searchUser, user?._id]);

  return (
    <div className={theme === "light" ? "feed" : "feed dark"}>
      {searchUser?.username ? (
        searchUser?.username === user?.username && <CreatePost />
      ) : (
        <CreatePost />
      )}

      <div className="bottom-feed">
        <div className="posts">
          {posts.map((post, index) => {
            return <Post key={index} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
