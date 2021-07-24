import org.json.JSONObject;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Object> dataSet = new HashMap<>();
        dataSet.put("1", new JSONObject().put("String", "ALL").toString());
        dataSet.put("2", new JSONObject().put("Array", Arrays.asList("hello", 1, 2.5f, new JSONObject().put("1", 1), false)).toString());
        new ProducerAddRecord(dataSet).addRecord();

    }
}
