// Add an RFID reader, look for a recent plugin https://github.com/chariotsolutions/phonegap-nfc/blob/master/README.md, 

// Get 10 equipment with a name, location, age, and description. Hardcode RFID number to match with RFID tags on desk and put in database.  
// Learn database to save information
// Ask Rahul to help with getting the actual RFID

document.addEventListener('deviceready', function() {
  getData();
});

function getData() {
  var db = window.sqlitePlugin.openDatabase({name: 'Inspection_information', location: 'default'}, function (db) {
      db.transaction(function (tx) {
          tx.executeSql("CREATE TABLE IF NOT EXISTS DATA (Name, RFID, Location, Weather)" 
       ,  function(error) {
           console.log('Transaction ERROR: ' + error.message);
       }, function() {
           console.log('Transaction ok');
       });
    });
  });

  db.transaction(function (tx) {
  
      var query = "SELECT * FROM DATA";
          
      tx.executeSql(query, [], function (tx, resultSet) {
          var len = resultSet.rows.length;
          var parent; 
          var nodename;
          var textname;

          var nodeRFID;
          var textRFID;

          var nodeLocation;
          var textLocation;

          var nodeWeather;
          var textWeather;
          for(var i = 0; i < len; i++) {
              parent = document.createElement("tr");

              nodename = document.createElement("td");
              textname = document.createTextNode(resultSet.rows.item(i).Name);
              nodename.appendChild(textname);
              parent.appendChild(nodename);
              
              nodeRFID = document.createElement("td");
              textRFID = document.createTextNode(resultSet.rows.item(i).RFID);
              nodeRFID.appendChild(textRFID);
              parent.appendChild(nodeRFID);
              
              nodeLocation = document.createElement("td");
              textLocation = document.createTextNode(resultSet.rows.item(i).Location);
              nodeLocation.appendChild(textLocation);
              parent.appendChild(nodeLocation);

              nodeWeather = document.createElement("td");
              textWeather = document.createTextNode(resultSet.rows.item(i).Weather);
              nodeWeather.appendChild(textWeather);
              parent.appendChild(nodeWeather);
              
              document.getElementById("inspectionList").appendChild(parent);
              console.log("Name: " + resultSet.rows.item(i).Name + 
                  ", RFID: " + resultSet.rows.item(i).RFID + 
                  ", Location: " + resultSet.rows.item(i).Location + 
                  ", Weather: " + resultSet.rows.item(i).Weather);
          }
      },
      function (tx, error) {
          console.log('SELECT error: ' + error.message);
      });
  }, function (error) {
      console.log('transaction error: ' + error.message);
  }, function () {
      console.log('transaction ok');
  });
}



