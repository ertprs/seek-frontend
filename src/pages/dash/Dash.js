import React from 'react';

import './Dash.css';

export default ({ history }) => {

    return (
        <div className="dash-container">
            <div className="ml-2 mr-2">
                <button type="button" onClick={() => history.push('/panel')}>ACESSAR PAINEL</button>
                <button type="button" onClick={() => history.push('/register/products')}>CADASTRAR/EDITAR PRODUTOS</button>
                <button type="button" className="btn-encerrar" onClick={() => history.push('/')}>ENCERRAR</button>
            </div>
        </div>
    );
}

// Photo by Rod Long on Unsplash