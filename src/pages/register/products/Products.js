import React, { useState, useMemo } from 'react';

import camera from '../../../assets/camera.svg';

import './Products.css';

export default ({ history }) => {
  const [image, setImage] = useState(null);

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]
  );
  
  async function handleSubmit(e) {
    e.preventDefault();
  }

    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <div className="products-container">
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
                            />
                            <input 
                                placeholder="Placeholder..."
                            />
                            <input 
                                placeholder="Placeholder..."
                            />
                            <input 
                                placeholder="Placeholder..."
                            />
                            <button type="submit">Cadastrar</button>
                            <button type="button" onClick={() => history.push('/dash')}>Voltar</button>
                        </form>
                    </div>

                </div>
                <div className="col-md-8">

                </div>
            </div>
        </div>
    );
}