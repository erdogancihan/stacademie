import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore  } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import rootReducer from "../store/reducers/rootReducer";

// Initialize Firebase
var fbConfig = {
  apiKey: "AIzaSyCXKtDmzVbwuKDTa-8MyHZgsKBpEUrgFT4",
  authDomain: "stakademi-65bcc.firebaseapp.com",
  databaseURL: "https://stakademi-65bcc.firebaseio.com",
  projectId: "stakademi-65bcc",
  storageBucket: "stakademi-65bcc.appspot.com",
  messagingSenderId: "1080959195235",
  appId: "1:1080959195235:web:cae14c78b9ff5c7f"
};


const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize firebase functions
firebase.functions()

//Initialize firebase storage
firebase.storage();

// Initialize Cloud Firestore through Firebase
firebase.firestore().settings({ timestampsInSnapshots: true });

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore })),
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument, rfConfig as optional second
  reduxFirestore(firebase)
)(createStore);

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);
export default store;
