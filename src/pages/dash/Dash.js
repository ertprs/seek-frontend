import React from 'react';

import './Dash.css';

export default ({ history }) => {

    return (
        <div className="register-container">
            <div className="ml-2 mr-2">
                <button type="button" onClick={() => history.push('/panel')}>Acessar Painel</button>
                <button type="button" onClick={() => history.push('/register/products')}>Cadastrar Produtos</button>
                <button type="button" onClick={() => history.push('/')}>Encerrar</button>
            </div>
        </div>
    );
}