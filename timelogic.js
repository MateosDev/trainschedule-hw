
var firebaseConfig = {
  apiKey: "AIzaSyBaeQBZo66XTIYe8gc8zUtPrvuuH0DUmaw",
  authDomain: "smu-fullstack-traintime.firebaseapp.com",
  databaseURL: "https://smu-fullstack-traintime.firebaseio.com",
  projectId: "smu-fullstack-traintime",
  storageBucket: "smu-fullstack-traintime.appspot.com",
  messagingSenderId: "834306207030",
  appId: "1:834306207030:web:19caca26a9fcdea5f71797"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Add Trains Btn
$("#add-train-btn").on("click", function (event) {
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