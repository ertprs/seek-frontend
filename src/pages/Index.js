import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Seek from './seek/Seek';
import api from '../services/api';

import './Index.css';


export default ({ history }) => {

  const [lista, setLista] = useState([]);
  
  useEffect(() => {
    setLista([ ...api ])
  }, []);

  return (
    <div className="container-fluid" id="app">
      <div className="row w100">
        <div className="col-12 d-flex justify-content-end">
          <button className="painel mr-2" onClick={() => history.push('/dash')}>
            <FontAwesomeIcon color="#624CAB" icon={faReply} />
          </button>
          <button className="painel" onClick={() => history.push('/')}>
            <FontAwesomeIcon color="rgb(199, 99, 99)" icon={faPowerOff} />
          </button>
        </div>
      </div>
      <div className="row">
        {
          lista.map((pedido, index) => (
            <Seek key={index} {...pedido} />
          ))
        }
      </div>
    </div>
  );
}

