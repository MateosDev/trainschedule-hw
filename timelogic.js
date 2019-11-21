var firebaseConfig = {
    apiKey: "AIzaSyDFSAsscmiWzDBZieaHdLT9Byc9kxS9WtE",
    authDomain: "train-timer-176d8.firebaseapp.com",
    databaseURL: "https://train-timer-176d8.firebaseio.com",
    projectId: "train-timer-176d8",
    storageBucket: "train-timer-176d8.appspot.com",
    messagingSenderId: "951292739243",
    appId: "1:951292739243:web:0763e55c3d7809098c81ee"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();



//Timeout Function - Keep at bottom
setTimeout(function() {
    location.reload();
  }, 60 * 1000);