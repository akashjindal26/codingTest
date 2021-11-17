var kafka = require('kafka-node');

// creating consumer to consume message created by producer
const createConsumer = async (req,res,next) => {
    Consumer = kafka.Consumer,
        client = new kafka.KafkaClient(),
        consumer = new Consumer(client,
            [{ topic: 'USERINFORMATION', offset: 0 }],
            {
                autoCommit: false
            }
        );  

    consumer.on('message', function (message) {
        console.log(message.value);
    });
    consumer.on('error', function (err) {
        console.log('Error:', err);
    });
    consumer.on('offsetOutOfRange', function (err) {
        console.log('offsetOutOfRange:', err);
    });

    next()
}

module.exports = { createConsumer };