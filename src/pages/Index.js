import React, { useState, useEffect } from "react";
import { Container, Button, Link } from "react-floating-action-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faPowerOff, faPlus } from "@fortawesome/free-solid-svg-icons";
import Seek from "./seek/Seek";
import api from "../services/api";

import "./Index.css";

export default ({ history }) => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    setLista([...api]);
  }, []);

  return (
    <>
      <div className="container-fluid" id="app">
        <div className="row">
          {lista.map((pedido, index) => (
            <Seek key={index} {...pedido} />
          ))}
        </div>
      </div>

      <Container className="containerFloat">
        <Link href="#" tooltip="Add user link" icon="fas fa-user-plus">
          <FontAwesomeIcon color="#fff" icon={faPowerOff} />
        </Link>
        <Link href="#" tooltip="Add user link" icon="fas fa-user-plus">
          <FontAwesomeIcon color="#fff" icon={faReply} />
        </Link>
        <Button
          className="fab-item btn btn-link btn-lg text-white"
          tooltip="The big plus button!"
          icon="fas fa-plus"
          rotate={true}
          onClick={() => {}}
        >
          <FontAwesomeIcon color="#fff" icon={faPlus} />
        </Button>
      </Container>
    </>
  );
};
