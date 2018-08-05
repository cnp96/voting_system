import React, { Component } from "react";

class Navbar extends Component {
  render() {
    const {username, isLoggedIn, logout} = this.props;

    const heading = isLoggedIn ? username : "Voting System";

    let action;
    if(isLoggedIn) {
      action = <button className="btn btn-default" onClick={logout} style={{float: "right"}}>Logout</button>;
    } 
    else {
      action = <div>
                <button className="btn btn-default" style={{float: "right"}}>Login</button>
                {/* <button className="btn btn-default mr-1" style={{float: "right"}}>Signup</button> */}
              </div>;
    }

    return (
      <div className="container">
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">{heading}</span>
        {action}
      </nav>
      </div>
    );
  }
}

export default Navbar;
