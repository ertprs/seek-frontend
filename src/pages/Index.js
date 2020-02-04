import React, { useState, useEffect } from 'react';
import Seek from './seek/Seek';
import api from '../services/api';

export default () => {

  const [lista, setLista] = useState([]);
  
  useEffect(() => {
    setLista([ ...api ])
  }, []);

  return (
    <div className="container-fluid" id="app">
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

