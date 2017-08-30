
window.onload = function () {

    document.getElementById("submitButton").addEventListener("click", function() {
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
        addItem(document.getElementById("fullname").value 
        , document.getElementById("RFIDinput").innerHTML
        , document.getElementById("latlon").innerHTML
        , document.getElementById("weatherDisplay").innerHTML);

        //removeItem();
    });
}

function addItem(name, id, location, weather) {
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

    var query = "INSERT INTO DATA (Name, RFID, Location, Weather) VALUES (?,?,?,?)";

        tx.executeSql(query, [name, id, location, weather], function(tx, res) {
            console.log("insertId: " + res.insertId + " -- probably 1");
            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
        },
        function(tx, error) {
            console.log('INSERT error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });
}

/*function removeItem() {

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
    
        var query = "DELETE FROM DATA WHERE Name = ''";
    
        tx.executeSql(query, [], function (tx, res) {
            console.log("removeId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function (tx, error) {
            console.log('DELETE error: ' + error.message);
        });
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });
}*/

function failure(reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
}


