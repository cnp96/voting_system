import React, { Component } from "react";

class Candidate extends Component {
  getBackground = () => {
    return this.props.votedFor === "" ? "" : "grey";
  };

  votedFor = id => {
    return this.props.votedFor === id;
  };

  hasVoted = () => {
    return this.props.votedFor !== "";
  };

  render() {
    const { voteClicked, name, id, user } = this.props;

    return (
      <div className="col-sm-6 col-md-6 col-lg-4">
        <div className="chip chip-lg">
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
            alt="Contact Person"
          />{" " + name}          
          <div className="checkbox">
            <button
              onClick={function() {
                voteClicked(user, id);
              }}
              className={
                "btn btn-custom btn-" +
                (!this.hasVoted() ? "default" : this.votedFor(id) ? "custom-success" : "disabled")
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Candidate;
