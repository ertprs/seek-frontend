// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack'
import CurrencyInput from "react-currency-input"
import Constants from "../../../constants/Constants"
import typeMessage from "../../../constants/typeMessage"

import { api } from '../../../services/api'

import camera from "../../../assets/camera.svg"

import "./Products.css"

export default ({ history, location }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [item, setItem] = useState({})
  const [listProducts, setListProducts] = useState([])
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [price, setPrice] = useState(0)
  const [label, setLabel] = useState('')
  const [restaurantId, setRestaurantId] = useState('')

  const { user } = location.state

  useEffect(() => {
    showRestaurantUser()
    setLabel(Constants.CADASTRAR)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showRestaurantUser = async () => {
    try {
      if(!user.restaurant) {
        notificacoes('O restaurante ainda não foi cadastrado!', typeMessage.INFO)
        return
      }

      const { status, data } = await api.get(`/restaurant/${user.restaurant}`)
      if(status === 202) {
        notificacoes('O restaurante ainda não foi cadastrado!', typeMessage.INFO)
        return
      }
      indexProducts()
      setRestaurantId(data._id)
    } catch(error) {
      errorMessage(error)
    }
  }

  const indexProducts = async () => {
    try {
      const { data } = await api.get(`/product/restaurant/${user.restaurant}`)
      setListProducts([...data])
    } catch(error) {
      errorMessage(error)
    }
  }



  const preview = useMemo(() => {
    try {
      return image ? URL.createObjectURL(image) : null
    } catch {
      return image
    }
  }, [image])

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(label === Constants.SALVAR) {
      onUpdate()
    } else {
      onRegister()
    }
  }

  async function onRegister() {
    try{
      const valid = isFieldsEmpty(image, name, ingredients, price, restaurantId)
      if(valid) {
        const data = new FormData()
        data.append('image', image)
        data.append('restaurant', restaurantId)
        data.append('name', name)
        data.append('ingredients', ingredients)
        data.append('price', price.replace(',', '.'))
        await api.post('/product', data)
        // Os produtos serão atualizados atravéz de socket.io
        // A busca no banco através do método abaixo é somente
        // durante o desenvolvimento para teste
        notificacoes('Registro salvo com sucesso!', typeMessage.SUCCESS)
        indexProducts()
        setLabel(Constants.CADASTRAR)
        newProduct()
      }
    } catch(error) {
      errorMessage(error)
    }
  }

  async function onUpdate() {
    try{
      if(!item._id)
        notificacoes('Falha ao identificar o produto!', typeMessage.ERROR)

      const valid = isFieldsEmpty(image, name, ingredients, price, restaurantId)
      if(valid) {
        const data = new FormData()
        data.append('image', image)
        data.append('name', name)
        data.append('ingredients', ingredients)

        let priceFormatter = null
        if(typeof price === 'number') {
          priceFormatter = price
        } else if(typeof price === 'string') {
          priceFormatter = price.replace(',', '.')
        }
        data.append('price', priceFormatter)
        
        const res = await api.put(`/product/${item._id}`, data)

        if(res.status === 202)
          notificacoes(res.data.message, typeMessage.ERROR)
        // Os produtos serão atualizados atravéz de socket.io
        // A busca no banco através do método abaixo é somente
        // durante o desenvolvimento para teste
        if(res.status === 200) {
          notificacoes('Registro atualizado com sucesso!', typeMessage.SUCCESS)
          indexProducts()
          setLabel(Constants.CADASTRAR)
          newProduct()
        }
      }
    } catch(error) {
      errorMessage(error)
    }
  }

  const onDelete = async () => {
    try {
      if(!item._id) 
        notificacoes('O ID do produto deve ser informado!', typeMessage.WARNING)

      const { status, data } = await api.delete(`/product/${item._id}`)

      if(status === 202) 
        notificacoes(data.message, typeMessage.ERROR)

      if(status === 200)
        notificacoes(data.message, typeMessage.SUCCESS)

      newProduct()
      indexProducts()
      setLabel(Constants.CADASTRAR)
    } catch(error) {
      errorMessage(error)
    }
  }

  const isFieldsEmpty = (image, name, ingredients, price, restaurantId) => {
    if(!image || !name || !ingredients || !price) {
      notificacoes('Todos os campos devem ser preenchidos!', typeMessage.WARNING)
      return false
    }

    if(!restaurantId) {
      notificacoes('Não foi possível identificar o restaurante!', typeMessage.WARNING)
      return false
    }

    return true
  }

  const handleClickProduct = item => {
    setItem({...item})
    setImage(item.image_url)
    setName(item.name)
    setIngredients(item.ingredients)
    setPrice(item.price)
    setLabel(Constants.SALVAR)
  }

  const newProduct = () => {
    setName('')
    setIngredients('')
    setPrice(0)
    setImage(null)
    setLabel(Constants.CADASTRAR)
  }

  const errorMessage = (error) => {
    console.log(error)
    notificacoes('Falha na requisição!', typeMessage.ERROR)
  }

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
    })
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
                onChange={e => setName(e.target.value.toUpperCase())}
              />
              <input
                placeholder="Ingredientes..."
                value={ingredients}
                onChange={e => setIngredients(e.target.value.toUpperCase())}
              />
              <label className="dica">Separados por vírgula</label>
              <CurrencyInput
                decimalSeparator=","
                thousandSeparator="."
                value={price}
                onChange={e =>  setPrice(e)}
              />
              <button type="submit">{label}</button>
              {label === Constants.SALVAR && (
                <>
                  <button
                    type="button"
                    className="btn-deletar"
                    onClick={() => onDelete()}
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
  )
}
