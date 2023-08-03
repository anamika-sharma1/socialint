import React, { useRef, useState, useContext } from "react";
import "./CreatePost.css";
import FileBase from "react-file-base64";
import { AuthContext } from "../../Auth/AuthContextProvider";
import image from "../../images/user-icon.png";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const CreatePost = () => {
  const { user, token, theme } = useContext(AuthContext);

  const title = useRef();
  const desc = useRef();
  const [img, setImg] = useState("");

  const submitPost = async (e) => {
    // console.log("in");
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/posts/create`,
        {
          userId: user?._id,
          title: title.current.value,
          desc: desc.current.value,
          img: img.base64,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={theme === "light" ? "top-feed" : "top-feed dark"}>
      <form className="card" onSubmit={submitPost}>
        <div className="top-card">
          <img src={user?.profilePicture || image} alt="profile_photo" />
          <input
            className="postTitle"
            type="text"
            name="title"
            placeholder={`What is in your mind, ${user?.username}?`}
            ref={title}
            maxLength="50"
          />
        </div>
        <div className="text-area">
          <textarea
            placeholder="Post Description"
            className="Post-description"
            name="desc"
            ref={desc}
            maxLength="100"
          />
        </div>
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
                  setImg(base64);
                }}
              />
            </div>
            <div className="card-item">
              <button type="submit" className="btn-card">
                Share POST
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
