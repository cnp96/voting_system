import React, { Component } from "react";

class Admin extends Component {
  render() {
    const {name, onDelete, voteCount, id} = this.props;

    return (
      <div className="col-sm-6 col-md-6 col-lg-4">
        <div className="chip chip-lg">
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
            alt="Contact Person"
          />{" " + name}
          <span className="vote-display">{voteCount}</span>
          <div className="checkbox">
            <button
              onClick={function() {
                onDelete(id);
              }}
              className={"btn btn-custom btn-danger"}
            > x </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
