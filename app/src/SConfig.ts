import { SThemeThemes } from 'servisofts-component'
const SThemeProps: SThemeThemes = {
    default: {
        barStyle: "light-content",
        barColor: "#eeeeee",
        text: "#000000",
        primary: "#eeeeee",
        secondary: "#000000",
        background: "#eeeeee",
        card: "#CCC6C666"
    },
    dark: {
        barStyle: "light-content",
        barColor: "#000000",
        text: "#ffffff",
        primary: "#000000",
        secondary: "#ffffff",
        background: "#000000",
        card: "#44000066"
    }
}

const SocketProps = {
    name: 'condominio',
    host: '192.168.0.199',
    port: {
        native: 10024,
        web: 20024,
        http: 30024,
    },
    ssl: false,
    cert: "MIID0DCCArigAwIBAgIEYUpp/TANBgkqhkiG9w0BAQsFADCBqTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxDzANBgNVBAsMBmJhdGVvbjEeMBwGA1UEAwwVYmF0ZW9uLnNlcnZpc29mdHMuY29tMScwJQYJKoZIhvcNAQkBFhhyaWNreS5wYXouZC45N0BnbWFpbC5jb20wHhcNMjEwOTIxMjMyNTQ5WhcNMjEwOTIyMjMyNTQ5WjCBqTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxDzANBgNVBAsMBmJhdGVvbjEeMBwGA1UEAwwVYmF0ZW9uLnNlcnZpc29mdHMuY29tMScwJQYJKoZIhvcNAQkBFhhyaWNreS5wYXouZC45N0BnbWFpbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCyN4KWQKCFn0Y0e4ONqgDSRnaNGqC9A8Y1ehptdKSlkWLfFJEHeHwE/fdlRnIEDG3XLkjQAehiTCkyH16cw69EuLAn1bAXjjODIMxWZA/oGyKurfwobCw7asBxXnHGwsWELorSKm5ZK1aeMBaLHiXSIjCJr+KlreHQAOKuy0BAOSXJ92DUdxo7fqgB0DhyA/sB/R9J0ofmnmCR62v22Qn2YsRObVp/0k1ggWaxYriDxhwOk0ajOVaP1QpJgFv8SQSagYksP19XIq5dE2e+7k175lBHEDfLyZinhava9dvguAtOXd5xzVabbDjolaMeeDoZ8RwzpRX2Ga+1Y9BZoVQrAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAAWNco7JrXTw68kl0rnvOLOZZ+djO8Z7P/6WVbytrRV8S4QGZ4NM/t7BikpIhK6IFzulNEhV61MQ0Jy2bnBnzNvLLugnGRqH4JTwgITkGiA5dvawMucXLy+tFQ5ccSM7I/24ITCr52Qriy7WQV6KJkY2O4gvukDISeUPsl/e9NA2EZUgywa/vY3NXnwCYiIOMaoGcX7Yykj0i9lAnUSpaG+IhS7YKTbV5V8Ii1SImbRfpVbIGk2wj7Set2s4w5XtgYTOz7o5TcB9MWlOLp9eLXg9W5LAdPQG6633wlb49Wf91DhhVGmVJmYFtsGAd2TAXmosg3FasLYGd9kpzVzAyUk=",
    apis: {
        servicio: "http://servicio.ss.lo/http/",
        roles_permisos: "http://roles_permisos.ss.lo/http/"
    }
}
export default {
    SocketProps,
    SThemeProps
}