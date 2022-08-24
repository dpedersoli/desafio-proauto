import { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import AuthContext from '../context/AuthProvider'

import api from '../api/axios'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const DataSearcher = () => {
  const { setAuth } = useContext(AuthContext)
  const plateRef = useRef()
  const errRef = useRef()

  const [plate, setPlate] = useState('')
  const [cpf, setCpf] = useState('')
  const [errMsg, setErrMsg] = useState('')

  let navigate = useNavigate();

  useEffect(() => {
    plateRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [plate, cpf])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/endpoint", //passar o endpoint aqui
        JSON.stringify({ plate, cpf }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const token = response?.data?.token
      const roles = response?.data?.roles
      setAuth({ plate, cpf, roles, token })
      setPlate('')
      setCpf('')
      navigate("/user-data");
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Sem resposta do servidor')
      } else if (err.response?.status === 400) {
        setErrMsg('Seus dados não constam no sistema, insira dados válidos')
      } else if (err.response?.status === 401) {
        setErrMsg('A consulta falhou')
      }
      errRef.current.focus()
    }
  }

  return (
    <section>
      <header>
        <h1 className="d-flex justify-content-center h3"><strong> Consultar</strong></h1>
      </header>
      <main>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="d-flex justify-content-center">CPF</Form.Label>
            <Form.Control
              type="text"
              id="cpf"
              onChange={(e) => setCpf(e.target.value)}
              value={cpf}
              placeholder="11122233345"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="d-flex justify-content-center">Placa do Veículo</Form.Label>
            <Form.Control
              type="text"
              id="plate"
              ref={plateRef}
              onChange={(e) => setPlate(e.target.value)}
              value={plate}
              placeholder="ABC0123"
              required
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Consultar
            </Button>
          </Form.Group>
        </Form>
      </main>
      <p ref={errRef} className={errMsg ? "errormessage" : "offscreen"} >{errMsg}</p>
    </section>
  )
}