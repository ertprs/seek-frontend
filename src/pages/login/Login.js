// @ts-nocheck
import React, { useState } from "react";

import { login } from '../../services/auth';

import logo from "../../assets/logo/logo.png";
import "./Login.css";

export default ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = login(email, password);
      console.log(res)
      // history.push("/inicio");
    } catch(error) {
      alert('Falha ao login')
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Seek" className="image img-fluid" />
        <input
          placeholder="Seu e-mail..."
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Sua senha secreta..."
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">ENTRAR</button>
      </form>
    </div>
  );
};
