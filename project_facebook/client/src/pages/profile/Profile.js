import React, { useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/slidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(async () => {
    const feactPosts = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    feactPosts();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} key={user._id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
