import React, { Component } from "react";
import ExamDataService from "../services/exam.service";
import GADataService from "../services/genassmt.service";
import LesionDataService from "../services/lesion.service";
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';


export default class Visudb extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchState = this.onChangeSearchState.bind(this);
        this.retrieveExams = this.retrieveExams.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.retrieveGA = this.retrieveGA.bind(this);
        this.retrieveLesion = this.retrieveLesion.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveExam = this.setActiveExam.bind(this);
        this.searchState = this.searchState.bind(this);

        this.state = {
            exams: [],
            users: [],
            genass: [],
            lesions: [],
            currentExam: null,
            currentUser: null,
            currentGA: null,
            currentLesion: null,
            currentIndex: -1,
            searchState: ""
        };
    }

    componentDidMount() {
        this.retrieveExams();
        this.retrieveUsers();
        this.retrieveGA();
        this.retrieveLesion();
    }

    onChangeSearchState(e) {
        const searchState = e.target.value;

        this.setState({
            searchState: searchState
        });
    }

    retrieveGA() {
        GADataService.findAll()
            .then(response => {
                this.setState({
                    genass: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveLesion() {
        LesionDataService.findAll()
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


    retrieveExams() {
        ExamDataService.findAll()
            .then(response => {
                this.setState({
                    exams: response.data
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
        this.setState({
            currentExam: null,
            currentIndex: -1
        });
    }

    setActiveExam(exam, index) {
        this.setState({
            currentExam: exam,
            currentIndex: index
        });
    }

    searchState() {
        ExamDataService.findByState(this.state.searchState)
            .then(response => {
                this.setState({
                    exams: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { exams, currentExam } = this.state;

        return (


            <div className="list row">

                <Row>
                    <Col sm="4">
                        <Card body>
                            <CardTitle tag="h6">Nombre total d'examens</CardTitle>
                            <CardText tag="h2">{exams.length}</CardText>

                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card body>
                            <CardTitle tag="h5">Nombre d'examen par structure</CardTitle>
                            <CardText>En cours</CardText>
                            <Button>Go somewhere</Button>
                        </Card>
                    </Col>

                </Row>

                
                <div className="col-md-6">
                    {currentExam ? (
                        <div>
                            <h4>Exam</h4>
                            <div>
                                <label>
                                    <strong>Dirname:</strong>
                                </label>{" "}
                                {currentExam.dirname}
                            </div>
                            <div>
                                <label>
                                    <strong>State:</strong>
                                </label>{" "}
                                {currentExam.state}
                            </div>
                            <div>
                                <label>
                                    <strong>User ID:</strong>
                                </label>{" "}
                                {currentExam.userId}
                            </div>


                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Please click on a Exam...</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

