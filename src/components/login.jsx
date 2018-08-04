import React, { Component } from 'react';

class Login extends Component {
  state = {  }
  render() { 
    const {handleSubmit} = this.props;
    return (
      <div style={{textAlign: "center", width: "100%", height: "70vh", position: "relative"}}>
        <div className="outer-box">
          <form onSubmit={handleSubmit} method="POST">
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" name="inpEmail" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="inpPassword" placeholder="Password" />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" name="inpRemeberMe" />
              <label className="form-check-label">Remeber Me</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
 
export default Login;