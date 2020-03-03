// @ts-nocheck
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import typeMessage from "../../constants/typeMessage";

import { login } from '../../services/auth';

import logo from "../../assets/logo/logo.png";
import "./Login.css";

export default ({ history }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, data } = await login(email, password);
      if(status === 202)
        notificacoes(data.message, typeMessage.WARNING)

      if(status === 203)
        notificacoes(data.message, typeMessage.ERROR)

      if(status === 200) {
        localStorage.setItem('TOKEN', data.token)
        history.push("/dash", { user: data.user });
      }
    } catch(error) {
      errorMessage(error)
    }
  }

  const errorMessage = (error) => {
    console.log(error);
    notificacoes('Não foi possível fazer login! Entre em contato com o desenvolvedor para solucionar o problema.', typeMessage.ERROR)
  }

  const notificacoes = (message, variant) => {
    enqueueSnackbar(message, {
      variant, // success, error, info, warning...
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      }, // Localização em que a mensagem irá aparecer...
      action: (
        <button className="btn btn-default text-light" onClick={() => closeSnackbar() }>
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
      ),
    });
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
