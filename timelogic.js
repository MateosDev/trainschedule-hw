var config = {
  apiKey: "AIzaSyBsEbL2f2H5Pt44AZthZLJ4tHpAQy4qxko",
  authDomain: "traintimersmuhw.firebaseapp.com",
  databaseURL: "https://traintimersmuhw.firebaseio.com",
  projectId: "traintimersmuhw",
  storageBucket: "traintimersmuhw.appspot.com",
  messagingSenderId: "608709981538",
  appId: "1:608709981538:web:5c21557069710bd49ee83b"
};


firebase.initializeApp(config);
var database = firebase.database();



// 2. Add Trains Btn
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

 
// USER INPUT 
  

  var trainName = $("#train-name-input").val().trim();

  var trainDest = $("#dest-input").val().trim();

  var trainFirst = moment($("#first-input").val().trim(),"HH:mm").format("X");

  var trainFreq = $("#freq-input").val().trim();

  // train data obj
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainFirst,
    frequency: trainFreq
    
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

   // Clears all 
   $("#train-name-input").val("");
   $("#dest-input").val("");
   $("#first-input").val("");
   $("#freq-input").val("");
 });

// 3. adds train and row to DB with user input
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  

// Store everything into a variable.
var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var trainFirst = childSnapshot.val().time;
var trainFreq = childSnapshot.val().frequency;

  // Logs everything to console
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

  var trainDiff = moment().diff(moment.unix(trainFirst), "minutes");
  var trainRemainder = trainDiff % trainFreq;
  var trainETA = trainFreq - trainRemainder;
  var trainNext = moment().add(trainETA, "m").format("hh:mm A");

var inputRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDest),
  $("<td>").text(trainFreq),
  $("<td>").text(trainNext),
  $("<td>").text(trainETA)
);

$("#train-table > tbody").append(inputRow);




  

});

//Timeout Function - Keep at bottom
// setTimeout(function () {
//   location.reload();
// }, 60 * 1000);