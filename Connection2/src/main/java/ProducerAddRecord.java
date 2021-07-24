import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Map;

public class ProducerAddRecord {
    private final String TOPIC = "quickstart-events";
    private final Map<String, Object> record;

    ProducerAddRecord(Map<String, Object> records) {
        this.record = records;
    }

    public void addRecord() {
        for (String key : record.keySet()
        ) {
            ProducerRecord record = new ProducerRecord(this.TOPIC, key, this.record.get(key));
            KafkaConnection.getProducerInstance().send(record, (recordMetadata, e) -> {
                if (e == null) {
                    System.out.println("Added Successfully");
                }
            });
        }

    }
}
