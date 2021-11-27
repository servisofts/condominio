import java.io.Console;
import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConsole;
import component.*;

public class Manejador {
    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        SConsole.log(session.getIdSession(), "\t|\t", obj.getString("component"), obj.getString("type"));
        if (obj.isNull("component")) {
            return;
        }
        switch (obj.getString("component")) {
            
        }
    }
}
