// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import CurrencyInput from "react-currency-input";
import Constants from "../../../constants/Constants";
import typeMessage from "../../../constants/typeMessage";

import { api } from '../../../services/api';

import camera from "../../../assets/camera.svg";

import "./Products.css";

export default ({ history, location }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [listProducts, setListProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState(0);
  const [label, setLabel] = useState('');
  const [restaurantId, setRestaurantId] = useState('');

  const { user } = location.state;

  useEffect(() => {
    setLabel(Constants.CADASTRAR);
    showRestaurantInUser()
    indexProducts()
  }, []);

  const showRestaurantInUser = async () => {
    try {
      const { status, data } = await api.get(`/restaurant/user/${user._id}`)
      if(status === 202)
        notificacoes(data.message, typeMessage.WARNING)

      setRestaurantId(data._id);
    } catch(error) {
      errorMessage(error)
    }
  }

  const indexProducts = async () => {
    try {
      const { data } = await api.get('/product');
      if(data.length === 0)
        notificacoes('Falha ao buscar os produtos!', typeMessage.INFO)

        setListProducts([...data]);
    } catch(error) {
      errorMessage(error)
    }
  }

  const errorMessage = (error) => {
    console.log(error);
    notificacoes('Falha ao buscar os produtos!', typeMessage.ERROR)
  }

  const preview = useMemo(() => {
    try {
      return image ? URL.createObjectURL(image) : null;
    } catch {
      return image;
    }
  }, [image]);

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const data = new FormData()
      data.append('image', image)
      data.append('restaurant', restaurantId);
      data.append('name', name)
      data.append('ingredients', ingredients)
      data.append('price', parseFloat(price))
      const product = await api.post('/product', data);
      console.log(product)
    } catch(error) {
      console.log(error)
      notificacoes('Falha ao registrar produto!', typeMessage.ERROR)
    }
    
  }

  const handleClickProduct = item => {
    setImage(item.image_url);
    setName(item.name);
    setIngredients(item.ingredients);
    setPrice(item.price);
    setLabel(Constants.SALVAR)
  };

  const newProduct = () => {
    setName('');
    setIngredients('');
    setPrice(0);
    setImage(null);
    setLabel(Constants.CADASTRAR);
  };

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
    <div className="container-fluid bg-white">
      <div className="row">
        <div className="col-md-4">
          <div id="products-container">
            <form onSubmit={handleSubmit}>
              <label
                id="image"
                style={{ backgroundImage: `url(${preview})` }}
                className={image ? "has-image" : ""}
              >
                <input
                  type="file"
                  onChange={event => setImage(event.target.files[0])}
                />
                <img src={camera} alt="Selecione uma imagem..." />
              </label>
              <input
                placeholder="Nome do produto..."
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                placeholder="Ingredientes..."
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
              />
              <label className="dica">Separados por vírgula</label>
              <CurrencyInput
                decimalSeparator=","
                thousandSeparator="."
                value={parseFloat(price)}
                onChange={e => setPrice(e.target)}
              />
              <button type="submit">{label}</button>
              {label === Constants.SALVAR && (
                <>
                  <button
                    type="button"
                    className="btn-deletar"
                    onClick={() => {}}
                  >
                    DELETAR
                  </button>
                  <button
                    type="button"
                    className="btn-novo"
                    onClick={() => newProduct()}
                  >
                    NOVO
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn-voltar"
                onClick={() => history.push("/dash", { user })}
              >
                VOLTAR PARA O MENU
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8 containerCadastro">
          <h1 className="title-products">Produtos cadastrados</h1>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Imagem</th>
                  <th scope="col">Nome do produto</th>
                  <th scope="col">Ingredientes</th>
                  <th scope="col">Preço</th>
                </tr>
              </thead>
              <tbody>
                {listProducts.map((item, index) => (
                  <tr
                    className="product-item"
                    key={index}
                    onClick={() => handleClickProduct(item)}
                  >
                    <td className="align-middle">
                      <img
                        style={{ width: 80, height: "auto" }}
                        src={item.image_url}
                        alt={item.name}
                      />
                    </td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">{item.ingredients}</td>
                    <td className="align-middle">
                      {String(item.price.toFixed(2)).replace(".", ",")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
