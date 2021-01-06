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
    this.refreshList = this.refreshList.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      exams:[],
      users:[],
      currentExam: {
        id: null,
        dirname : "",
        state : "",
        userId: null
      },
      currentIndex: -1,
      showAdminContent:false, 
      showUserContent:false
    };
  }

  componentDidMount() {
    const user=this.state.currentUser;
    this.retrieveExams();
    this.retrieveUsers();
    if (user) {
      this.setState({
        showAdminContent : user.roles.includes("ROLE_ADMIN"),
        showUserContent : user.roles.includes("ROLE_USER")
      })
    }
  }

  onChangeAnnotUser(e) {
    const userId = e.target.value;

    this.setState(function(prevState) {
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

    this.setState(function(prevState) {
      return {
        currentExam: {
          ...prevState.currentExam,
          state : state
        }
      };
    });
  }

  retrieveExams() {
    ExamDataService.findByUser(this.state.currentUser.id)
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
    this.retrieveUsers();
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


  updateUser(userId) {
    var data = {
      id: this.state.currentExam.id,
      dirname : this.state.currentExam.dirname,
      state : this.state.currentExam.state,
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
      dirname : this.state.currentExam.dirname,
      state : state,
      userId: this.state.currentExam.userId
    };

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
    const { currentUser , exams, users, currentExam, currentIndex, showAdminContent, showUserContent} = this.state;

    return (
      <div className="container">

        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>

        <div className="list row">
        
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
          {currentExam !=null ? (
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
              {showUserContent && (
                <label>
                  <Link to={{pathname: `/GA/${currentExam.id}`, state: {examID : currentExam.id} }} className="nav-link">
                    {currentExam.state === "NEW" ? (
                      <button classename="badge badge-primary mr-2" 
                        onClick={()=>this.updateState("EN COURS DE LECTURE")}>
                          createGA
                      </button>
                    ):(
                      <button classename="badge badge-primary mr-2" >
                          readGA
                      </button>
                    )
                    }
                    
                  </Link>
                  
                </label>

                
              )}
                
              </div>

              {showAdminContent && (
                <label>
                      Choisir le radiologue :
                      {users.map((user)=>  (
                          <button classeName="badge badge-primary mr-2"
                          onClick={()=>this.updateUser(user.user_roles.userId)}>{user.username}</button>
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
              <p>Please click on a Exam...</p>
            </div>
          )}
        </div>
      </div>
      

      
    </div>
        
    );
  }
}


