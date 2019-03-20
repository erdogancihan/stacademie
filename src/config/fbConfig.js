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
  apiKey: "AIzaSyC_7JjVzpTB3UQaggg-cCG87EZ1H7o_fHg",
  authDomain: "stacademie.firebaseapp.com",
  databaseURL: "https://stacademie.firebaseio.com",
  projectId: "stacademie",
  storageBucket: "stacademie.appspot.com",
  messagingSenderId: "385515955536"
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
