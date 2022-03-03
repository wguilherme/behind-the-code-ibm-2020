const fs = require("fs"); 

var mqtt = require('mqtt');
var options = {
    port: 30573,
    host: 'mqtt://tnt-iot.maratona.dev',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: "maratoners",
   password: "ndsjknvkdnvjsbvj",
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

// let dados1 = {chave1: "valor1", chave2: "valor2"}
// let dados2 = {chave1: "valor1", chave2: "valor2"}


let data = {};
data.table = []

// definindo arquivo
// const dadosJson = require("./dados.json"); 

// atualizando arquivo
data.table.push(dados1, dados2);
console.log(data)


// atualizando arquivo
fs.writeFile ("inputs.json", JSON.stringify(data), function(err) {
   if (err) throw err;
   console.log('complete');
   }
);




// var dados;

// var client = mqtt.connect('mqtt://tnt-iot.maratona.dev', options);
// client.on('connect', function() { // When connected
//     console.log('connected');
//     // subscribe to a topic
//     client.subscribe('tnt', function() {
//         // when a message arrives, do something with it
//         client.on('message', function(topic, message, packet) {
//          //   console.log('recebido')
//             console.log("Received '" + message + "' on '" + topic + "'");
//         });
//     });

//     // publish a message to a topic
//    //  client.publish('tnt', 'my message', function() {
//    //      console.log("Message is published");
//    //      client.end(); // Close the connection when published
//    //  });
// });