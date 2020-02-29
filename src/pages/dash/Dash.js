// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import typeMessage from "../../constants/typeMessage";
import api from '../../services/api';
import "./Dash.css";

export default ({ history, location }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [user, setUser] = useState({})

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const { user: User } = location.state
      const { status, data } = await api.get(`/user/${User._id}`)

      if(status === 202) {
        notificacoes(data.message, typeMessage.WARNING)
      }

      if(status === 200) {
        setUser({ ...data })
      }

    } catch(error) {
      console.error(error)
      notificacoes('Falha ao buscar o usuário!', typeMessage.ERROR)
    }
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
    <div className="dash-container">
      <div className="ml-2 mr-2">
        <div className="user">
          <img src={user.image_url} className="image" alt={user.username} />
          <label className="name mt-3">{`${user.name} ${user.surname}`}</label>
        </div>
        <button
          type="button"
          className="button"
          onClick={() => history.push("/registrar/restaurante", { user })}
        >
          RESTAURANTE
        </button>
        <button
          type="button"
          className="button"
          onClick={() => history.push("/registrar/usuario", { user })}
        >
          NOVO USUÁRIO
        </button>
        <button
          type="button"
          className="button"
          onClick={() => history.push("/registrar/produtos", { user })}
        >
          CADASTRAR/EDITAR PRODUTOS
        </button>
        <button
          type="button"
          className="button"
          onClick={() => history.push("/relatorio", { user })}
        >
          RELATÓRIOS
        </button>
        <button
          type="button"
          className="btn-encerrar"
          onClick={() => {
            localStorage.clear()
            history.push("/")
          }}
        >
          ENCERRAR
        </button>
      </div>
    </div>
  );
};

// Photo by Rod Long on Unsplash
