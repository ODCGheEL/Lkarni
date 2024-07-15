import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { BACKEND_URL_LKRIDI } from "../utils/exports";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [kridiyat, setKridiyat] = useState([]);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    async function fetchKridis() {
      const result = await axios.get(`${BACKEND_URL_LKRIDI}`, config);
      setKridiyat(result.data);
    }
    fetchKridis();
  }, []);

  async function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const result = await axios.delete(
            `${BACKEND_URL_LKRIDI}/${id}`,
            config
          );
          if (result.status === 204) {
            navigate("/dashboard");
            navigate(0);
          }
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: error.message,
        });
      });
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Kridiyat</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn btn-block" onClick={() => navigate("/add")}>
            <FaEdit /> Zid Kridi
          </Button>
        </Col>
      </Row>
      <>
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {kridiyat.map((kridi) => (
              <tr key={kridi.id}>
                <td>{kridi.id}</td>
                <td>{kridi.title}</td>
                <td>{kridi.description}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => navigate("/edit/" + kridi.id)}
                  >
                    <MdEdit />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(kridi.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    </>
  );
}
