import firebase from "firebase/app";
const config = {
  apiKey: "AIzaSyCvsZ31pWskffPUEAnXa9KzAx8RSjMwXAY",
  authDomain: "acute-crm.firebaseapp.com",
  databaseURL: "https://acute-crm.firebaseio.com",
  projectId: "acute-crm",
  storageBucket: "acute-crm.appspot.com",
  messagingSenderId: "321539518764",
  appId: "1:321539518764:web:998a445a94560bcabebc89",
  measurementId: "G-R8DTL83N4M",
};

const firebaseInstance = firebase.initializeApp(config);

export default firebaseInstance;
