
import java.io.FileReader;
import java.nio.charset.StandardCharsets;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.xml.namespace.QName;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Servisofts.SConfig;


public class Email extends Thread {

    /*
     * asunto para pass
     */
    private String host;
    private String port;
    private String user;
    private String pass;

    private JSONObject data;
    private JSONArray mailTo;

    public Email(JSONArray mailTo, JSONObject data) {
        this.data = data;
        JSONObject mail_server = SConfig.getJSON("mail_server");
        this.mailTo = mailTo;
        this.host = mail_server.getString("host");
        this.port = mail_server.getInt("port") + "";
        this.user = mail_server.getString("email");
        this.pass = mail_server.getString("password");
        this.start();
    }

    // public static void main(String[] args) {
    // JSONObject obj = new JSONObject();
    // obj.put("correo", "ricky.paz.d.97@gmail.com");
    // new EmailRegistroUsr(obj).start();
    // }

    @Override
    public void run() {
        try {
            Properties props = new Properties();
            props.setProperty("mail.smtp.host", this.host);
            props.put("mail.smtp.ssl.enable", "true");
            props.setProperty("mail.smtp.port", this.port);
            props.setProperty("mail.smtp.user", this.user);
            props.setProperty("mail.smtp.auth", "true");
            Session session = Session.getDefaultInstance(props);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(this.user));
            for (int i = 0; i < this.mailTo.length(); i++) {
                message.addRecipient(Message.RecipientType.TO, new InternetAddress(this.mailTo.getString(i)));
            }
            message.setSubject(this.data.getString("subject"));
            String html = getHtml(this.data.getString("path"));

            for (int i = 0; i < JSONObject.getNames(this.data.getJSONObject("replaces")).length; i++) {
                String cod = JSONObject.getNames(this.data.getJSONObject("replaces"))[i];
                html= html.replaceAll(cod, this.data.getJSONObject("replaces").getString(cod));
            }

            message.setContent(html, "text/html; charset=UTF-8");
            Transport t = session.getTransport("smtp");
            t.connect(this.user, this.pass);
            t.sendMessage(message, message.getAllRecipients());
            t.close();
            System.out.println("Correo enviado a " + this.mailTo);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private static String getHtml(String path) throws JSONException {
        String cuerpo = "";
        try {
            FileReader file;
            file = new FileReader(path, StandardCharsets.UTF_8);
            int valor = file.read();
            String configJson = "";
            while (valor != -1) {
                configJson = String.valueOf(((char) valor));
                cuerpo = cuerpo + configJson;
                valor = file.read();
            }
            file.close();
            // cuerpo = cuerpo.replaceAll("usuarioServisofts", data.getString("correo"));
            // cuerpo = cuerpo.replaceAll("passServisofts", data.getString("pass"));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return cuerpo;
    }
}
