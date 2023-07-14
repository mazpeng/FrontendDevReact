import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import app from "../service/firebase";

export const ContentProfileEdit = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setisLogin(true);
    }
  }, []);

  const [users, setUsers] = useState();
  const [profile, setProfile] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUsers(data);
    });
  }, []);

  function updatedata() {
    updateProfile(auth.currentUser, {
      displayName: profile.name,
      photoURL: profile.avatar,
    })
      .then(() => {
        alert("Profile updated");
        navigate("/profile");
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }

  function handleChangeInput(e, type) {
    let value = e.target.value;
    let temp = { ...profile };
    temp[type] = value;
    setProfile(temp);
  }

  return (
    <>
      {isLogin ? (
        <div className="container-profile">
          <div className="profile-edit bg-secondary">
            <div className="profile-body">
              <div className="row align-items-center">
                <h1>Update Profile</h1>
                <div className="col">
                  <h6 className="text-white mb-0">UID:</h6>
                  {users && (
                    <>
                      <input
                        className="form-control"
                        type="text"
                        value={users.uid}
                        readOnly
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-white mb-0">Email:</h6>
                  {users && (
                    <>
                      <input
                        className="form-control"
                        type="text"
                        value={users.email}
                        readOnly
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-white mb-0">Name:</h6>
                  {users && (
                    <>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Update Name"
                        value={profile.name}
                        onChange={(e) => handleChangeInput(e, "name")}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="class-btn">
            <button className="btn btn-secondary" onClick={updatedata}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="container-xs mt-4" style={{ height: "81vh" }}>
          <div className="row justify-content-center align-items-center">
            <div className="col justify-content-center align-items-center">
              <div className="card">
                <div className="card-body">
                  <h1 className="text-center">Please Login To View Page!</h1>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
