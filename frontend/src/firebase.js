import firebase from "firebase";
const config = {
  apiKey: "AIzaSyA1oS-luQ7tY1KouiBB2t41wzgxowe1txk",
  authDomain: "badanie-preferencji.firebaseapp.com",
  databaseURL: "https://badanie-preferencji.firebaseio.com",
  projectId: "badanie-preferencji",
  storageBucket: "badanie-preferencji.appspot.com",
  messagingSenderId: "949505946781"
};
firebase.initializeApp(config);
export default firebase;
