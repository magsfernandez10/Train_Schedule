 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7SDf5J0Yoig0IdvAxul9ph5gIjwZSoRE",
    authDomain: "trainschedule-5bbf2.firebaseapp.com",
    databaseURL: "https://trainschedule-5bbf2.firebaseio.com",
    projectId: "trainschedule-5bbf2",
    storageBucket: "",
    messagingSenderId: "1614916935"
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
          freqMinutes: freqMinutes
      });

  });

  // Set up the child_added event for firebase train location
  database.ref("/trains").on("child_added", function (snapshot) {
      console.log(snapshot.val());

      var trainNames = snapshot.val().name
      var destinationNames = snapshot.val().destination
      var firsttrainTimes = snapshot.val().firstTrain
      var frequencyTimes = snapshot.val().freqMinutes



      //moment calculations//
      var militaryTime = moment(firsttrainTimes, "HH:mm");
      var minutesAway = moment().diff(firstTrainCol, "minutes");

      var minutesCol = $("<div>").addClass("col-2").text(minutesAway);
      //var rateCol = $("<div>").addClass("col-2").text(snapshot.val().rate);
      
    //jQuery rows//
      var newRow = $("<div>").addClass("row");
      var nameCol = $("<div>").addClass("col-2").text(trainNames);
      var destinationCol = $("<div>").addClass("col-2").text(destinationNames);
      var firstTrainCol = $("<div>").addClass("col-2").text(firsttrainTimes);
      
      var nextTrain = minutesAway * snapshot.val().firstTrain;
      var nextTrainCol = $("<div>").addClass("col-2").text(nextTrain);
      newRow.append(nameCol, destinationCol,freqMinutes, minutesCol, nextTrainCol);

      $("#trainTimes").append(newRow);

  });