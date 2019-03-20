import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { deleteUser, editUser } from "../../store/actions/usersActionCreator";
import { clearAuthMessages } from "../../store/actions/usersActions";
import User from "./user";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    this.props.clearAuthMessages();
  }
  handleDeleteUser = user => {
    console.log(user);
    this.props.deleteUser(user);
  };
  handleEditUser = user => {
    if(this.props.auth.isAdmin===true){
      this.props.editUser(user);
    }
   };

  render() {
    const { users, deleteUser, editUser, activeUser } = this.props;

    return activeUser /*&& activeUser.privilege === "admin" */? (
      <div className="articles-container">
        <table className="users">
          <thead>
            <tr>
              <th>Id</th>
              <th>E-Mail</th>
              <th>User Name</th>
              <th>Privilege</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map(userr => {
                return (
                  <User
                    key={userr.id}
                    user={userr}
                    handleDeleteUser={deleteUser}
                    handleEditUser={editUser}
                  />
                );
               
              })}
          </tbody>
        </table>
        <ul className="users-rules">
         
          <li>
            Kullanıcının yetkisini belirledikten sonra etkin olması için "edit"
            tuşuna basınız. "delete" tuşuna basarsanız kullanıcı kalıcı olarak
            silinir.
          </li>
        </ul>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => {

  return {
    users: state.firestore.ordered.users,
    activeUser: state.firestore.data.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: user => dispatch(deleteUser(user)),
    editUser: user => dispatch(editUser(user)),
    clearAuthMessages: () => dispatch(clearAuthMessages())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(Users);
