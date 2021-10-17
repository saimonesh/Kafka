const { Kafka } = require('kafkajs')

const express = require('express')
const app = express()
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})
const admin = kafka.admin()
app.use(express.json())

app.get('/getTopics', async (req, res) => {

    const result = await admin.listTopics();
    res.send(result);
});
app.delete('/deleteTopic', async (req, res) => {
    try {
        console.log(req.query.topicName);
        await admin.deleteTopics({ "topics": [req.query.topicName] });
        res.send("Successfully Deleted");
    } catch (err) {
        res.send("Unable to Delete");
    }
})
app.delete('/deleteAllTopics', async (req, res) => {
    try {
        const topics = await admin.listTopics();
        await admin.deleteTopics({ "topics": topics });
        res.send("Deleted ALL Topics");
    } catch (err) {
        res.send("Some error " + err);
    }
})
app.post('/createTopic', async (req, res) => {
    try {
        const { TOPIC_NAMES } = req.body;
        console.log(TOPIC_NAMES);

        await admin.createTopics(
            {
                topics: TOPIC_NAMES
            })
        res.send("CREATED THE TOPICS " + TOPIC_NAMES);
    } catch (err) {
        res.send("Unable to Create Because of " + err);
    }
});
app.listen(3000)
