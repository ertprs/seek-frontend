// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import CurrencyInput from "react-currency-input";
import Constants from "../../../constants/Constants";

import list from "../../../services/products";
import camera from "../../../assets/camera.svg";

import "./Products.css";

export default ({ history }) => {
  const [listProducts, setListProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState(0);
  const [label, setLabel] = useState('');

  useEffect(() => {
    setListProducts([...list]);
    setLabel(Constants.CADASTRAR);
  }, []);

  const preview = useMemo(() => {
    try {
      return image ? URL.createObjectURL(image) : null;
    } catch {
      return image;
    }
  }, [image]);

  async function handleSubmit(e) {
    e.preventDefault();
    const product = { image, name, ingredients, price };
    console.log(product);
  }

  const handleClickProduct = item => {
    console.log(item);
    setImage(item.image);
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
                onClick={() => history.push("/inicio")}
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
                        src={item.image}
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
