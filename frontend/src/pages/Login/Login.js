import React, { useContext, useRef } from "react";
import "./Login.css";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthContextProvider";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL } from "../../base_url";
import logo from "../../images/socialint-high-resolution-color-logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isFetching, dispatch } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const login_request = async (obj) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, obj);
      // console.log(res);
      dispatch({ type: "LOGIN_PROCESS", payload: res?.data?.message });
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR", payload: error });
      navigate(`/signup/${error.response.data.message}`);
    }
  };
  const handleForm = (e) => {
    e.preventDefault();
    const obj = {
      email: email.current.value,
      password: password.current.value,
    };
    login_request(obj);
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-header">
          <img className="signup-logo" src={logo} alt="logo" />
          <h1>SocialLint</h1>
          <span>A fast and reliable social-media app!</span>
        </div>
        <div className="login-box">
          <form className="login-box-wrapper" onSubmit={handleForm}>
            <input type="email" placeholder="Email" required ref={email} />
            <input
              type="password"
              placeholder="password"
              required
              minLength="6"
              ref={password}
            />
            <button
              type="submit"
              className="loginpage-btn"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="18px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="forgot-password">Forgot Password?</span>
            <Link to="/signup" className="signuppage-btn">
              <button>Sign Up</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
