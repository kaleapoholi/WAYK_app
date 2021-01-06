import React, { Component } from "react";
import { Form, Field } from 'react-final-form';
import { Switch, Route, Link } from "react-router-dom";
import Styles from '../styles/Styles';
import GADataService from "../services/genassmt.service";
import LesionDataService from "../services/lesion.service";
import Profile from "./profile.component";

export default class LesionForm extends Component {
  constructor(props) {
    super(props);
    this.saveLesion = this.saveLesion.bind(this);
    this.retrieveLesion = this.retrieveLesion.bind(this);

    this.state = {
      currentgaID : this.props.location.state.gaID,
      retrieved : false,
      currentLesion:{
        id : null,
        structure: "",
        type: "",
        complexity:"",
        migration: "",
        orientation : "",
        caracterisation : "",
        depth : "",
        localisation : "",
        region : "",
        position : "",
        comment : "",
        label : "",
        description : "",
        axialvis : "",
        coronalvis : "",
        sagittalvis : "",

        examID : null,

      }
        
    };
  }

  componentDidMount() {
    console.log(this.state);
    this.retrieveGA();
    
  }


  retrieveGA() {
    GADataService.findGAbyExamID(this.state.currentexamid)
      .then(response => {
        if (response.data[0] !== undefined){
          this.setState({
            retrieved: true
          });

        };
        console.log(this.state.retrieved);
        if (this.state.retrieved ===true){
          this.setState({
            currentGA: {
              id : response.data[0].id,
              quality : response.data[0].quality,
              generalstate : response.data[0].generalstate,
              bonestate : response.data[0].bonestate,
              cartstate : response.data[0].cartstate,
              menstate : response.data[0].menstate,
              ligstate : response.data[0].ligstate,
              state : response.data[0].state,
              examID : response.data[0].examID
            }
          });
        };
      })
      .catch(e => {
        console.log(e);
      });
  }

  saveGA(values){
      var data = {
        quality : values.quality,
        generalstate : values.generalstate,
        bonestate : values.bonestate,
        cartstate : values.cartstate,
        menstate : values.menstate,
        ligstate : values.ligstate,
        state : true,
        examID : this.props.location.state.examID
      }

      console.log("saving GA");
      console.log(data);

      GADataService.create(data, this.props.location.state.examID)
      .then(response => {
          this.setState({
            id : response.data.id,
            quality : response.data.quality,
            generalstate : response.data.generalstate,
            bonestate : response.data.bonestate,
            cartstate : response.data.cartstate,
            menstate : response.data.menstate,
            ligstate : response.data.ligstate,
            state : true,
            examID : response.data.examID,
      
            submitted : true

          });
          console.log(response.data);
      })
      .catch(e => {
          console.log(e);
      });
  }
 

  render() {


    }

         

  

      
      


}
