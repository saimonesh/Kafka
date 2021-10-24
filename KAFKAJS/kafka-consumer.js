const { Kafka } = require('kafkajs')

const express = require('express')
const app = express()
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})
const consumer = kafka.consumer({ groupId: 'test-group' })
app.use(express.json())

app.get('/createSubscription', async (req, res) => {
    const topicName=req.query.TOPIC_NAME;
    const run = async () => {
        await consumer.connect()
        await consumer.subscribe({topic:topicName, fromBeginning: true })
        await consumer.run({
          // eachBatch: async ({ batch }) => {
          //   console.log(batch)
          // },
          eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
          },
        })
    }
    run();
    res.send("finish");
});
app.listen(3002)
