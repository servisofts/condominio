import org.json.JSONObject;

public class ManejadorCliente {
    public static void onMessage(JSONObject data, JSONObject config) {
        if (data.isNull("component")) {
            data.put("error", "No existe el componente");
            return;
        }
        if(data.has("estado")){
            if(data.getString("estado").equals("error")){
                System.out.println(data.getString("error"));
            }
        }
    }

}
