  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCtfqwVL87uPyIsKOEC13l8nDU6HBqn71U",
    authDomain: "traintracker-bb440.firebaseapp.com",
    databaseURL: "https://traintracker-bb440.firebaseio.com",
    projectId: "traintracker-bb440",
    storageBucket: "traintracker-bb440.appspot.com",
    messagingSenderId: "170907199184"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Set up Click Event for the Submit button
  $("#submit").on("click", function (event) {
      console.log("SUBMITTING FORM");
      event.preventDefault();
      var name = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var freqMinutes = $("#freqMinutes").val().trim();
      console.log(name, destination, firstTrain, freqMinutes);

      // push information into firebase

      database.ref("/trains").push({
          name: name,
          destination: destination,
          firstTrain: firstTrain,
          minutes: freqMinutes
      });

  })

  // Set up the child_added event for firebase train location
  database.ref("/trains").on("child_added", function (snapshot) {
      console.log(snapshot.val());

      var newRow = $("<div>").addClass("row");
      var nameCol = $("<div>").addClass("col-2").text(snapshot.val().name);
      var destinationCol = $("<div>").addClass("col-2").text(snapshot.val().destination);
      var firstTrainCol = $("<div>").addClass("col-2").text(snapshot.val().firstTrain);
      var freqMinutes = moment(snapshot.val().freqMinutes);
      console.log(freqMinutes.format());
      console.log(moment().diff(freqMinutes, "minutes"));
      var minutesAway = moment().diff(freqMinutes, "minutes");

      var minutesCol = $("<div>").addClass("col-2").text(minutesAway);
      var rateCol = $("<div>").addClass("col-2").text(snapshot.val().rate);
      
      var earnings = minutesAway * snapshot.val().rate;
      var earningsCol = $("<div>").addClass("col-2").text(earnings);
      newRow.append(nameCol, destinationCol, firstTrainCol, minutesCol, rateCol, earningsCol);

      $("#trainTimes").append(newRow);

  });