/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import { InputMask } from 'primereact/inputmask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import Constants from "../../../constants/Constants";
import typeMessage from "../../../constants/typeMessage";

import { api } from '../../../services/api';

import camera from "../../../assets/camera.svg";

import "./Restaurant.css";

export default ({ history, location }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [item, setItem] = useState({});
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [addressName, setAddressName] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressCep, setAddressCep] = useState('');
  const [label, setLabel] = useState('');

  const { user } = location.state;

  useEffect(() => {
    showRestaurant()
  }, []);

  const showRestaurant = async () => {
    try {
      const { status, data } = await api.get(`/restaurant/user/${user._id}`)
      if(status === 202)
        notificacoes(data.message, typeMessage.WARNING)

      if(data._id) {
        setImage(data.image_url)
        setName(data.name)
        setAddressName(data.addressName)
        setAddressNumber(data.addressNumber)
        setAddressCity(data.addressCity)
        setAddressCep(data.addressCep)
        setLabel(Constants.SALVAR)
        setItem({ ...data })
      } else {
        setLabel(Constants.CADASTRAR)
      }
    } catch(error) {
      errorMessage(error)
    }
  }


  const errorMessage = (error) => {
    console.log(error);
    notificacoes('Falha na requisição!', typeMessage.ERROR)
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
    if(label === Constants.SALVAR) {
      onUpdate()
    } else {
      onRegister()
    }
  }

  async function onRegister() {
    try{
      const valid = isFieldsEmpty(image, name, addressName, addressNumber, addressCity, addressCep)
      if(valid) {
        const dataRestaurant = new FormData()
        dataRestaurant.append('image', image)
        dataRestaurant.append('user', user._id)
        dataRestaurant.append('name', name)
        dataRestaurant.append('addressName', addressName)
        dataRestaurant.append('addressNumber', addressNumber)
        dataRestaurant.append('addressCity', addressCity)
        dataRestaurant.append('addressCep', addressCep.replace('.', '').replace('-', ''))
        const { status, data } = await api.post('/restaurant', dataRestaurant)

        if(status === 202)
          notificacoes(data.message, typeMessage.WARNING)
          
        // Os produtos serão atualizados atravéz de socket.io
        // A busca no banco através do método abaixo é somente
        // durante o desenvolvimento para teste
        if(status === 200) {
          notificacoes('Registro salvo com sucesso!', typeMessage.SUCCESS)
          setLabel(Constants.SALVAR)
        }
      }
    } catch(error) {
      errorMessage(error)
    }
  }

  async function onUpdate() {
    try{
      const valid = isFieldsEmpty(image, name, addressName, addressNumber, addressCity, addressCep)
      if(valid) {
        const dataRestaurant = new FormData()
        dataRestaurant.append('image', image)
        dataRestaurant.append('name', name)
        dataRestaurant.append('addressName', addressName)
        dataRestaurant.append('addressNumber', addressNumber)
        dataRestaurant.append('addressCity', addressCity)
        dataRestaurant.append('addressCep', addressCep.replace('.', '').replace('-', ''))
        const { status, data } = await api.put(`/restaurant/${item._id}`, dataRestaurant)

        if(status === 202) {
          console.log(data.message)
          notificacoes(data.message, typeMessage.WARNING)
        }
          
        // Os produtos serão atualizados atravéz de socket.io
        // A busca no banco através do método abaixo é somente
        // durante o desenvolvimento para teste
        if(status === 200) {
          notificacoes('Registro atualizado com sucesso!', typeMessage.SUCCESS)
          setLabel(Constants.SALVAR)
        }
      }
    } catch(error) {
      errorMessage(error)
    }
  }

  const isFieldsEmpty = (image, name, addressName, addressNumber, addresCity, cep) => {
    if(!image || !name || !addressName || !addressNumber || !addresCity || !cep) {
      notificacoes('Todos os campos devem ser preenchidos!', typeMessage.WARNING)
      return false
    }

    if(cep.replace('_', '').replace('.', '').replace('-', '').length < 8) {
      notificacoes('CEP inválido!', typeMessage.WARNING)
      return false
    }

    return true
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
    });
  }

  return (
    <div className="container-fluid bg-white">
          <div id="restaurant-container">
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
                placeholder="Nome do restaurante..."
                value={name}
                onChange={e => setName(e.target.value.toUpperCase())}
              />
              <input
                placeholder="Endereço..."
                value={addressName}
                onChange={e => setAddressName(e.target.value.toUpperCase())}
              />
              <input
                placeholder="Número..."
                value={addressNumber}
                onChange={e => setAddressNumber(e.target.value.toUpperCase())}
              />
              <input
                placeholder="Cidade..."
                value={addressCity}
                onChange={e => setAddressCity(e.target.value.toUpperCase())}
              />
              <InputMask
                mask="99.999-999"
                placeholder="CEP..."
                value={addressCep}
                onChange={e => setAddressCep(e.value)}
              />
              <button type="submit">{label}</button>

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
  );
};
