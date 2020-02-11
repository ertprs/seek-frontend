// @ts-nocheck
import React, { useState } from "react";

import logo from "../../assets/logo/logo.png";
import "./Login.css";

export default ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    history.push("/inicio");
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Seek" className="image img-fluid" />
        <input
          placeholder="Nome de usuário..."
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
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
