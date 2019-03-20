import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }

  handleChange = e => {
    this.setState({
      user: { ...this.state.user, privilege: e.target.value }
    });
  };

  render() {
    const { user, handleDeleteUser, handleEditUser } = this.props;
    /*
    if (user.emailVerified === undefined) {
      user.emailVerified = false;
    }
    */

    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>{user.userName}</td>
        <td>
          <select
            id={user.id}
            value={this.state.user.privilege}
            onChange={this.handleChange}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </td>
        <td>
          <button
            className="button-edit"
            onClick={() => {
              handleEditUser(this.state.user);
            }}
          >
            edit
          </button>
          <button
            className="button-delete"
            onClick={() => {
              handleDeleteUser(user);
            }}
          >
            delete
          </button>
        </td>
      </tr>
    );
  }
}

export default User;
