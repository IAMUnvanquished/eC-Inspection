/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        /*if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)){
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }
        else {
            this.onDeviceReady(); // This is for the browser
            console.log("Device is ready");
        }*/

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        function failure(reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
        }

        /*nfc.addNdefListener(
            app.onNdef,
            function() {
                console.log("Listening for NDEF tags.");
            },
            failure
        );
        
        // Android launches the app when tags with mime type text/pg are scanned
            // because of an intent in AndroidManifest.xml.
            // phonegap-nfc fires an ndef-mime event (as opposed to an ndef event)
            // the code reuses the same onNfc handler
        nfc.addMimeTypeListener(
            'text/pg',
            app.onNdef,
            function() {
                console.log("Listening for NDEF mime tags with type text/pg.");
            },
            failure
        );*/

        /*How do I make these two run at the same time*/
        console.log('cordova plugins',cordova.plugins);
        cordova.plugins.diagnostic.isLocationAvailable(function(available){
            console.log("Location is " + (available ? "available" : "not available"));
            console.log('location',navigator.geolocation); //I'm using watchPosition() so it;s called every 3 seconds and so RFID isn't working
            navigator.geolocation.getCurrentPosition(onWeatherSuccess, showError, { timeout: 10000, enableHighAccuracy: true});
            navigator.geolocation.getCurrentPosition(showPosition, showError, { timeout: 10000, enableHighAccuracy: true});
            if(!available){
              cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
                  console.log("Authorization status is now: " + status);
              }, function(error){
                  console.error(error);
              });
            }
        }, function(error){
            console.error("The following error occurred: "+error);
        });

        
        if (device.platform == "Android") {
            // Android reads non-NDEF tag. BlackBerry and Windows don't.
            nfc.addTagDiscoveredListener(
                app.onNfc,
                function() {
                    console.log("Listening for non-NDEF tags.");
                },
                failure
            );
        }

    },

        onNfc: function (nfcEvent) {
        
        var tag = nfcEvent.tag.id[0];

        console.log(JSON.stringify(nfcEvent));
        console.log(JSON.stringify(nfcEvent.tag));

        document.getElementById("RFIDinput").innerHTML = JSON.stringify(tag);    
        navigator.notification.vibrate(100);        
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    onNdef: function (nfcEvent) {
        
        console.log(JSON.stringify(nfcEvent.tag));

        var tag = nfcEvent.tag;

        // BB7 has different names, copy to Android names
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }

        tagContents.innerHTML = app.tagTemplate(tag);

        navigator.notification.vibrate(100);        
    }
};

app.initialize();


        




