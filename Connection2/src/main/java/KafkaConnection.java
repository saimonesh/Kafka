import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Properties;

public class KafkaConnection {
    static String client_id_val = null;
    private static String getClientIDVal()
    {
        if(client_id_val==null)
        {
            try {
                client_id_val = InetAddress.getLocalHost().getHostName();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }
        return client_id_val;
    }

    private static Properties getProps() {
        Properties config = new Properties();
        try {
            config.put(ProducerConfig.CLIENT_ID_CONFIG, getClientIDVal());
            config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
            config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
            config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
            config.put(ProducerConfig.ACKS_CONFIG, "all");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return config;
    }

    private static void makeProducerConnection() {
        producer = new KafkaProducer(getProps());
    }

    private static void makeConsumerConnection() {
        consumer = new KafkaConsumer(getProps());
    }

    private static KafkaProducer producer = null;
    private static KafkaConsumer consumer = null;

    public synchronized static KafkaProducer getProducerInstance() {
        if (producer == null) {
            makeProducerConnection();
        }
        return producer;
    }

    public synchronized static KafkaConsumer getConsumerInstance() {
        if (consumer == null) {
            makeConsumerConnection();
        }
        return consumer;
    }
}
