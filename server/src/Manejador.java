  import org.json.JSONObject;

import Component.Condominio;
import Component.Expensa;
import Component.Habitante;
import Component.PagoExpensa;
import Component.Vivienda;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConsole;

public class Manejador {
    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        if(session != null){
            SConsole.log(session.getIdSession(), "\t|\t", obj.getString("component"), obj.getString("type"));
        }
        if (obj.isNull("component")) {
            return;
        }
        switch (obj.getString("component")) {
            case Condominio.tableName:
                new Condominio(obj, session);
            break;
            case Vivienda.tableName:
                new Vivienda(obj, session);
            break;
            case Habitante.tableName:
                new Habitante(obj, session);
            break;
            case Expensa.tableName:
                new Expensa(obj, session);
            break;
            case PagoExpensa.tableName:
                new PagoExpensa(obj, session);
            break;
        }
    }
}