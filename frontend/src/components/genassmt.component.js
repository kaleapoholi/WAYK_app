import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from 'reactstrap';

import { Form, Field } from 'react-final-form';
import { Switch, Route, Link } from "react-router-dom";
import Styles from '../styles/Styles';
import GADataService from "../services/genassmt.service";
import LesionDataService from "../services/lesion.service";
import ExamDataService from "../services/exam.service";
import Profile from "./profile.component";
import Lesion from "./lesion.component";

export default class GAForm extends Component {
  constructor(props) {
    super(props);
    this.saveGA = this.saveGA.bind(this);
    this.retrieveGA = this.retrieveGA.bind(this);
    this.retrieveLesionByGAid = this.retrieveLesionByGAid.bind(this);
    this.retrieveStateExam = this.retrieveStateExam.bind(this);


    this.state = {
      currentexam: this.props.location.state.exam,
      currentuser: this.props.location.state.user,
      currentexamstate: "",
      retrieved: false,
      lesions: [],
      currentGA: {
        id: null,
        quality: "",
        generalstate: "",
        bonestate: "Normal",
        cartstate: "Normal",
        menstate: "Normal",
        ligstate: "Normal",
        state: false,
        laterality: "",
        effusion: "Inexistant",
        examId: null,
        userId: null

      }

    };
  }

  componentDidMount() {
    console.log("props", this.props.location.state.exam.user_exams.userId);
    this.retrieveGA();
    this.retrieveStateExam();

  }

  retrieveStateExam() {
    ExamDataService.findOne(this.props.location.state.exam.id)
      .then(response => {
        this.setState({
          currentexamstate: response.data.state
        });
        console.log(response.data.state);

      })
      .catch(e => {
        console.log(e);
      });

  }

