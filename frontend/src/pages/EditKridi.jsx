import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditKridi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    async function fetchKridi() {
      const result = await axios.get(
        "http://localhost:4000/api/lkridi/" + id,
        config
      );
      console.log(result);
      if (result.status === 200) {
        setTitle(result.data.title);
        setDescription(result.data.description);
      }
    }
    fetchKridi();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axios.put(
        "http://localhost:4000/api/lkridi/" + id,
        {
          title,
          description,
        },
        config
      );
      if (result.status === 201) {
        Swal.fire({
            title: "Kridi updated successfully!",
            text: "Nice!",
            icon: "success",
          }).then(() => {
            navigate("/dashboard");
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button onClick={() => navigate("/dashboard")}>Go back</Button>
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
    </>
  );
}
