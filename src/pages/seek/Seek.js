import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import formaPagamento from '../../constants/FormaPagamento';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCheckCircle, faPaperPlane, faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons'

import './Seek.css';

export default props => {
  return (
    <>
      <div className="col-lg-3 col-md-4 mt-3 mb-3">
        <div id="containerPedido">
          <div className="user">
            <img className="img-fluid foto" src={props.foto} alt={props.nome}/>
            <div className="card-user">
              <h1 className="nome mt-2">{props.nome.toUpperCase()}</h1>
              <span className="horaPedido">
                HORÁRIO DO PEDIDO:
                <strong>
                  {` ${moment(new Date(props.dataHora)).format('hh:mm')}`}
                </strong>
              </span>
              <FontAwesomeIcon 
                color={props.formaPagamento === formaPagamento.CARTAO ? 'rgb(48, 84, 161)': 'rgb(34, 167, 89)'}
                icon={props.formaPagamento === formaPagamento.CARTAO ? faCreditCard : faMoneyBillWave} />
            </div>
          </div>
          <hr></hr>
          <div className="listaContainer">
            <table className="table table-striped">
              <thead>
                <tr className="headerTabela">
                  <th scope="col">PRODUTO</th>
                  <th scope="col">SABOR</th>
                  <th scope="col">VALOR</th>
                  <th scope="col">QTD</th>
                </tr>
              </thead>
              <tbody>
                {
                  props.pedidos.map((pedido, index) => (
                    <tr key={index}>
                      <td>{pedido.produto.toUpperCase()}</td>
                      <td>{pedido.sabor.toUpperCase()}</td>
                      <td><span className="cifrao">R$</span>{pedido.preco.toFixed(2)}</td>
                      <td>{pedido.quantidade}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <hr></hr>
          <div className="w-100 footer">
            <div className="total">
              <span className="total-label">TOTAL: <span className="cifrao">R$</span><strong>{props.total.toFixed(2)}</strong></span>
            </div>
            <div className="containerButtons">
              <button className="botao clock"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Informar atraso..." >
                <FontAwesomeIcon color="#FFF" icon={faClock} />
              </button>
              <button className="botao check ml-3 mr-3"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Informar pedido finalizado..." >
                <FontAwesomeIcon color="#FFF" icon={faCheckCircle} />
              </button>
              <button className="botao paper"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Solicitar envio..." >
                <FontAwesomeIcon color="#FFF" icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
