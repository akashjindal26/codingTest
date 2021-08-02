const kafka = require("kafka-node");

var Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client);

// checking producer is ready
producer.on('ready', function () {
    console.log('Producer is ready');
});

//producer have any error
producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})

//creating producer with topic and producing messages
const createProducer = async (req, res, next) => {
    var sentMessage = JSON.stringify(req.body);
    payloads = [{ topic: "USERINFORMATION", messages: sentMessage, partition: 0 }];
    producer.send(payloads, function (err, data) {
    });
    console.log(payloads);
    next();
}

module.exports = { createProducer };