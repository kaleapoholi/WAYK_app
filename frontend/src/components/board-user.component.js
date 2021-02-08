import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Étape 1 : Sélection des examens</h3>
          <div>Quels critères de sélection ?</div>
          <h3>Étape 2 : Transférer un examen du PACS au serveur</h3>
          <div>
            <label>
              Clic droit puis Imprimer
            </label>
            <label>
              Imprimer et exporter
            </label>
            <label>
              Onglet Trasnfert Dicom
            </label>
            <label>
              Choisir la destination : OAI SAMBA
            </label>
            <label>
              Transfert Dicom et Fermer
            </label>
          </div>
          <h3>Étape 3 : Collecter les données de classification</h3>
          <h3>Étape 4 : Annoter un Examen</h3>
          <h4>Annexe: Guide d'annotation</h4>




        </header>
      </div>
    );
  }
}
