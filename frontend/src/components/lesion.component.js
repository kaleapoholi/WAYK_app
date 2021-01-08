import React, { Component } from "react";
import { Form, Field} from 'react-final-form';
import { Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from '../styles/Styles';
import GA from "./genassmt.component";
import LesionDataService from "../services/lesion.service";

export default class LesionForm extends Component {
  constructor(props) {
    super(props);
    this.saveLesion = this.saveLesion.bind(this);
    //this.retrieveLesionStructure = this.retrieveLesionStructure.bind(this);

    this.state = {
      currentgaID : this.props.location.state.currentGAinfo.gaID,
      currentexamID : this.props.location.state.currentGAinfo.examID,
      currentStructure : this.props.location.state.currentGAinfo.structure,
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

        gaID : null,

      }
        
    };
  }

  componentDidMount() {
    console.log(this.state);
    
  }


  saveLesion(values){
      var data = {
        structure: this.state.currentStructure,
        type: values.type,
        complexity:values.complexity,
        migration: values.migration,
        orientation : values.orientation,
        caracterisation : values.caracterisation,
        depth : values.depth,
        localisation : values.localisation,
        region : values.region,
        position : values.position,
        comment : values.comment,
        label : values.label,
        description : values.description,
        axialvis : values.axialvis,
        coronalvis : values.coronalvis,
        sagittalvis : values.sagittalvis,

        gaID : this.props.location.state.currentGAinfo.gaID,
      }

      console.log("saving GA");
      console.log(data);

      LesionDataService.create(data, this.props.location.state.currentGAinfo.gaID)
      .then(response => {
          this.setState({
            id : response.data.id,
            structure: response.data.structure,
            type: response.data.type,
            complexity:response.data.complexity,
            migration: response.data.migration,
            orientation : response.data.orientation,
            caracterisation : response.data.caracterisation,
            depth : response.data.depth,
            localisation : response.data.localisation,
            region : response.data.region,
            position : response.data.position,
            comment : response.data.comment,
            label : response.data.label,
            description : response.data.description,
            axialvis : response.data.axialvis,
            coronalvis : response.data.coronalvis,
            sagittalvis : response.data.sagittalvis,

            gaID : response.data.gaID,

          });
          console.log(response.data);
      })
      .catch(e => {
          console.log(e);
      });
  }
 

  render() {

    //const {currentgaID, currentStructure, currentGA} = this.state;
    const {currentexamID,  currentStructure, currentLesion} = this.state;

    const Condition = ({ when, is, children }) => (
      <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
      </Field>
    )

    const onSubmit = values => {
      window.alert(JSON.stringify(values, 0, 2));
      this.saveLesion(values);
      
      //window.location=`/GA/${currentexamID}`;
    }

    const bonetypes=["Fissure", "Fracture", "Contusion", "Tumeur", "Nécrose", "Dysplasie"];
    const bonecartlocalisation=["Tibia", "Fémur", "Patella", "Fibula"]
    const tibiaregion=["Plateau","Massif Epine Tibiale"];
    const tibiaposition=["Insertion LCA", "Insertion LCP"];
    const femurregion=["Condyle Latéral", "Condyle Médial", "Trochlée"];
    //const bonelabel=["OS_FIS","OS_FRA","OS_CON","OS_TUM", "OS_NEC", "OS_DYS"]
   

    return (
      <Styles>
      <div className="container">
        <Form
          onSubmit={onSubmit}
          initialValues={currentLesion}
          
          >
          {({ handleSubmit, form, submitting, values }) => (
            <form onSubmit={handleSubmit}>            
              
              {currentStructure==="bonestate" &&
              <div>
              <label>Lésion OS </label>{'   '}
            
              <label>Type de lésion</label>
              <div>
                <label>
                  <Field name="type" component="select" type="radio">
                    {bonetypes.map((type)=> ( <option value={type}>{type}</option>))}
                  </Field>
                </label>{' '}

                <label>Localisation </label>{' '}

                <label>
                  <Field name="localisation" component="select" type="radio" >
                    {bonecartlocalisation.map((type)=> (<option value={type}>{type}</option>))} 
                  </Field>
                </label>
                <Condition when="localisation" is="Tibia">
                <Field name="region" component="select" type="radio">
                    {tibiaregion.map((type)=> (<option value={type}>{type}</option>))}
                    
                  </Field>

                </Condition>
                <Condition when="region" is="Massif Epine Tibiale">
                <Field name="position" component="select" type="radio">
                    {tibiaposition.map((type)=> (<option value={type}>{type}</option>))}
                    
                  </Field>

                </Condition>
                <Condition when="localisation" is="Fémur">
                <Field name="region" component="select" type="radio">
                    {femurregion.map((type)=> (<option value={type}>{type}</option>))}
                    
                  </Field>

                </Condition>
                

                
              </div>
            </div>


              }
                
              {currentStructure==="cartstate" &&
              <label>Cartilage</label>
              }
  
              {currentStructure==="ligstate" &&
              <label>Ligament</label>
              }

              {currentStructure==="menstate" &&
              <label>Menisque</label>
              }


              <label>Visible en série axiale</label>
                <label>
                    <Field
                      name="axialvis"
                      component="input"
                      type="radio"
                      value="Oui"
                    />{' '}
                    Oui
                  </label>
                  <label>
                    <Field
                      name="axialvis"
                      component="input"
                      type="radio"
                      value="Non"
                    />{' '}
                    Non
                  </label>

                  <label>Visible en série coronale</label>
                <label>
                    <Field
                      name="coronalvis"
                      component="input"
                      type="radio"
                      value="Oui"
                    />{' '}
                    Oui
                  </label>
                  <label>
                    <Field
                      name="coronalvis"
                      component="input"
                      type="radio"
                      value="Non"
                    />{' '}
                    Non
                  </label>
                  <label>Visible en série sagittale</label>
                <label>
                    <Field
                      name="sagittalvis"
                      component="input"
                      type="radio"
                      value="Oui"
                    />{' '}
                    Oui
                  </label>
                  <label>
                    <Field
                      name="sagittalvis"
                      component="input"
                      type="radio"
                      value="Non"
                    />{' '}
                    Non
                  </label>
              

              <label>
                Commentaire Optionnel:
                <Field name="comment" component="textarea" type="radio">
                    
                </Field>     
              </label>
                            
              <div className="buttons">
                
                <button type="submit" disabled={submitting}>
                  Submit
                </button>

                <Link to={{pathname:`/GA/${currentexamID}`, state: {examID: currentexamID} }} className="nav-link"> 
                <button>
                Retour au GA
                    </button>
                 </Link>
    

                
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
          </Form>
        
        
    

      <div>
    
      </div>

      <div className="container mt-3">
          <Switch>
            <Route path={`/GA/${currentexamID}`} component={GA}/>
          </Switch>
        </div>
      </div>
      </Styles>
               
    
  
    

    )}
}
