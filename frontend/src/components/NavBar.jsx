import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CiMemoPad } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        const result = await axios.get(
          "http://localhost:4000/api/users/" + user.userId
        );
        setLoggedUser(result.data);
      }
    }
    fetchUser();
  }, [user]);

  async function handleLogout() {
    await logout();
    navigate("/login");
    navigate(0);
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center">
              <CiMemoPad size={32} />
              Lkarni
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                {user && (
                  <>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Button onClick={handleLogout}>Logout</Button>
                  </>
                )}
                {!user && (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {loggedUser && (
        <div className="text-center my-4 ">
          <h2 className="text-capitalize">Hi, {loggedUser.name}</h2>
          <h6>
            Welcome to your dashboard, you are currently assigned with:{" "}
            {loggedUser.email}
          </h6>
        </div>
      )}
    </>
  );
}
