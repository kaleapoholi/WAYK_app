import React, { Component } from "react";
import { Form, Field } from 'react-final-form';
import { Switch, Route, Link } from "react-router-dom";
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
      currentgaID: this.props.location.state.currentGAinfo.gaID,
      currentexamID: this.props.location.state.currentGAinfo.exam.id,
      currentStructure: this.props.location.state.currentGAinfo.structure,
      currentexam: this.props.location.state.currentGAinfo.exam,
      currentuser: this.props.location.state.currentGAinfo.user,
      retrieved: false,
      currentLesion: {
        id: null,
        structure: "",
        type: "",
        complexity: "",
        migration: "",
        orientation: "",
        caracterisation: "",
        depth: "",
        localisation: "",
        region: "",
        position: "",
        comment: "",
        label: "",
        description: [],
        axialvis: "",
        coronalvis: "",
        sagittalvis: "",

        gaID: null,

      },

    };
  }

  componentDidMount() {
    console.log(this.state);

  }


  saveLesion(values) {
    var data = {
      structure: this.state.currentStructure,
      type: values.type,
      complexity: values.complexity,
      migration: values.migration,
      orientation: values.orientation,
      caracterisation: values.caracterisation,
      depth: values.depth,
      localisation: values.localisation,
      region: values.region,
      position: values.position,
      comment: values.comment,
      label: values.label,
      description: values.description.join(),
      axialvis: values.axialvis,
      coronalvis: values.coronalvis,
      sagittalvis: values.sagittalvis,

      gaID: this.props.location.state.currentGAinfo.gaID,
    }

    console.log("saving GA");
    console.log(data);

    LesionDataService.create(data, this.props.location.state.currentGAinfo.gaID)
      .then(response => {
        this.setState({
          id: response.data.id,
          structure: response.data.structure,
          type: response.data.type,
          complexity: response.data.complexity,
          migration: response.data.migration,
          orientation: response.data.orientation,
          caracterisation: response.data.caracterisation,
          depth: response.data.depth,
          localisation: response.data.localisation,
          region: response.data.region,
          position: response.data.position,
          comment: response.data.comment,
          label: response.data.label,
          description: response.data.description,
          axialvis: response.data.axialvis,
          coronalvis: response.data.coronalvis,
          sagittalvis: response.data.sagittalvis,

          gaID: response.data.gaID,

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {

    //const {currentgaID, currentStructure, currentGA} = this.state;
    const { currentexam, currentuser, currentexamID, currentStructure, currentLesion } = this.state;

    const Condition = ({ when, is, children }) => (
      <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
      </Field>
    )

    const onSubmit = values => {
      window.alert(JSON.stringify({"message" : "Lésion enregistrée.", "instruction": "Saisir une autre lésion ou Retour au GA pour saisir une autre articulation"}, 0, 2));
      this.saveLesion(values);
    }



    const bonetypes = { "Fissure": "OS_FIS", "Fracture": "OS_FRA", "Contusion/ Œdème": "OS_CON", "Tumeur": "OS_TUM", "Nécrose": "OS_NEC", "Dysplasie": "OS_DYS", "Kyste" : "OS_KYS" };
    const bonecartlocalisation = ["Tibia", "Fémur", "Patella", "Fibula"]
    const tibiaregion = ["Plateau", "Massif Epine Tibiale"];
    const tibiaposition = ["Insertion LCA", "Insertion LCP"];
    const femurregion = ["Condyle", "Trochlée"];
    const patellaregion = ["Médial", "Latéral", "Crête"];


    const carttypes = { "Focal": "CA_FOC", "Diffus": "CA_DIF" };
    const cartcarac = ["Grade I à III", "Grade IV"];
    const position = ["Médial", "Latéral"];

    const ligtypes = { "Lésion": "", "Dégénératif": "LI_DEG", "Kyste": "LI_KYS", "Perte de Substance": "LI_PER" };
    const depth = ["Complète", "Partielle"];
    const ligcaract = ["Désorganisation", "Interruption Franche", "Désinsertion", "Distension", "Épaississement", "Anomalies de contour"];

    const liglocalisation = ["Croisé", "Collatéral", "Fémoro patellaire"];
    const ligcroiseregion = { "Antérieur": "LI_LCA", "Postérieur": "LI_LCP" };
    const ligcolregion = { "Médial": "LI_LCM", "Latéral": "LI_LCL" }
    const ligfemregion = { "Médial": "LI_LFM", "Latéral": "LI_LFL" }
    const ligposition = ["Distale", "Proximale", "Moyen"];
    const description = ["Horizontalisation de la partie distale", "Verticalisation de la partie proximale", "Bascule antérieure de la partie distale", "Mise en nourrice du LCA"];

    const mentypes = { "Lésion": "", "Dégénératif": "ME_DEG", "Kyste": "ME_KYS", "Perte de Substance": "ME_PER" };
    const menmigration = ["Déplacé", "Non Déplacé"];
    const menorientation = ["Verticale", "Horizontale"];
    const mencaracterisationsans = ["Anse de seau", "Fragment Libre", "Languette"];
    const mencaracterisationvert = ["Longitudinale", "Radiaire"];
    const menlocalisation = ["Médial", "Latéral"];
    const menregion = ["Racine", "Corps", "Corne"];
    const menposition = ["Antérieur", "Postérieur"];
    const menlabel = { "Anse de seau": "ME_ANS", "Fragment Libre": "ME_FRA", "Languette": "ME_LAN", "Longitudinale": "ME_LON", "Radiaire": "ME_RAD", "Horizontale": "ME_HOR"};

    return (
      <Styles>
        <div className="container">
          <Form
            onSubmit={onSubmit}
            initialValues={currentLesion}

          >
            {({ handleSubmit, form, submitting, values }) => (
              <form onSubmit={handleSubmit}>

                {currentStructure === "menstate" &&

                  <div>
                    <label>Lésion Ménisque</label>

                    <label>Type de lésion</label>

                    <div >
                      <label>
                        <Field name="type" component="select" type="radio">
                          <option value="type">Type</option>
                          {Object.keys(mentypes).map((type) => (
                            <option value={type} >{type}</option>
                          ))}
                        </Field>
                      </label>

                    </div>

                    <div className="container mt-3">

                      <Condition when="type" is={"Lésion"}>

                        <div >

                          <label>Complexité de la lésion </label>{' '}

                          <div>
                            <label>
                              <Field name="complexity" component="select" type="radio" >
                                <option value="complexity">Complexité</option>
                                <option value="Simple">Simple</option>
                                <option value="Complexe">Complexe</option>
                              </Field>
                            </label>
                          </div>

                          <Condition when="complexity" is={"Simple"}>

                            <label>Migration</label>
                            <label>
                              <Field name="migration" component="select" type="radio">
                                <option value="migration">Migration</option>
                                {menmigration.map((type) => (<option value={type}>{type}</option>))}
                              </Field>
                            </label>

                            <Condition when="migration" is={"Déplacé"}>

                              <label>Caractérisation</label>
                              <div>
                                <label>
                                  <Field name="caracterisation" component="select" type="radio">
                                    <option value="caracterisation">Caractérisation</option>
                                    {mencaracterisationsans.map((type) => (<option value={type}>{type}</option>))}
                                  </Field>
                                </label>
                              </div>

                            </Condition>

                            <Condition when="migration" is={"Non Déplacé"}>
                              <label>Orientation</label>
                              <label>
                                <Field name="orientation" component="select" type="radio">
                                  <option value="orientation">Orientation</option>
                                  {menorientation.map((type) => (<option value={type}>{type}</option>))}
                                </Field>
                              </label>

                              <Condition when="orientation" is={"Verticale"}>

                                <label>Caractérisation</label>
                                <label>
                                  <Field name="caracterisation" component="select" type="radio">
                                    <option value="caracterisation">Caractérisation</option>
                                    {mencaracterisationvert.map((type) => (<option value={type}>{type}</option>))}
                                  </Field>
                                </label>
                              </Condition>

                              <Condition when="orientation" is={"Horizontale"}>
                                <label>Caractérisation</label>
                                <label>
                                  <Field name="caracterisation" component="select" type="radio">
                                    <option value="caracterisation">Caractérisation</option>
                                    <option value="Horizontale">Horizontale</option>
                                  </Field>
                                </label>
                              </Condition>

                              <label>
                                <Field name="depth" component="select" type="radio" >
                                  <option value="depth">Profondeur</option>
                                  {depth.map((type) => (<option value={type}>{type}</option>))}
                                </Field>
                              </label>
                            </Condition>
                          </Condition>

                        </div>
                      </Condition>
                      <div>

                        <label>Localisation </label>{' '}

                        <label>
                          <Field name="localisation" component="select" type="radio" >
                            <option value="localisation">Localisation</option>
                            {menlocalisation.map((type) => (<option value={type}>{type}</option>))}
                          </Field>


                          <Field name="region" component="select" type="radio">
                            <option value="region">Région</option>
                            {menregion.map((type) => (<option value={type}>{type}</option>))}
                          </Field>
                        </label>

                        <Condition when="region" is="Racine">
                          <Field name="position" component="select" type="radio">
                            <option value="position">Position</option>
                            {menposition.map((type) => (<option value={type}>{type}</option>))}
                          </Field>

                        </Condition>
                        <Condition when="region" is="Corne">
                          <Field name="position" component="select" type="radio">
                            <option value="position">Position</option>
                            {menposition.map((type) => (<option value={type}>{type}</option>))}
                          </Field>
                        </Condition>

                      </div>




                      {values.type === "Lésion" ? (
                        values.label = menlabel[values.caracterisation]
                      ) : (
                        values.label = mentypes[values.type]
                      )
                      }

                    </div>


                  </div>


                }

                {currentStructure === "bonestate" &&
                  <div>
                    <label>Lésion OS </label>{'   '}

                    <label>Type de lésion</label>
                    <div>
                      <label>
                        <Field name="type" component="select" type="radio">
                          <option value="type">Type</option>
                          {Object.keys(bonetypes).map((type) => (
                            <option value={type}>{type}</option>
                          ))}
                        </Field>
                        {values.label = bonetypes[values.type]}
                      </label>{' '}

                      <label>Localisation </label>{' '}

                      <label>
                        <Field name="localisation" component="select" type="radio" >
                          <option value="localisation">Localisation</option>
                          {bonecartlocalisation.map((type) => (<option value={type}>{type}</option>))}
                        </Field>
                      </label>
                      <Condition when="localisation" is="Tibia">
                        <Field name="region" component="select" type="radio">
                          <option value="region">Région</option>
                          {tibiaregion.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>
                      <Condition when="region" is="Massif Epine Tibiale">
                        <Field name="position" component="select" type="radio">
                          <option value="position">Position</option>
                          {tibiaposition.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>
                      <Condition when="region" is="Plateau">
                        <Field name="position" component="select" type="radio">
                          <option value="position">Position</option>
                          {position.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>

                      <Condition when="localisation" is="Fémur">
                        <Field name="region" component="select" type="radio">
                          <option value="region">Région</option>
                          {femurregion.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>
                      <Condition when="region" is="Condyle">
                        <Field name="position" component="select" type="radio">
                          <option value="position">Position</option>
                          {position.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>
                      <Condition when="localisation" is="Patella">
                        <Field name="region" component="select" type="radio">
                          <option value="region">Région</option>
                          {patellaregion.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>




                    </div>
                  </div>


                }


                {currentStructure === "ligstate" &&


                  <div>

                    <label>Lésion Ligament </label>{'   '}

                    <label>Type de lésion</label>



                    <div className="custom-control custom-radio custom-control-inline">
                      <label>
                        <Field name="type" component="select" type="radio">
                          <option value="type">Type</option>
                          {Object.keys(ligtypes).map((type) => (
                            <option value={type}>{type}</option>
                          ))}
                        </Field>
                      </label>

                    </div>


                    <div className="container mt-3">



                      <div className="container mt-3">
                        <label>Localisation </label>{' '}

                        <label>
                          <Field name="localisation" component="select" type="radio" >
                            <option value="localisation">Localisation</option>
                            {liglocalisation.map((type) => (<option value={type}>{type}</option>))}
                          </Field>
                        </label>

                        <label>

                          <Condition when="localisation" is="Croisé">
                            <label>
                              <Field name="region" component="select" type="radio" >
                                <option value="region">Région</option>
                                {Object.keys(ligcroiseregion).map((type) => (<option value={type}>{type}</option>))}
                              </Field>
                            </label>
                          </Condition>

                        </label>

                        <Condition when="localisation" is="Collatéral">
                          <label>
                            <Field name="region" component="select" type="radio" >
                              <option value="region">Région</option>
                              {Object.keys(ligcolregion).map((type) => (<option value={type}>{type}</option>))}
                            </Field>
                          </label>


                        </Condition>
                        <Condition when="localisation" is="Fémoro patellaire">
                          <label>
                            <Field name="region" component="select" type="radio" >
                              <option value="region">Région</option>
                              {Object.keys(ligfemregion).map((type) => (<option value={type}>{type}</option>))}
                            </Field>
                          </label>


                        </Condition>

                      </div>

                      <Field name="position" component="select" type="radio">
                        <option value="position">Position</option>
                        {ligposition.map((type) => (
                          <option value={type}>{type}</option>
                        ))}
                      </Field>

                      <Condition when="type" is={"Lésion"}>
                        <Field name="caracterisation" component="select" type="radio">
                          <option value="caracterisation">Caractérisation</option>
                          {ligcaract.map((type) => (
                            <option value={type}>{type}</option>
                          ))}
                        </Field>

                        <Field name="depth" component="select" type="radio">
                          <option value="depth">Profondeur</option>
                          {depth.map((type) => (
                            <option value={type}>{type}</option>
                          ))}
                        </Field>

                        <div>
                          <label>description</label>
                          <div className="custom-control custom-radio custom-control-inline">
                            {description.map(function (type) {
                              return (
                                <div>
                                  <Field name="description" component="input" type="checkbox" value={type} />
                                  <label>{type}</label>
                                </div>)

                            }
                            )
                            }

                          </div>
                        </div>
                      </Condition>





                      {values.type === "Lésion" ? (
                        (() => {
                          if (values.localisation === "Croisé") {
                            return (
                              values.label = ligcroiseregion[values.region]
                            )
                          } else if (values.localisation === "Collatéral") {
                            return (
                              values.label = ligcolregion[values.region]
                            )
                          } else {
                            return (
                              values.label = ligfemregion[values.region]
                            )
                          }
                        })()
                      ) : (
                        values.label = ligtypes[values.type]
                      )
                      }


                    </div>

                  </div>

                }


                {currentStructure === "cartstate" &&
                  <div>
                    <label>Lésion Cartilage </label>{'   '}

                    <label>Type de lésion</label>
                    <div>
                      <label>
                        <Field name="type" component="select" type="radio">
                          <option value="type">Type</option>
                          {Object.keys(carttypes).map((type) => (
                            <option value={type}>{type}</option>
                          ))}
                        </Field>
                        {values.label = carttypes[values.type]}
                      </label>{' '}



                      <Condition when="type" is={values.type}>
                        <Field name="caracterisation" component="select" type="radio">
                          <option value="caracterisation">Caracterisation</option>
                          {cartcarac.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>


                      <label>Localisation </label>{' '}

                      <label>
                        <Field name="localisation" component="select" type="radio" >
                          <option value="localisation">Localisation</option>
                          {bonecartlocalisation.map((type) => (<option value={type}>{type}</option>))}
                        </Field>
                      </label>
                      <Condition when="localisation" is="Tibia">
                        <Field name="region" component="select" type="radio">
                          <option value="region">Région</option>
                          {tibiaregion.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>
                      <Condition when="region" is="Massif Epine Tibiale">
                        <Field name="position" component="select" type="radio">
                          <option value="position">Position</option>
                          {tibiaposition.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>
                      <Condition when="region" is="Plateau">
                        <Field name="position" component="select" type="radio">
                          <option value="position">Position</option>
                          {position.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>

                      <Condition when="localisation" is="Fémur">
                        <Field name="region" component="select" type="radio">
                          <option value="region">Région</option>
                          {femurregion.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>
                      <Condition when="region" is="Condyle">
                        <Field name="position" component="select" type="radio">
                          <option value="position">Position</option>
                          {position.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>
                      <Condition when="localisation" is="Patella">
                        <Field name="region" component="select" type="radio">
                          <option value="region">Région</option>
                          {patellaregion.map((type) => (<option value={type}>{type}</option>))}

                        </Field>

                      </Condition>


                    </div>
                  </div>


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

                  <Link to={{ pathname: `/GA/${currentexamID}`, state: { exam: currentexam, user:currentuser} }} className="nav-link">
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
              <Route path={`/GA/${currentexamID}`} component={GA} />
            </Switch>
          </div>
        </div>
      </Styles >





    )
  }
}
