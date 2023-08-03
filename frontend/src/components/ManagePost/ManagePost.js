import React, { useContext, useState } from "react";
import "./ManagePost.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdatePost from "../UpdatePost/UpdatePost";
import { AuthContext } from "../../Auth/AuthContextProvider";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const ManagePost = ({ post, user }) => {
  const { setTheme, token } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/posts/delete/${post?._id}`, {
        headers: {
          Authorization: token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const ManagePostOne = () => {
    return (
      <div className="managePost">
        <span
          className="managePostSpan"
          onClick={() => {
            setEdit(true);
            setTheme("dark");
          }}
        >
          <EditIcon />
          Edit
        </span>
        <span className="managePostSpan" onClick={handleDelete}>
          <DeleteIcon />
          Delete
        </span>
      </div>
    );
  };
  return (
    <>{!edit ? <ManagePostOne /> : <UpdatePost post={post} user={user} />}</>
  );
};

export default ManagePost;
