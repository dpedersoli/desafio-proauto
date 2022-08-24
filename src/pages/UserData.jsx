import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'

import api from '../api/axios'

export const UserData = () => {
  const [userData, setUserData] = useState({})

  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/edit-data")
  }

  useEffect(() => {
    let token = ""
    token = localStorage.getItem("token")
    const response = api.get("/endpoint", { //passar o endpoint aqui
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
      .then(response => {
        setUserData(response.data)
      })
  }, [userData])

  return (
    <section>
      <header>
        <h1 className="d-flex justify-content-center h3"><strong>Informações do Usuário</strong></h1>
      </header>
      <main>
        <label>Nome: </label>
        <p>{userData.name}</p>
        <br />
        <label>CPF: </label>
        <p>{userData.cpf}</p>
        <br />
        <label>Placa: </label>
        <p>{userData.plate}</p>
        <br />
        <label>Contato: </label>
        <p>{userData.contact}</p>
        <br />
        <label>Endereço: </label>
        <p>{userData.address}</p>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-dark" onClick={handleNavigate} >Alterar Endereço</button>
        </div>
        <br />
      </main>
    </section>
  )
}