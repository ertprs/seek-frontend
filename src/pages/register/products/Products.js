// @ts-nocheck
import React, { useState, useMemo } from "react";
import CurrencyInput from "react-currency-input";
import Constants from "../../../constants/Constants";

import list from "../../../services/products";
import camera from "../../../assets/camera.svg";

import "./Products.css";

const initialState = {
  id: null,
  image: null,
  name: "",
  ingredients: "",
  price: 0,
  label: Constants.CADASTRAR
};

export default ({ history }) => {
  const [product, setProduct] = useState({ ...initialState });
  const [listProducts, setListProducts] = useState([...list]);

  const preview = useMemo(() => {
    try {
      return product.image ? URL.createObjectURL(product.image) : null;
    } catch {
      return product.image;
    }
  }, [product.image]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(product);
  }

  const handleClickProduct = item => {
    setProduct({ ...item, label: Constants.SALVAR });
  };

  const newProduct = () => {
    setProduct({ ...initialState });
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
                className={product.image ? "has-image" : ""}
              >
                <input
                  type="file"
                  onChange={event =>
                    setProduct({
                      image: event.target.files[0],
                      label: Constants.CADASTRAR
                    })
                  }
                />
                <img src={camera} alt="Selecione uma imagem..." />
              </label>
              <input
                placeholder="Nome do produto..."
                value={product.name}
                onChange={e =>
                  setProduct({ name: e.target.value.toUpperCase() })
                }
              />
              <input
                placeholder="Ingredientes..."
                value={product.ingredients}
                onChange={e =>
                  setProduct({ ingredients: e.target.value.toUpperCase() })
                }
              />
              <label className="dica">Separados por vírgula</label>
              <CurrencyInput
                decimalSeparator=","
                thousandSeparator="."
                value={parseFloat(product.price)}
                onChange={e => setProduct({ price: e.target })}
              />
              <button type="submit">{product.label}</button>
              {product.label === Constants.SALVAR && (
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
                onClick={() => history.push("/dash")}
              >
                VOLTAR
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
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
