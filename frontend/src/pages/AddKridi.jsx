import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { BACKEND_URL_LKRIDI } from "../utils/exports";

export default function AddKridi() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await axios.post(
      `${BACKEND_URL_LKRIDI}`,
      {
        title,
        description,
        userId: user.userId,
      },
      config
    );
    if (result.status === 201) {
         Swal.fire({
           title: "Kridi added successfully!",
           text: "Nice!",
           icon: "success",
         }).then(() => {
           navigate("/dashboard");
         });
       }
  }

  return (
    <Form className=" p-4 mx-5" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Kridi Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter kridi title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Kridi Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Kridi description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
