import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <section className="hero-section" style={{ width: "100%" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1>Simplify Your Loan Management</h1>
              <p>
                Lkarni is a platform that helps you manage your loans easily and
                efficiently.
              </p>
              <Link to="/login">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col lg={6}>
              {/* Insert image here */}
              <img
                src="https://w0.peakpx.com/wallpaper/981/932/HD-wallpaper-personal-loan-emi-calculator-personal-loan-personal-loan-india-fianance-loans-banking.jpg"
                alt="Lkarni"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
