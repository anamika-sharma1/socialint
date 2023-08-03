import React from "react";
import "./UpdatePost.css";
import image from "../../images/user-icon.png";
import moment from "moment";
import { useRef, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../base_url";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import { AuthContext } from "../../Auth/AuthContextProvider";
import FileBase from "react-file-base64";
import CancelIcon from "@mui/icons-material/Cancel";

const UpdatePost = ({ post, user }) => {
  // console.log(post, user);
  const { token } = useContext(AuthContext);

  const title = useRef();
  const desc = useRef();
  const [img, setImg] = useState(post?.img);

  const submitPost = async (e) => {
    e.preventDefault();
    let body = {};
    if (title.current.value !== "") {
      body.title = title.current.value;
    }
    if (desc.current.value !== "") {
      body.desc = desc.current.value;
    }
    if (img?.base64) {
      body.img = img?.base64;
    } else if (img) {
      body.img = img;
    } else {
      body.img = "";
    }
    body.img = img?.base64 || img;
    // console.log(body);
    // console.log(body.img);
    // console.log("in");
    // e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/posts/update/${post?._id}`, body, {
        headers: {
          Authorization: token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="updatePost">
      <form className="card" onSubmit={submitPost}>
        <div className="top-card">
          <img
            className="updatePostIcon"
            src={user?.profilePicture || image}
            alt="profile_photo"
          />
          <div className="inputDiv">
            <input
              className="postTitle"
              type="text"
              name="title"
              placeholder={post.title}
              ref={title}
              maxLength="50"
            />
          </div>
          <span className="moment">{moment(post?.createdAt).fromNow()}</span>
        </div>
        <div className="text-area">
          <textarea
            className="Post-description"
            name="desc"
            ref={desc}
            placeholder={post?.desc}
            maxLength="100"
          />
        </div>

        {img && (
          <div className="postImg">
            <img className="postIcon" src={img?.base64 || img} alt="post"></img>
            <span className="cancel">
              <CancelIcon
                onClick={() => {
                  setImg(null);
                }}
              />
            </span>
          </div>
        )}
        <div className="bottom-card">
          <div className="card-t">
            <PhotoLibraryOutlinedIcon /> Photo/Video
          </div>
          <div className="card-b">
            <div className="card-item">
              <FileBase
                type="file"
                multiple={false}
                onDone={(base64) => {
                  // console.log(base64);
                  setImg(base64);
                }}
              />
            </div>
            <div className="card-item">
              <button type="submit" className="btn-card">
                UPDATE POST
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
