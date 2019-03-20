import { combineReducers } from "redux";

import language from "./languageReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import users from "./usersReducer";

const rootReducer = combineReducers({
  language, 
  users,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
export default rootReducer;
