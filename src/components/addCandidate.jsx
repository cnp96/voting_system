import React, { Component } from "react";

class AddCandidate extends Component {
  state = {
    name: ""
  };
  updateName = (e) => {
    this.setState({name: e.target.value});
  }

  render() {

    const { onAdd } = this.props;

    return (
      <div className="input-group" style={{ width: "300px" }}>
        <input
          onChange={this.updateName}
          type="text"
          className="form-control"
          placeholder="Candidate Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append ml-2" style={{border: "1px solid #d8d8d8", borderRadius: "5px"}}>
          <button onClick={() => { onAdd(this.state.name); }} className="input-group-text add-button" id="basic-addon2">
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddCandidate;
