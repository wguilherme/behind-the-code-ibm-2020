const MQTT = require("async-mqtt");

const options = {
   username: "maratoners",
   password: "ndsjknvkdnvjsbvj"
}
 
const client = MQTT.connect("tcp://tnt-iot.maratona.dev:30573", options);
 

 
const doStuff = async () => {
 
    console.log("Starting");
    try {
      
 
      await client.on('connect', function() { // When connected
         console.log('connected');
         // subscribe to a topic
         client.subscribe('topic1/#', function() {
             // when a message arrives, do something with it
             client.on('message', function(topic, message, packet) {
                 console.log("Received '" + message + "' on '" + topic + "'");
             });
         });
     
         // publish a message to a topic
         client.publish('topic1/#', 'my message', function() {
             console.log("Message is published");
             client.end(); // Close the connection when published
         });

         client.end()
     });


    } catch (e){
        // Do something about it!
        console.log('deu erro');
        console.log(e.stack);
        process.exit();
    }
}

