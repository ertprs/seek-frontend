// @ts-nocheck
import React, { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import CurrencyInput from 'react-currency-input'
import Constants from '../../../constants/Constants';
import list from '../../../services/products'

import camera from '../../../assets/camera.svg'

import './Products.css'

export default ({ history }) => {
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [price, setPrice] = useState(0)
    const [listProducts, setListProducts] =  useState([...list])
    const [label, setLabel] = useState(Constants.CADASTRAR);

    const preview = useMemo(() => {
        try {
            return image ? URL.createObjectURL(image) : null
        } catch {
            return image
        }
        }, [image]
    )
  
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(name, ingredients, price, image)
    }

    const handleClickProduct = item => {
        setImage(item.image)
        setName(item.name)
        setIngredients(item.ingredients)
        setPrice(item.price.toFixed(2))
        setLabel(Constants.SALVAR)
    }

    return (

        <div className="container-fluid" id="products-container">
            <div className="row">
                <div className="col-md-4">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label 
                                id="image" 
                                style={{ backgroundImage: `url(${preview})` }}
                                className={image ? 'has-image' : ''}
                            >
                                <input type="file" onChange={event => setImage(event.target.files[0])} />
                                <img src={camera} alt="Selecione uma imagem"/>
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
                                value={parseFloat(price)}
                                onChange={e => setPrice(e.target)}
                            />
                            <button type="submit">{label}</button>
                            <button type="button" className="btn-voltar" onClick={() => history.push('/dash')}>VOLTAR</button>
                        </form>
                    </div>

                </div>
                <div className="col-md-8">

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
                            {
                                listProducts.map((item, index) => (
                                    <tr className="product-item" key={index} onClick={() => handleClickProduct(item)}>
                                        <td><img style={{width: 80, height: 'auto'}} src={item.image} alt={item.name}/></td>
                                        <td>{item.name}</td>
                                        <td>{item.ingredients}</td>
                                        <td>{String(item.price.toFixed(2)).replace('.', ',')}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}