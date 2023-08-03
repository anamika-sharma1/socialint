import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import FileBase from "react-file-base64";
import "./Settings.css";
import { BASE_URL } from "../../base_url";
import logo from "../../images/socialint-high-resolution-color-logo.png";
import { AuthContext } from "../../Auth/AuthContextProvider";

const Settings = () => {
  const { user, token, dispatch } = useContext(AuthContext);
  const description = useRef();
  const from = useRef();
  const city = useRef();
  const [rel, setRel] = useState(0);
  const [coverPicture, setCoverPicture] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    let obj = {};
    if (coverPicture !== "") {
      obj.coverPicture = coverPicture;
    }
    if (profilePicture !== "") {
      obj.profilePicture = profilePicture;
    }
    if (description.current.value !== "") {
      obj.desc = description.current.value;
    }
    if (from.current.value !== "") {
      obj.from = from.current.value;
    }
    if (city.current.value !== "") {
      obj.city = city.current.value;
    }
    if (rel !== 0) {
      obj.relationship = rel;
    }
    obj.username = user?.username;
    // console.log(obj);
    try {
      await axios.put(`${BASE_URL}/users/update`, obj, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({ type: "UPDATE", payload: obj });
      window.location.href = "/";
      //   console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/users/delete`,
        {
          username: user?.username,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(res);
      sessionStorage.clear();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup">
      <div className="signup-wrapper">
        <div className="signup-header">
          <img className="signup-logo" src={logo} alt="logo" />
          <h1>SocialLint</h1>
          <span>A fast and reliable social-media app!</span>
        </div>
        <div className="signup-box">
          <form className="signup-box-wrapper" onSubmit={handleForm}>
            <input
              className="input"
              type="text"
              placeholder="description"
              ref={description}
            />
            <input
              className="input"
              type="text"
              placeholder="city"
              ref={city}
            />
            <input
              className="input"
              type="text"
              placeholder="from"
              ref={from}
            />
            <div className="relationship">
              <label htmlFor="relationship">Relationship Status:</label>
              <div className="items">
                <div className="item-1">
                  <label htmlFor="Single">Single</label>
                  <input
                    type="radio"
                    value="1"
                    name="relationship"
                    onChange={(e) => {
                      setRel(1);
                    }}
                  />
                </div>
                <div className="item-1">
                  <label htmlFor="Married">Married</label>
                  <input
                    type="radio"
                    value="2"
                    name="relationship"
                    onChange={(e) => {
                      setRel(2);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="profilePicture">
              <span>Profile Picture</span>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  //   console.log(base64);
                  setProfilePicture(base64);
                }}
              />
            </div>
            <div className="coverPicture">
              <span>Cover Picture</span>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setCoverPicture(base64);
                }}
              />
            </div>

            <button type="submit" className="signup-btn">
              Update Profile
            </button>
            <hr className="hr" />
            <button className="deleteProfile" onClick={deleteProfile}>
              Delete Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
