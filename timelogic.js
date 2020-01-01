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
$("#add-train-btn").on("click", function () {
  event.preventDefault();

  // Input
  var trainName = $("#train-name-input")
    .val()
    .trim();

  var trainDest = $("#dest-input")
    .val()
    .trim();

  var trainFirst = moment(
    $("#first-input")
    .val()
    .trim(),
    "mm"
  ).format("mm");

  var trainFreq = $("#freq-input")
    .val()
    .trim();

  // train data obj
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref("/trainData").push(newTrain);

  function printRow() {
    //console.log("printing");
    var tRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td class='frequency'>").text(frequency),
        $("<td class='nextTime'>").text(nextArrival),
        $("<td class='minAway'>").text(minutesAway)
    );

    $("tbody").append(tRow);
}

printRow();

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.freq);
  console.log(newTrain.start);
  // console.log(newTrain.nextArrival);
  // console.log(newTrain.minutesAway);

  alert("train successfully added");

  // Clears all 
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#freq-input").val("");
  $("#nextArrival-input").val("");
});



// 3. adds train and row to DB with user input
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFreq = childSnapshot.val().freq;
  var trainFirst = childSnapshot.val().first;
  // var trMA = childSnapshot.val();
  // var trNA = childSnapshot.val().nextArrival;
  // var trMA = childSnapshot.val().minutesAway;

  // train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFreq);
  console.log(trainFirst);

  var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // math is fun. Math, math math. 
  var tRemainder = diffTime % trainFreq;
  //_______________________
  var trMA = trFreq - tRemainder;
  var trNA = moment()
    .add(trMA, "minutes")
    .format("HH:mm");
  console.log(trNA);
  console.log(trMA);

  // Create the new row with i <3 jqueryyyyy
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(trainNA),
    $("<td>").text(trainMA),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});



//Timeout Function - Keep at bottom
// setTimeout(function () {
//   location.reload();
// }, 60 * 1000);