  retrieveLesionByGAid() {
    LesionDataService.findByGA(this.state.currentGA.id)
      .then(response => {
        this.setState({
          lesions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveGA() {
    GADataService.findGAbyExamUserID(this.props.location.state.exam.id, this.props.location.state.user.id)
      .then(response => {
        if (response.data[0] !== undefined) {
          this.setState({
            retrieved: true
          });

        };
        console.log(this.state.retrieved);
        if (this.state.retrieved === true) {
          this.setState({
            currentGA: {
              id: response.data[0].id,
              quality: response.data[0].quality,
              generalstate: response.data[0].generalstate,
              bonestate: response.data[0].bonestate,
              cartstate: response.data[0].cartstate,
              menstate: response.data[0].menstate,
              ligstate: response.data[0].ligstate,
              state: response.data[0].state,
              laterality: response.data[0].laterality,
              effusion: response.data[0].effusion,
              examId: response.data[0].examId,
              userId: response.data[0].userId
            }
          });
          this.retrieveLesionByGAid(this.state.currentGA.id);
          console.log(this.state.lesions);


        };
      })
      .catch(e => {
        console.log(e);
      });
  }

  saveGA(values) {
    var data = {
      quality: values.quality,
      generalstate: values.generalstate,
      bonestate: values.bonestate,
      cartstate: values.cartstate,
      menstate: values.menstate,
      ligstate: values.ligstate,
      state: true,
      laterality: values.laterality,
      effusion: values.effusion,
      examId: this.props.location.state.exam.id,
      userId: this.props.location.state.user.id
    }

    console.log("saving GA");
    console.log(data);

    GADataService.create(data, this.props.location.state.exam.id, this.props.location.state.user.id )
      .then(response => {
        this.setState({
          id: response.data.id,
          quality: response.data.quality,
          generalstate: response.data.generalstate,
          bonestate: response.data.bonestate,
          cartstate: response.data.cartstate,
          menstate: response.data.menstate,
          ligstate: response.data.ligstate,
          state: true,
          laterality: response.data.laterality,
          effusion: response.data.effusion,
          examId: response.data.examId,
          userId: response.data.userId,

          submitted: true

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {

    const { retrieved, lesions, currentexam, currentuser, currentexamstate, currentGA } = this.state;

    const Condition = ({ when, is, children }) => (
      <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
      </Field>
    )

    const onSubmit = values => {
      window.alert(JSON.stringify(values, 0, 2));
      this.saveGA(values);
      window.location = '/profile';
    }

    return (
      <Styles>
        <div className="container">
          <div>
            <h3>{currentexam.dirname} par {currentuser.username}</h3>
          </div>

          {retrieved === true ? (
            <div>

              <h4>Informations générales de l'examen</h4>

              <div>
                <label>
                  <strong>Qualité :</strong>

                </label>{" "}
                {currentGA.quality}
              </div>

              <div>
                <label>
                  <strong>Latéralité :</strong>

                </label>{" "}
                {currentGA.laterality}
              </div>

              <div>
                <label>
                  <strong>Présence d'Épanchement :</strong>

                </label>{" "}
                {currentGA.effusion}
              </div>

              <div>
                <label>
                  <strong>État général :</strong>

                </label>{" "}
                {currentGA.generalstate}

              </div>
              <div>
                <label>
                  <strong>État des structures osseuses :</strong>

                </label>{" "}
                {currentGA.bonestate}
                {currentGA.bonestate !== "Normal" && currentexamstate !== "LU" && (
                  <div className="buttons">
                    <Link to={{ pathname: `/addlesion/${currentGA.id}`, state: { currentGAinfo: { exam: currentexam, user: currentuser, gaID: currentGA.id, structure: "bonestate" } } }} className="nav-link">
                      <button>
                        Ajouter une lésion
                    </button>
                    </Link>

                  </div>
                )}
              </div>
              <div>
                <label>
                  <strong>État des structures cartilagineuses :</strong>

                </label>{" "}
                {currentGA.cartstate}
                {currentGA.cartstate !== "Normal" && currentexamstate !== "LU" && (
                  <div className="buttons">
                    <Link to={{ pathname: `/addlesion/${currentGA.id}`, state: { currentGAinfo: { exam: currentexam, user: currentuser,gaID: currentGA.id, structure: "cartstate" } } }} className="nav-link">
                      <button>
                        Ajouter une lésion
                    </button>
                    </Link>

                  </div>
                )}
              </div>
              <div>
                <label>
                  <strong>État des structures méniscales :</strong>

                </label>{" "}
                {currentGA.menstate}
                {currentGA.menstate !== "Normal" && currentexamstate !== "LU" && (
                  <div className="buttons">
                    <Link to={{ pathname: `/addlesion/${currentGA.id}`, state: { currentGAinfo: { exam: currentexam, user: currentuser,gaID: currentGA.id, structure: "menstate" } } }} className="nav-link">
                      <button>
                        Ajouter une lésion
                    </button>
                    </Link>

                  </div>
                )}
              </div>
              <div>
                <label>
                  <strong>État des structures ligamentaires :</strong>

                </label>{" "}
                {currentGA.ligstate}
                {currentGA.ligstate !== "Normal" && currentexamstate !== "LU" && (
                  <div className="buttons">
                    <Link to={{ pathname: `/addlesion/${currentGA.id}`, state: { currentGAinfo: { exam: currentexam, user: currentuser,gaID: currentGA.id, structure: "ligstate" } } }} className="nav-link">
                      <button>
                        Ajouter une lésion
                    </button>
                    </Link>

                  </div>
                )}
              </div>


              <div className="list row">
                <div className="col-md-6">


                  <h4>Liste de lésions</h4>

                  <ul className="list-group">
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Structure</th>
                          <th>Type</th>
                          <th>Label</th>
                          <th>Label Brush</th>
                          <th>Localisation</th>
                          <th>Région</th>
                          <th>Position</th>
                          <th>Visibilité coupe axiale</th>
                          <th>Visibilité coupe sagittale</th>
                          <th>Visibilité coupe coronale</th>
                        </tr>
                      </thead>
                      <tbody>

                        {lesions &&
                          lesions.map((lesion, index) => (

                            <tr>
                              <th>{lesion.id}</th>
                              <td>{lesion.structure}</td>
                              <td>{lesion.type}</td>
                              <td>{lesion.label}</td>
                              <th>{index + 1}</th>
                              <td>{lesion.localisation}</td>
                              <td>{lesion.region}</td>
                              <td>{lesion.position}</td>
                              <td>{lesion.axialvis}</td>
                              <td>{lesion.sagittalvis}</td>
                              <td>{lesion.coronalvis}</td>

                            </tr>

                          ))}


                      </tbody>
                    </Table>

                  </ul>



                </div>
              </div>

              <div className="buttons">
                <Link to={"/profile"} className="nav-link">
                  <button>
                    Retour
                </button>
                </Link>

              </div>

            </div>



          ) : (

              <Form
                onSubmit={onSubmit}
                initialValues={currentGA}

              >
                {({ handleSubmit, form, submitting, values }) => (
                  <form onSubmit={handleSubmit}>

                    <div>
                      <label>Qualité</label>
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
                      <label>Latéralité</label>
                      <div>
                        <label>
                          <Field
                            name="laterality"
                            component="input"
                            type="radio"
                            value="Gauche"
                          />{' '}
                    Gauche
                  </label>
                        <label>
                          <Field
                            name="laterality"
                            component="input"
                            type="radio"
                            value="Droite"
                          />{' '}
                    Droite
                  </label>
                      </div>
                    </div>

                    <div>
                      <label>Épanchement</label>
                      <div>
                        <label>
                          <Field
                            name="effusion"
                            component="input"
                            type="radio"
                            value="Inexistant"
                          />{' '}
                        Inexistant
                      </label>

                        <label>
                          <Field
                            name="effusion"
                            component="input"
                            type="radio"
                            value="Faible"
                          />{' '}
                        Faible
                      </label>

                        <label>
                          <Field
                            name="effusion"
                            component="input"
                            type="radio"
                            value="Moyen"
                          />{' '}
                        Moyen
                      </label>

                        <label>
                          <Field
                            name="effusion"
                            component="input"
                            type="radio"
                            value="Important"
                          />{' '}
                        Important
                      </label>
                      </div>
                    </div>



                    <div>
                      <label>État général</label>
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
                      <label>État des structures ligamentaires</label>
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

                      <label>État des structures osseuses</label>
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

                      <label>État des structures cartilagineuses</label>
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

                      <label>État des structures méniscales</label>
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
                        Soumettre
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
              <Route path={`/addlesion/${currentGA.id}`} component={Lesion} />
            </Switch>
          </div>
        </div>
      </Styles>
    )
  }









}
