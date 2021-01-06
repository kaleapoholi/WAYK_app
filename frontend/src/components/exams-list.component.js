import React, { Component } from "react";
import ExamDataService from "../services/exam.service";

export default class ExamsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchState = this.onChangeSearchState.bind(this);
    this.retrieveExams = this.retrieveExams.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveExam = this.setActiveExam.bind(this);
    this.searchState = this.searchState.bind(this);
    
    this.state = {
      exams: [],
      currentExam: null,
      currentIndex: -1,
      searchState: ""
    };
  }

  componentDidMount() {
    this.retrieveExams();
  }

  onChangeSearchState(e) {
    const searchState = e.target.value;

    this.setState({
      searchState: searchState
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
    const { searchState, exams, currentExam, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by State"
              value={searchState}
              onChange={this.onChangeSearchState}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchState}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Exams List</h4>

          <ul className="list-group">
            {exams &&
              exams.map((exam, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveExam(exam, index)}
                  key={index}
                >
                  {exam.dirname}
                </li>
              ))}
          </ul>

        </div>
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

