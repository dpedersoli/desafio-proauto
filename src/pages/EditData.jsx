import { useState, useCallback } from "react";

import api from '../api/axios'

import Form from 'react-bootstrap/Form';

export const EditData = () => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const urlParams = new URLSearchParams(window.location.search);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    api.put("/endpoint", data, { //passar o endpoint aqui
      headers: {
        Authorization: `Bearer ${urlParams.get("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.errorMessage);
      });
  },
    [data]
  );

  return (
    <section>
      <header>
        <h1 className="d-flex justify-content-center h3"><strong>Alterar Endereço</strong></h1>
      </header>
      <main>
        <Form
          action="/address-change"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="newAddress"
              onChange={(e) => setData({ address: e.target.value })}
              required
              placeholder="Novo Endereço..."
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <button type="button" className="btn btn-danger">Alterar</button>
          </Form.Group>
        </Form>
      </main>
      <footer>
        <p>{message}</p>
      </footer>
    </section>
  )
}