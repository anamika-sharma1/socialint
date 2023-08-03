import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import image from "../../images/user-icon.png";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContextProvider";
import { BASE_URL } from "../../base_url";
import ManagePost from "../ManagePost/ManagePost";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [handlePost, setHandlePost] = useState(false);
  const { user: currentUser, theme, token } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post?.likes?.includes(currentUser?._id));
  }, [currentUser?._id, post?.likes]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `${BASE_URL}/users/get?userId=${post?.userId}`
      );
      setUser(res.data.message);
    };
    getUser();
  }, [post?.userId]);

  const likeHandler = async () => {
    try {
      await axios.put(
        `${BASE_URL}/posts/like-dislike/${post?._id}`,
        {
          userId: currentUser?._id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className={theme === "light" ? "post" : "post dark"}>
      <div className="post-top">
        <div className="post-details-top">
          <div className="post-details-top-left">
            <Link to={`/profile/${user?.username}`}>
              <img src={user?.profilePicture || image} alt="profile_photo" />
            </Link>
            <span className="username">{user?.username}</span>
            <span className="time">{moment(post?.createdAt).fromNow()}</span>
          </div>
          {user?._id === currentUser?._id && (
            <div className="post-details-top-right">
              <MoreVertIcon
                onClick={() => {
                  setHandlePost(!handlePost);
                }}
                style={{ cursor: "pointer" }}
              />
              {handlePost && <ManagePost post={post} user={user} />}
            </div>
          )}
        </div>
        <hr className="post-hr" />
        <div className="post-details-bottom">
          <div className="post-details-title">
            <b>Title: </b>
            {post?.title}
          </div>
          <div className="post-details-desc">
            <b>Description: </b>
            {post?.desc}
          </div>
        </div>
      </div>
      {post?.img ? (
        <div className="post-center">
          <img className="img" src={post?.img} alt="post" />
        </div>
      ) : (
        <></>
      )}

      <div className="post-bottom">
        <div className="post-bottom-left">
          <FavoriteBorderOutlinedIcon
            className="postIcon"
            onClick={likeHandler}
          />
          {likes} likes
        </div>
      </div>
    </div>
  );
};

export default Post;
