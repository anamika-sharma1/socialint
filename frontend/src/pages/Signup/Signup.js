import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import FileBase from "react-file-base64";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../base_url";
import logo from "../../images/socialint-high-resolution-color-logo.png";
import { useParams } from "react-router-dom";

const Signup = () => {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const confirmPassword = useRef();
  const description = useRef();
  const from = useRef();
  const city = useRef();
  const [rel, setRel] = useState(0);
  const [coverPicture, setCoverPicture] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();
  const params = useParams().return;

  useEffect(() => {
    if (params) {
      alert(`${params}`);
      window.location.href = "/signup";
    }
  }, [params]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (password.current.value === confirmPassword.current.value) {
      try {
        await axios.post(`${BASE_URL}/auth/register`, {
          email: email.current.value,
          password: password.current.value,
          username: username.current.value,
          coverPicture: coverPicture,
          profilePicture: profilePicture,
          desc: description.current.value,
          city: city.current.value,
          from: from.current.value,
          relationship: rel,
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      confirmPassword.current.setCustomValidity("Passwords don't match");
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
              type="email"
              ref={email}
              placeholder="Email"
              required
            />
            <input
              className="input"
              type="text"
              placeholder="username"
              required
              ref={username}
            />
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
            <input
              className="input"
              type="password"
              placeholder="password"
              required
              minLength="6"
              ref={password}
            />
            <input
              className="input"
              type="password"
              placeholder="Confirm password"
              required
              minLength="6"
              ref={confirmPassword}
            />
            <div className="profilePicture">
              <span>Profile Picture</span>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
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

            <button type="submit" className="signup-btn-final">
              Sign Up
            </button>
            <Link to="/login" className="login-btn">
              <button>Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
