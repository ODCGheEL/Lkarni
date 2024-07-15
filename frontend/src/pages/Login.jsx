import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL_USERS } from "../utils/exports";

export default function Login() {
  const navigate = useNavigate();

  const {login} = useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const result = await axios.post(`${BACKEND_URL_USERS}/login`, {
        email,
        password,
      });

      if (result.status === 200) {
       login(result.data.token)
        Swal.fire({
          title: "Successful login!",
          text: "Welcome!",
          icon: "success",
        }).then(() => {
          navigate("/dashboard");
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Can't login, please try again",
        icon: "error",
      }).then(() => navigate(0));
    }
  }

  return (
    <Form className=" p-4 mx-5" onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
