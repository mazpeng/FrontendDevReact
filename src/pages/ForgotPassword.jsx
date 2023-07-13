import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import app from "../service/firebase";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { Form, Button } from "react-bootstrap";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleChangeField = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email to reset the password");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="latar">
      <div className="container-login">
        <div className="form-group">
          <>
            <h1>Reset Password</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  placeholder="Your Email"
                  type="email"
                  value={email}
                  onChange={handleChangeField}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Kirim Email Reset Password
              </Button>
            </Form>
            <Link className="navigate-log" to="/login">
              Login Here
            </Link>
          </>
        </div>
      </div>
    </div>
  );
}
