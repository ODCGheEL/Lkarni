import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CiMemoPad } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL_USERS } from "../utils/exports";

export default function NavBar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        const result = await axios.get(`${BACKEND_URL_USERS}/${user.userId}`);
        setLoggedUser(result.data);
      }
    }
    fetchUser();
  }, [user]);

  async function handleLogout() {
    logout();
    navigate("/login");
    setLoggedUser(null);
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
              <Nav className=" d-flex align-items-center">
                {user && (
                  <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Button onClick={handleLogout}>Logout</Button>
                  </>
                )}
                {!user && (
                  <>
                    <Link to="/login" className="ms-2">
                      Login
                    </Link>
                    <Link to="/register" className="ms-2">
                      Register
                    </Link>
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
