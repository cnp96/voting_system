import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Candidate from './components/candidate';
import Admin from './components/admin';
import AddCandidate from './components/addCandidate';
import Navbar from './components/navbar';
import axios from 'axios';
import cookie from 'react-cookies';

class App extends Component {
  state = {
    id: "",
    isLoggedIn: false,
    isAdmin: false,
    candidates:[],
    user: "",
    votedFor: "",
    isLoading: false,
    failedLoading: false    
  };
  autoUpdate = null;
  defaultState = this.state;

  // Check existing session and enable auto login
  componentWillMount() {
    if( cookie.load("auth") ) {
      this.autoLogin();    
    }

  }

  // Error Handler
  errorHandler = (e) => {
    console.log(  JSON.stringify(e)  );
    if(e.code ) {
      switch(e.code) {
        case "ECONNABORTED": console.log("Connection Error"); break;
        default: console.log(e.code); break;
      }
      this.setState({failedLoading: true});
    }
    else if(!e.response) alert("Unable to contact server.");
    else alert(e.response.data);    
  };

  // Client: Voted
  handleVoteClicked = (user, candidate) => {
    if(this.state.votedFor !== "") return;
    if( !cookie.load("auth") ) return this.logout();

    console.log(user + " voting for " + candidate);
    axios.put("http://localhost:3001/candidates/vote/"+candidate, {}, {headers: {"x-auth-token": cookie.load("auth")}})
    .then(r => {
      if(r.status === 200 && r.data.candidate) {
        this.setState({votedFor: candidate});
      }
    })
    .catch(e => this.errorHandler(e));
  };

  // Get user info from session and auto login
  autoLogin = () => {
    const token = cookie.load("auth");
    if(!token) return this.logout();
    axios.get('http://localhost:3001/auth/refresh', {headers: {'x-auth-token': token}})
    .then(r => {
      console.log(r.data);
      const payload = {
        isLoggedIn: true,
        user: r.data.name,
        id: r.data._id,
        isAdmin: r.data.isAdmin,
        voted: r.data.voted, 
        isLoading: true,
        isFailedLoading: false       
      };
      this.setState(payload);
      this.getCandidates();
      this.getVoteInfo();
      this.setAutoRefresh();
    })
    .catch(e => this.errorHandler(e));
  };

  // Get candidate names
  getCandidates = async () => {
    const token = cookie.load("auth");
    if(!token) return this.logout();
    console.log("Fetching candidates...");
    axios.get('http://localhost:3001/candidates',{headers: {'x-auth-token': token}})
    .then(r => {
      console.log("Fetched candidates ", r.data);
      this.setState({candidates: r.data, isLoading: false});
    })
    .catch(e => this.errorHandler(e));
  }

  // Get vote info
  getVoteInfo = async () => {
    const token = cookie.load("auth");
    if(!token) return this.logout();
    console.log("Fetching vote info...");
    axios.get("http://localhost:3001/candidates/vote", {headers: {"x-auth-token": token}})
    .then(r => {
      if(r.status === 200 && r.data.candidate) {
        console.log("User voted for " + r.data.candidate);
        this.setState({votedFor: r.data.candidate});
      }
      else console.log("Not voted yet.");
    })
    .catch(e => this.errorHandler(e));
  };

  // Set automatic candidate update
  setAutoRefresh = () => {
    if(this.autoUpdate) return;
    this.autoUpdate = window.setInterval(this.getCandidates, 5000);    
  };

  // Logging in and out
  login = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.inpEmail.value;
    const password = form.inpPassword.value;    

    console.log("Logging in user...");
    axios.post("http://localhost:3001/auth/login", {
      email: email, password: password
    })
    .then(r => {
      const payload = {
        isLoggedIn: true,
        user: r.data.name,
        id: r.data._id,
        isAdmin: r.data.isAdmin,
        voted: r.data.voted,
        isLoading: true,
        isFailedLoading: false
      };
      
      cookie.save("auth", r.headers["x-auth-token"], {path: "/", maxAge: 1800});

      this.setState(payload);
      this.getCandidates();
      this.getVoteInfo();
      this.setAutoRefresh();
    })
    .catch(e => this.errorHandler(e));
  }
  logout = () => {
    cookie.remove("auth");
    window.clearInterval(this.autoUpdate);
    this.setState(this.defaultState);
  }

  // Admin: adding and deleting candidates
  onAddCandidate = (name) => {        
    axios.post("http://localhost:3001/candidates", {name}, {headers: {"x-auth-token": cookie.load("auth")}})
    .then(r => {
      if(r.status === 200) {
        let candidates = this.state.candidates;
        candidates.push(r.data);
        this.setState({candidates});
      }
    })
    .catch(e => this.errorHandler(e));
  }
  onDeleteCandidate = (id) => {
    axios.delete("http://localhost:3001/candidates/"+id, {headers: {"x-auth-token": cookie.load("auth")}})
    .then(r => {
      if(r.status === 200) {
        let candidates = this.state.candidates.filter(c => c._id !== id);
        this.setState({candidates});
      }
    })
    .catch(e => this.errorHandler(e));
  }

  render() {
    console.log("render");

    const candidatesText = this.state.isLoading ? "Loading Candidates..." : this.failedLoading ? "Unable to load data at the moment" : !this.state.candidates.length ? "No Candidates Available" : "";
    const CandidateComponent =  <div className="container">
                                  <h1 className="jumbotron mt-1" style={{textAlign: "center"}}>Candidate List</h1>
                                  <h3 className="mt-5">{candidatesText}</h3>
                                  <div className="row">
                                    { this.state.candidates.map(c => 
                                      <Candidate name={c.name} 
                                      voteClicked={this.handleVoteClicked} 
                                      votedFor={this.state.votedFor}
                                      id={c._id} 
                                      user={this.state.id}
                                      key={c._id} />
                                    )}
                                  </div>
                                </div>;

    const AdminComponent =  <div className="container">
                              <h1 className="jumbotron mt-1" style={{textAlign: "center"}}>Admin Panel</h1>
                              <AddCandidate onAdd={this.onAddCandidate} />
                              <h3 className="mt-5">{candidatesText}</h3>
                              <hr /><br />
                              <div className="row">
                                { this.state.candidates.map(c => 
                                  <Admin 
                                  name={c.name}
                                  voteCount={c.votes}
                                  onDelete={this.onDeleteCandidate}
                                  id={c._id}
                                  key={c._id} />
                                )}
                              </div>
                            </div>;

    const LoadComponent = !this.state.isLoggedIn ? <Login handleSubmit={this.login}/> : this.state.isAdmin ? AdminComponent : CandidateComponent;
    
    return (
      <React.Fragment>
        <Navbar username={this.state.user} isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
        {LoadComponent}
      </React.Fragment>
    );
  }
}

export default App;
