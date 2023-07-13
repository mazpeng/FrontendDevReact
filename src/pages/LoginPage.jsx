import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../service/firebase";
import { Modal, Button, Form } from "react-bootstrap";
import GoogleButton from "react-google-button";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function ContentLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  async function handleLogin() {
    if (!credential.email) {
      setError("Email is required");
      return;
    }
    if (!credential.password) {
      setError("Password is required");
      return;
    }
    try {
      const login = await signInWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      const token = login.user.accessToken;
      localStorage.setItem("token", token);
      setSuccess(true);
      setError("");
      setSmShow(true);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError("Wrong Password/Email");
      setSuccess(false);
      setSmShow(true);
    }
  }

  async function loginWithGoogle() {
    auth.languageCode = "it";
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("token", token);
        setSuccess(true);
        setError("");
        setSmShow(true);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      })
      .catch(() => {
        setError("something wrong");
        setSuccess(false);
        setSmShow(true);
      });
  }

  function handleChangeInput(e, type) {
    let value = e.target.value;
    let temp = { ...credential };
    temp[type] = value;
    setCredential(temp);
  }

  return (
    <div className="latar">
      <div className="container-login">
        <div className="form-group">
          <>
            <h1>Log In</h1>
            <div className="form-input">
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Your Email"
                  value={credential.email}
                  onChange={(e) => handleChangeInput(e, "email")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={credential.password}
                  onChange={(e) => handleChangeInput(e, "password")}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </Form.Group>

              <Button onClick={() => handleLogin()} variant="success">
                Login
              </Button>
              <p>
                Don’t have an account?{" "}
                <Link className="navigate-log" to="/register">
                  Sign Up
                </Link>{" "}
                /
                <Link className="navigate-log" to="/getPassword">
                  Forgot Password?
                </Link>
              </p>

              <div className="google">
                <GoogleButton onClick={() => loginWithGoogle()} />
              </div>
            </div>

            {!error && success && (
              <Modal show={smShow} onHide={() => setSmShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>GAMESTATION</Modal.Title>
                </Modal.Header>
                <Modal.Body>login successfully</Modal.Body>
              </Modal>
            )}
            {error && (
              <Modal show={smShow} onHide={() => setSmShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>ERROR</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
              </Modal>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
