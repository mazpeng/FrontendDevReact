import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../service/firebase";

export const ContentProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setisLogin(true);
    }
  }, []);

  const [users, setUsers] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      {isLogin ? (
        <div className="container-profile">
          <div className="profile-edit bg-secondary">
            <div className="profile-body">
              <div className="row align-items-center">
                <h1>Info Profile</h1>
                <div className="col">
                  <h6 className="text-white mb-0">UID:</h6>
                  <p className="text-white">{users && users.uid}</p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-white mb-0">Email:</h6>
                  <p className="text-white">{users && users.email}</p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-white mb-0">Name:</h6>
                  <p className="text-white">{users && users.displayName}</p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-white mb-0">Avatar:</h6>
                  <p className="text-white">{users && users.photoURL}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="class-btn">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/ProfileEdit")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="container-xs " style={{ height: "81vh" }}>
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
