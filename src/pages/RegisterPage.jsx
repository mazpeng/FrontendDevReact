import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../service/firebase";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [smShow, setSmShow] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  async function handleSignUp() {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      setSuccess(true);
      setSmShow(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
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
            <h1>Sign up</h1>
            <div className="form-input">
              <Form>
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
                  <Form.Text className="text-warning">
                    Password should be 6-20 characters
                  </Form.Text>
                  {error && <p className="text-danger">{error}</p>}
                </Form.Group>
                <Button
                  onClick={() => {
                    setSmShow(true);
                    handleSignUp();
                  }}
                  variant="success"
                >
                  Create Account
                </Button>{" "}
                <p>
                  Forgot your password?
                  <Link to="/getPassword">Forgot Password?</Link> /{" "}
                  <Link to="/login">Login Here</Link>
                </p>
              </Form>
            </div>

            <Modal
              show={smShow}
              onHide={() => {
                setSmShow(false);
                setError(null);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {success
                  ? "Sign up Berhasil, silahkan masuk untuk melengkapi nama Anda di Profile!..."
                  : error && <p className="text-danger">{error}</p>}
                <Button onClick={() => navigate("/login")} variant="primary">
                  Login
                </Button>{" "}
              </Modal.Body>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};
