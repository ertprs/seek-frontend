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
                    placeholder="Placeholder..."
                    // value={company}
                    // onChange={e => setCompany(e.target.value)}
                />
                <input 
                    placeholder="Placeholder..."
                    // value={price}
                    // onChange={e => setPrice(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
                <button type="button" onClick={() => history.push('/dash')}>Voltar</button>
            </form>
        </div>
    );
}