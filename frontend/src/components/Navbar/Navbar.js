import React, { useContext, useRef } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import image from "../../images/user-icon.png";
import "./Navbar.css";
import { AuthContext } from "../../Auth/AuthContextProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, theme } = useContext(AuthContext);
  const searchTerm = useRef();
  const navigate = useNavigate();

  const handleSearch = () => {
    // window.location.href = "/profile/" + `${searchTerm.current.value}`;
    navigate(`/profile/${searchTerm.current.value}`);
  };

  return (
    <div className={theme === "light" ? "navbar" : "navbar dark"}>
      <Link className="left" to="/" style={{ textDecoration: "none" }}>
        <div>Socialint</div>
      </Link>
      <form className="center">
        <SearchOutlinedIcon />
        <input
          type="text"
          className="searchInput"
          placeholder="Search for friends..."
          ref={searchTerm}
        />
        <button type="submit" className="search" onClick={handleSearch}>
          Search
        </button>
      </form>
      <div className="right">
        {/* <div className="left">
          <div className="icon">
            <PersonIcon />
            <span>1</span>
          </div>
          <div className="icon">
            <MessageOutlinedIcon />
            <span>2</span>
          </div>
          <div className="icon">
            <NotificationsNoneOutlinedIcon />
            <span>3</span>
          </div>
        </div> */}
        <div className="messengerClass">
          <Link
            to="/messenger"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span>Open ChatBox</span>
          </Link>
        </div>
        <div className="right">
          <Link to={`/profile/${user?.username}`}>
            <img src={user?.profilePicture || image} alt="profile_photo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
