import { actionTypes } from "redux-firestore";
import { Success, Failure, Claim } from "./usersActions";

export const errorMessage = (error, getState) => {
  console.log(getState());
  let language = getState().language;
  console.log(error);
  switch (error.code) {
    case "auth/invalid-email":
      return language.errorMessage.invalidEmail;
    case "auth/invalid-password":
      return language.errorMessage.invalidPassword;
    case "auth/maximum-user-count-exceeded":
      return language.errorMessage.maximumUserCountExceeded;
    case "auth/email-already-exists":
      return language.errorMessage.emailAlreadyExists;
    case "auth/user-not-found":
      return language.errorMessage.userNotFound;
    case "auth/internal-error":
      return language.errorMessage.internalError;
    case "auth/network-request-failed":
      return language.errorMessage.authNetworkRequestFailed;
    case "auth/wrong-password":
      return language.errorMessage.wrongPassword;
    case "auth/email-already-in-use":
      return language.errorMessage.emailAlreadyInUse;
    case "auth/weak-password":
      return language.errorMessage.weakPassword;
    case "emailNotVerified":
      return language.errorMessage.emailNotVerified;
    default:
      return error.message;
  }
};

export function fetchUsers() {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .onSnapshot({
        collection: "users"
      })
      .then(response => {
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

export function deleteUser(user) {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .delete({ collection: "users", doc: user.id })
      .then(resp => {
        return console.log(resp);
      })
      .then(response => {
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

/*export const editUser = user => {
  console.log(user);
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .update({ collection: "users", doc: user.id }, user)
      .then(resp => {
        return console.log(resp);
      })
      .then(response => {
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
};
*/

//edits custom claims
export const editUser = user => {
  user.email = user.userEmail;
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const fireStore = getFirestore();
    const updateDatabase = () => {
      fireStore
        .update({ collection: "users", doc: user.id }, user)
        .then(resp => {
          return console.log(resp);
        })
        .then(response => {
          dispatch(Success(response));
        })
        .catch(error => {
          let ErrorMessage = errorMessage(error, getState);
          dispatch(Failure(ErrorMessage));
          return console.log(ErrorMessage);
        });
    };
    if (user.privilege === "admin") {
      const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
      addAdminRole(user).then(result => {
        updateDatabase();
        console.log(result);
      });
    } else if (user.privilege === "user") {
      const addUserRole = firebase.functions().httpsCallable("addUserRole");
      addUserRole(user).then(result => {
        updateDatabase();
        console.log(result);
      });
    }
  };
};

export const signUpUser = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const fireStore = getFirestore();
    let userID = null;
    let lang = getState().language.language;
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(resp => {
        userID = resp.user.uid;
        console.log(lang);
        firebase.auth().languageCode = lang;
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
      })
      .then(() => {
        fireStore
          .collection("users")
          .doc(userID)
          .set({
            userName: user.userName,
            privilege: "user",
            id: userID,
            userEmail: user.email
          });
      })
      .then(response => {
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
};

export const signInUser = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(response => {
        console.log(response);
        if (response.user.emailVerified === true) {
          firestore.get({
            collection: "users",
            doc: response.user.uid,
            storeAs: "user"
          });

          return dispatch(Success(response));
        } else {
          let ErrorMessage = errorMessage(
            { code: "emailNotVerified" },
            getState
          );
          dispatch(Failure(ErrorMessage));
        }
      })
      .catch(error => {
        console.log(error);
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
};
export const isAdmin = user => {
  return dispatch => {
    let isAdmn = false;
    if (!user) {
      dispatch(Claim(isAdmn));
    } else {
      user
        .getIdTokenResult()
        .then(idTokenResult => {
          isAdmn = idTokenResult.claims.admin;
        })
        .then(() => {
          dispatch(Claim(isAdmn));
        });
    }
  };
};

export function logOut() {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(response => {
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

export function resetPassword(email) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log(email);
    const firebase = getFirebase();
    let auth = firebase.auth();
    let lang = getState().language.language;
    firebase.auth().languageCode = lang;
    auth
      .sendPasswordResetEmail(email.email)
      .then(function(response) {
        console.log("email send", email.email);
        dispatch(Success(response));
      })
      .catch(function(error) {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

export function changePassword(User) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let user = firebase.auth().currentUser;
    let email = user.email;
    console.log(user);
    let password = User.oldPassword;
    let newPassword = User.newPassword;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        user.updatePassword(newPassword);
      })
      .then(function() {
        dispatch(Success());
        console.log("passwordUpdated");
      })
      .catch(function(error) {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}
