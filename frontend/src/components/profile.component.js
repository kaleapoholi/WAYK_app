import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import ExamDataService from "../services/exam.service";

import GAForm from "./genassmt.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangeAnnotUser = this.onChangeAnnotUser.bind(this);
    this.onChangeExamState = this.onChangeExamState.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.retrieveExams = this.retrieveExams.bind(this);
    this.retrieveNewExams = this.retrieveNewExams.bind(this);
    this.retrieveEncourslectureExams = this.retrieveEncourslectureExams.bind(this);
    this.retrieveLuExams = this.retrieveLuExams.bind(this);
    this.retrieveEnCoursAnnotExams = this.retrieveEnCoursAnnotExams.bind(this);
    this.retrieveAnnotatedExams = this.retrieveAnnotatedExams.bind(this);
    this.retrieveCrossAnalysisExams = this.retrieveCrossAnalysisExams.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      exams: [],
      new_exams: [],
      encourslecture_exams: [],
      lu_exams: [],
      annot_progress: [],
      annotated: [],
      crossanalysis: [],
      users: [],
      currentExam: {
        id: null,
        dirname: "",
        state: "",
        valid:0,
      },
      currentIndex: -1,
      currentNewIndex: -1,
      currentEnLectIndex: -1,
      currentLuIndex: -1,
      currentAnnotProgressIndex: -1,
      currentAnnotatedIndex: -1,
      currentCrossAnalysisIndex: -1,
      showAdminContent: false,
      showUserContent: false
    };
  }

  componentDidMount() {
    const user = this.state.currentUser;
    this.retrieveExams();
    this.retrieveNewExams();
    this.retrieveEncourslectureExams();
    this.retrieveLuExams();
    this.retrieveEnCoursAnnotExams();
    this.retrieveAnnotatedExams();
    this.retrieveCrossAnalysisExams();
    this.retrieveUsers();
    if (user) {
      this.setState({
        showAdminContent: user.roles.includes("ROLE_ADMIN"),
        showUserContent: user.roles.includes("ROLE_USER")
      })
    }
  }



  onChangeAnnotUser(e) {
    const userId = e.target.value;

    this.setState(function (prevState) {
      return {
        currentExam: {
          ...prevState.currentExam,
          userId: userId
        }
      };
    });
  }

  onChangeExamState(e) {
    const state = e.target.value;

    this.setState(function (prevState) {
      return {
        currentExam: {
          ...prevState.currentExam,
          state: state
        }
      };
    });
  }

  retrieveExams() {
    ExamDataService.findByUser(this.state.currentUser.id)
      .then(response => {
        this.setState({
          exams: response.data.exams
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveNewExams() {
    ExamDataService.findByUserAndState(this.state.currentUser.id, "NEW", 0)
      .then(response => {
        this.setState({
          new_exams: response.data[0].exams
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveEncourslectureExams() {
    ExamDataService.findByUserAndState(this.state.currentUser.id, "EN COURS DE LECTURE", 0)
      .then(response => {
        this.setState({
          encourslecture_exams: response.data[0].exams
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveLuExams() {
    ExamDataService.findByUserAndState(this.state.currentUser.id, "LU", 0)
      .then(response => {
        this.setState({
          lu_exams: response.data[0].exams
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveEnCoursAnnotExams() {
    ExamDataService.findByUserAndState(this.state.currentUser.id, "ANNOT IN PROGRESS", 0)
      .then(response => {
        this.setState({
          annot_progress: response.data[0].exams
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveAnnotatedExams() {
    ExamDataService.findByUserAndState(this.state.currentUser.id, "ANNOTATED", 0)
      .then(response => {
        this.setState({
          annotated: response.data[0].exams
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveCrossAnalysisExams() {
    ExamDataService.findByUserAndValid(this.state.currentUser.id, 1)
      .then(response => {
        this.setState({
          crossanalysis: response.data[0].exams
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveUsers() {
    ExamDataService.findAllUser()
      .then(response => {
        this.setState({

          users: response.data[0].users
        });
        console.log(response.data[0].users);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveExams();
    this.retrieveNewExams();
    this.retrieveEncourslectureExams();
    this.retrieveLuExams();
    this.retrieveEnCoursAnnotExams();
    this.retrieveAnnotatedExams();
    this.retrieveCrossAnalysisExams();
    this.retrieveUsers();
    this.setState({
      currentExam: null,
      currentIndex: -1,
      currentNewIndex: -1,
      currentEnLectIndex: -1,
      currentLuIndex: -1,
      currentAnnotProgressIndex: -1,
      currentAnnotatedIndex: -1,
      currentCrossAnalysisIndex: -1,
    });
  }

  setActiveExam(exam, index) {
    this.setState({
      currentExam: exam,
      currentIndex: index
    });
  }

  setActiveNewExam(exam, index) {
    this.setState({
      currentExam: exam,
      currentNewIndex: index,
      currentEnLectIndex: -1,
      currentLuIndex: -1,
      currentAnnotProgressIndex: -1,
      currentAnnotatedIndex: -1,
      currentCrossAnalysisIndex: -1,
    });
  }

  setActiveEnLectExam(exam, index) {
    this.setState({
      currentExam: exam,
      currentEnLectIndex: index,
      currentNewIndex: -1,
      currentLuIndex: -1,
      currentAnnotProgressIndex: -1,
      currentAnnotatedIndex: -1,
      currentCrossAnalysisIndex: -1,
    });
  }

  setActiveLuExam(exam, index) {
    this.setState({
      currentExam: exam,
      currentLuIndex: index,
      currentNewIndex: -1,
      currentEnLectIndex: -1,
      currentAnnotProgressIndex: -1,
      currentAnnotatedIndex: -1,
      currentCrossAnalysisIndex: -1,
    });
  }

  setActiveAnnotProgressExam(exam, index) {
    this.setState({
      currentExam: exam,
      currentLuIndex: -1,
      currentNewIndex: -1,
      currentEnLectIndex: -1,
      currentAnnotProgressIndex: index,
      currentAnnotatedIndex: -1,
      currentCrossAnalysisIndex: -1,
    });
  }

  setActiveAnnotatedExam(exam, index) {
    this.setState({
      currentExam: exam,
      currentLuIndex: -1,
      currentNewIndex: -1,
      currentEnLectIndex: -1,
      currentAnnotProgressIndex: -1,
      currentAnnotatedIndex: index,
      currentCrossAnalysisIndex: -1,
    });
  }

  setActiveCrossAnalysisExam(exam, index) {
    this.setState({
      currentExam: exam,
      currentLuIndex: -1,
      currentNewIndex: -1,
      currentEnLectIndex: -1,
      currentAnnotProgressIndex: -1,
      currentAnnotatedIndex: -1,
      currentCrossAnalysisIndex: index,
    });
  }


  updateUser(userId) {
    var data = {
      id: this.state.currentExam.id,
      dirname: this.state.currentExam.dirname,
      state: this.state.currentExam.state,
      userId: userId
    };

    ExamDataService.update(this.state.currentExam.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentExam: {
            ...prevState.currentExam,
            userId: userId
          }
        }));
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });


  }

  updateState(state) {
    var data = {
      id: this.state.currentExam.id,
      dirname: this.state.currentExam.dirname,
      state: state,
      valid : this.state.currentExam.valid
    };
    console.log("la", data)
    ExamDataService.update(this.state.currentExam.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentExam: {
            ...prevState.currentExam,
            state: state
          }
        }));
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });


  }



  render() {
    const { currentUser, new_exams, encourslecture_exams, lu_exams, annot_progress, annotated, crossanalysis, users, currentExam, currentNewIndex, currentEnLectIndex, currentLuIndex, currentAnnotProgressIndex, currentAnnotatedIndex, currentCrossAnalysisIndex, showAdminContent, showUserContent } = this.state;

    return (
      <div className="container">

        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>


        <div >

          <div className="col-md-6">
            <h4>Nouveaux Examens</h4>

            <ul className="list-group">
              {new_exams &&
                new_exams.map((exam, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentNewIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveNewExam(exam, index)}
                    key={index}
                  >
                    {exam.dirname}
                  </li>
                ))}
            </ul>

          </div>

          <div className="col-md-6">
            <h4>Examens En Cours De Lecture</h4>

            <ul className="list-group">
              {encourslecture_exams &&
                encourslecture_exams.map((exam, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentEnLectIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveEnLectExam(exam, index)}
                    key={index}
                  >
                    {exam.dirname}
                  </li>
                ))}
            </ul>

          </div>

          <div className="col-md-6">
            <h4>Examens Lus</h4>

            <ul className="list-group">
              {lu_exams &&
                lu_exams.map((exam, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentLuIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveLuExam(exam, index)}
                    key={index}
                  >
                    {exam.dirname}
                  </li>
                ))}
            </ul>

          </div>

          <div className="col-md-6">
            <h4>Examens En Cours d'Annotation</h4>

            <ul className="list-group">
              {annot_progress &&
                annot_progress.map((exam, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentAnnotProgressIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveAnnotProgressExam(exam, index)}
                    key={index}
                  >
                    {exam.dirname}
                  </li>
                ))}
            </ul>

          </div>

          <div className="col-md-6">
            <h4>Examens Annotés</h4>

            <ul className="list-group">
              {annotated &&
                annotated.map((exam, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentAnnotatedIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveAnnotatedExam(exam, index)}
                    key={index}
                  >
                    {exam.dirname}
                  </li>
                ))}
            </ul>

          </div>

          <div className="col-md-6">
            <h4>Cross Analysis Exams</h4>

            <ul className="list-group">
              {crossanalysis &&
                crossanalysis.map((exam, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentCrossAnalysisIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveCrossAnalysisExam(exam, index)}
                    key={index}
                  >
                    {exam.dirname}
                  </li>
                ))}
            </ul>

          </div>

          <div className="list row">
            {currentExam != null ? (
              <div>
                <h4>Examen</h4>
                <div>
                  <label>
                    <strong>Nom de l'examen:</strong>
                  </label>{" "}
                  {currentExam.dirname}
                </div>
                <div>
                  <label>
                    <strong>Statut de l'examen:</strong>
                  </label>{" "}
                  {currentExam.state}
                </div>
                <div>
                  {showUserContent && (
                    <label>
                      <Link to={{ pathname: `/GA/${currentExam.id}`, state: { exam: currentExam, user: currentUser } }} className="nav-link">
                        {currentExam.state === "NEW" ? (
                          <button classename="badge badge-primary mr-2"
                            onClick={() => this.updateState("EN COURS DE LECTURE")}>
                            Créer le formulaire
                          </button>
                        ) : (
                          <button classename="badge badge-primary mr-2" >
                            
                            Lire le formulaire
                          </button>
                        )
                        }

                      </Link>



                      {currentExam.state === "EN COURS DE LECTURE" && (
                        <label>
                          <button classename="badge badge-primary mr-2"
                            onClick={() => this.updateState("LU")}>
                            Terminer la saisie
                          </button>

                        </label>
                      )}

                      {currentExam.state === "LU" && (
                        <label>
                          <button classename="badge badge-primary mr-2"
                            onClick={() => this.updateState("ANNOT IN PROGRESS")}>
                            Annoter l'examen
                          </button>

                        </label>
                      )}

                      {currentExam.state === "ANNOT IN PROGRESS" && (
                        <label>
                          <button classename="badge badge-primary mr-2"
                            onClick={() => this.updateState("ANNOTATED")}>
                            Annotation terminée
                          </button>

                        </label>
                      )}

                    </label>




                  )}

                </div>

                {showAdminContent && (
                  <label>
                    Choisir le radiologue :
                    {users.map((user) => (
                      <button classeName="badge badge-primary mr-2"
                        onClick={() => this.updateUser(user.user_roles.userId)}>{user.username}</button>
                    ))}

                  </label>



                )}

                <div className="container mt-3">
                  <Switch>
                    <Route path={`/GA/${currentExam.id}`} component={GAForm} />
                  </Switch>
                </div>

              </div>


            ) : (
              <div>
                <br />
                <p>Choisir un examen...</p>
              </div>
            )}
          </div>
        </div>



      </div>

    );
  }
}


