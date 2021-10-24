const { Kafka, CompressionTypes, logLevel } = require('../../node_modules/kafkajs/index')
const express = require('express')
const app = express()
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})
const producer = kafka.producer()
app.use(express.json())

app.get('/createMessage', async (req, res) => {
    const topicName=req.query.TOPIC_NAME;
    const message=[{
        "key":"Name",
        "value":"Sai"
    }]
    const sendMessage=()=>{
        return producer.send(
            {
                topic:topicName,
                compression: CompressionTypes.GZIP,
                messages:message
            }
        ).then(console.log).catch(e=>console.log("ERROR "+e.message));
    }
    const run = async () => {
        await producer.connect()
        setInterval(sendMessage, 3000)
    }
    run().catch(e => console.error(`[example/producer] ${e.message}`, e))
    res.send("vetri");
});
app.listen(3001)
