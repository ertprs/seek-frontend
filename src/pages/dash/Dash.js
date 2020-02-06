import React from "react";
import { Link } from "react-router-dom";

import "./Dash.css";

export default ({ history }) => {
  return (
    <div className="dash-container">
      <div className="ml-2 mr-2">
        <Link to="/panel" className="button">
          ACESSAR PAINEL
        </Link>
        <Link to="/register/products" className="button">
          CADASTRAR/EDITAR PRODUTOS
        </Link>
        {/* <Link to="/" className="button" >
                    RELATÓRIOS
                </Link> */}
        <button
          type="button"
          className="btn-encerrar"
          onClick={() => history.push("/")}
        >
          ENCERRAR
        </button>
      </div>
    </div>
  );
};

// Photo by Rod Long on Unsplash
