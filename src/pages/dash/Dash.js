import React from "react";
import "./Dash.css";

export default ({ history, location }) => {
  const { user } = location.state;
  return (
    <div className="dash-container">
      <div className="ml-2 mr-2">
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
          onClick={() => history.push("/", { user })}
        >
          ENCERRAR
        </button>
      </div>
    </div>
  );
};

// Photo by Rod Long on Unsplash
