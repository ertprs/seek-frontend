// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { useSnackbar } from 'notistack'
import Constants from "../../../constants/Constants"
import typeMessage from "../../../constants/typeMessage"

import { api } from '../../../services/api'

import camera from "../../../assets/camera.svg"

import "./User.css"

const typeUser = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT'
}

export default ({ history, location }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [item, setItem] = useState({})
  const [listUsers, setListUsers] = useState([])
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [surname,setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [label, setLabel] = useState('')

  const { user } = location.state;

  useEffect(() => {
    indexUsers()
    setLabel(Constants.CADASTRAR)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const indexUsers = async () => {
    try {
      const { data } = await api.get('/user')
      setListUsers([...data])
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
      const valid = isFieldsEmpty(image, name, surname, email)
      if(valid) {
        const dataUser = new FormData()
        dataUser.append('image', image)
        dataUser.append('email', email)
        dataUser.append('username', `${name.toLowerCase()}_${surname.toLowerCase()}`)
        dataUser.append('password', generateRandomPassword())
        dataUser.append('name', name)
        dataUser.append('surname', surname)
        dataUser.append('typeUser', typeUser.ADMIN)
        const { status, data } = await api.post('/user', dataUser)

        if(status === 202)
          notificacoes(data.message, typeMessage.WARNING)
          
        // Os produtos serão atualizados atravéz de socket.io
        // A busca no banco através do método abaixo é somente
        // durante o desenvolvimento para teste
        if(status === 200) {
          notificacoes('Registro salvo com sucesso!', typeMessage.SUCCESS)
          indexUsers()
          setLabel(Constants.CADASTRAR)
          newUser()
        }
      }
    } catch(error) {
      errorMessage(error)
    }
  }

  async function onUpdate() {
    try{
      const valid = isFieldsEmpty(image, name, surname, email)
      if(valid) {
        const dataUser = new FormData()
        dataUser.append('image', image)
        dataUser.append('email', email)
        dataUser.append('name', name)
        dataUser.append('surname', surname)
        dataUser.append('username', item.username)
        dataUser.append('typeUser', typeUser.ADMIN)

        const { status, data } = await api.put(`/user/${item._id}`, dataUser)

        if(status === 202) {
          console.log(data.message)
          notificacoes(data.message, typeMessage.WARNING)
        }
          
        // Os produtos serão atualizados atravéz de socket.io
        // A busca no banco através do método abaixo é somente
        // durante o desenvolvimento para teste
        if(status === 200) {
          notificacoes('Registro salvo com sucesso!', typeMessage.SUCCESS)
          indexUsers()
          setLabel(Constants.CADASTRAR)
          newUser()
        }
      }
    } catch(error) {
      errorMessage(error)
    }
  }

  const onDelete = async () => {
    try {
      if(!item._id) 
        notificacoes('O usuário não foi identificado!', typeMessage.WARNING)

      const { status, data } = await api.delete(`/user/${item._id}`)

      if(status === 202) 
        notificacoes(data.message, typeMessage.ERROR)

      if(status === 200)
        notificacoes(data.message, typeMessage.SUCCESS)

      newUser()
      indexUsers()
      setLabel(Constants.CADASTRAR)
    } catch(error) {
      errorMessage(error)
    }
  }

  const isFieldsEmpty = (image, name, surname, email) => {
    if(!image || !name || !surname || !email) {
      notificacoes('Todos os campos devem ser preenchidos!', typeMessage.WARNING)
      return false
    }

    return true
  }

  const handleClickUser = item => {
    setItem({...item})
    setImage(item.image_url)
    setName(item.name)
    setSurname(item.surname)
    setEmail(item.email)
    setLabel(Constants.SALVAR)
  }

  const newUser = () => {
    setImage(null)
    setName('')
    setSurname('')
    setEmail('')
    setLabel(Constants.CADASTRAR)
  }

  const errorMessage = (error) => {
    console.log(error)
    notificacoes('Falha na requisição!', typeMessage.ERROR)
  }

  const generateRandomPassword = () => {
    var randomized = Math.ceil(Math.random() * Math.pow(10, 8));
    var digito = Math.ceil(Math.log(randomized));
    while (digito > 10) {
      digito = Math.ceil(Math.log(digito));
    }

    return randomized;
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div id="user-container">
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
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value.toUpperCase())}
              />
              <input
                placeholder="Sobrenome"
                value={surname}
                onChange={e => setSurname(e.target.value.toUpperCase())}
              />
              <input
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                    onClick={() => newUser()}
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
          <h1 className="title-products">Usuários cadastrados</h1>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Foto</th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                </tr>
              </thead>
              <tbody>
                {listUsers.map((item, index) => (
                  <tr
                    className="product-item"
                    key={index}
                    onClick={() => handleClickUser(item)}
                  >
                    <td className="align-middle">
                      <img
                        style={{ width: 40, height: "auto", borderRadius: 20 }}
                        src={item.image_url}
                        alt={`${item.name} ${item.surname}`}
                      />
                    </td>
                    <td className="align-middle">{`${item.name} ${item.surname}`}</td>
                    <td className="align-middle">{item.email}</td>
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
