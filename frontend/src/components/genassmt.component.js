import React, { Component } from "react";
import { Form, Field } from 'react-final-form';
import { Switch, Route, Link } from "react-router-dom";
import Styles from '../styles/Styles';
import GADataService from "../services/genassmt.service";
import Profile from "./profile.component";
import Lesion from "./lesion.component";

export default class GAForm extends Component {
  constructor(props) {
    super(props);
    this.saveGA = this.saveGA.bind(this);
    this.retrieveGA = this.retrieveGA.bind(this);

    this.state = {
      currentexamid : this.props.location.state.examID,
      retrieved : false,
      currentGA:{
        id : null,
        quality : "",
        generalstate : "",
        bonestate : "Normal",
        cartstate : "Normal",
        menstate : "Normal",
        ligstate : "Normal",
        state : false,
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

    const {retrieved, currentexamid, currentGA} = this.state;

    const Condition = ({ when, is, children }) => (
      <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
      </Field>
    )

    const onSubmit = values => {
      window.alert(JSON.stringify(values, 0, 2));
      this.saveGA(values);
      window.location='/profile';
    }

    return (
      <Styles>
      <div className="container">
        
        {retrieved===true ? (
            <div>

              <h4>General Assessment</h4>
            
            <div>
              <label>
                <strong>quality :</strong>
                
              </label>{" "}
              {currentGA.quality}
            </div>
            <div>
              <label>
              <strong>generalstate :</strong>
                
              </label>{" "}
              {currentGA.generalstate}
              
            </div>
            <div>
              <label>
              <strong>bonestate :</strong>
                
              </label>{" "}
              {currentGA.bonestate}
              {currentGA.bonestate!=="Normal" && (
                <div className="buttons">
                <Link to={{pathname:`/addlesion/${currentGA.id}`, state: {currentGAinfo : {examID: currentexamid, gaID: currentGA.id, structure : "bonestate"}} }} className="nav-link"> 
                <button>
                Add Lesion
                    </button>
                 </Link>
    
                </div>
              )}
            </div>
            <div>
              <label>
              <strong>cartstate :</strong>
                
              </label>{" "}
              {currentGA.cartstate}
              {currentGA.cartstate!=="Normal" && (
                <div className="buttons">
                <Link to={{pathname:`/addlesion/${currentGA.id}`, state: {currentGAinfo : {examID: currentexamid, gaID: currentGA.id, structure : "cartstate"}} }} className="nav-link"> 
                <button>
                Add Lesion
                    </button>
                 </Link>
    
                </div>
              )}
            </div>
            <div>
              <label>
              <strong>menstate :</strong>
                
              </label>{" "}
              {currentGA.menstate}
              {currentGA.menstate!=="Normal" && (
                <div className="buttons">
                <Link to={{pathname:`/addlesion/${currentGA.id}`, state: {currentGAinfo : {examID: currentexamid, gaID: currentGA.id, structure : "menstate"}} }} className="nav-link"> 
                <button>
                Add Lesion
                    </button>
                 </Link>
    
                </div>
              )}
            </div>
            <div>
              <label>               
                <strong>ligstate :</strong>
                
              </label>{" "}
              {currentGA.ligstate}
              {currentGA.ligstate!=="Normal" && (
                <div className="buttons">
                <Link to={{pathname:`/addlesion/${currentGA.id}`, state: {currentGAinfo : {examID: currentexamid, gaID: currentGA.id, structure : "ligstate"}} }} className="nav-link"> 
                <button>
                Add Lesion
                    </button>
                 </Link>
    
                </div>
              )}
            </div>   
            

            
            <div className="buttons">
            <Link to={"/profile"} className="nav-link"> 
            <button>
            Retour
                </button>
             </Link>

            </div>
            
            </div>  



        ):( 
          
          <Form
          onSubmit={onSubmit}
          initialValues={currentGA}
          
          >
          {({ handleSubmit, form, submitting, values }) => (
            <form onSubmit={handleSubmit}>

              <div>
                <label>Quality</label>
                <div>
                  <label>
                    <Field
                      name="quality"
                      component="input"
                      type="radio"
                      value="Normal"
                    />{' '}
                    Normal
                  </label>
                  <label>
                    <Field
                      name="quality"
                      component="input"
                      type="radio"
                      value="Artefact"
                    />{' '}
                    Artefact
                  </label>
                </div>
              </div>

              <div>
                <label>GenState</label>
                <div>
                  <label>
                    <Field
                      name="generalstate"
                      component="input"
                      type="radio"
                      value="Normal"
                    />{' '}
                    Normal
                  </label>
                  <label>
                    <Field
                      name="generalstate"
                      component="input"
                      type="radio"
                      value="Pathologique"
                    />{' '}
                    Pathologique
                  </label>
                </div>
              </div>
              <Condition when="generalstate" is="Pathologique">
              <label>LigState</label>
                <div>
                <label>
                    <Field
                      name="ligstate"
                      component="input"
                      type="radio"
                      value="Normal"
                    />{' '}
                    Normal
                  </label>
                  <label>
                    <Field
                      name="ligstate"
                      component="input"
                      type="radio"
                      value="Pathologique"
                    />{' '}
                    Pathologique
                  </label>
                </div>

                <label>BoneState</label>
                <div>
                <label>
                    <Field
                      name="bonestate"
                      component="input"
                      type="radio"
                      value="Normal"
                    />{' '}
                    Normal
                  </label>
                  <label>
                    <Field
                      name="bonestate"
                      component="input"
                      type="radio"
                      value="Pathologique"
                    />{' '}
                    Pathologique
                  </label>
                </div>

                <label>CartState</label>
                <div>
                <label>
                    <Field
                      name="cartstate"
                      component="input"
                      type="radio"
                      value="Normal"
                    />{' '}
                    Normal
                  </label>
                  <label>
                    <Field
                      name="cartstate"
                      component="input"
                      type="radio"
                      value="Pathologique"
                    />{' '}
                    Pathologique
                  </label>
                </div>

                <label>MenState</label>
                <div>
                <label>
                    <Field
                      name="menstate"
                      component="input"
                      type="radio"
                      value="Normal"
                    />{' '}
                    Normal
                  </label>
                  <label>
                    <Field
                      name="menstate"
                      component="input"
                      type="radio"
                      value="Pathologique"
                    />{' '}
                    Pathologique
                  </label>
                </div>
              </Condition>
              
              <div className="buttons">
                
                <button type="submit" disabled={submitting}>
                  Submit
                </button>

                
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
          </Form>
        
        
            
        )}

      <div>
    
      </div>

      <div className="container mt-3">
          <Switch>
            <Route path={'/profile'} component={Profile} />
            <Route path={`/addlesion/${currentGA.id}`} component={Lesion}/>
          </Switch>
        </div>
      </div>
      </Styles>
    )
          }

         

  

      
      


}
