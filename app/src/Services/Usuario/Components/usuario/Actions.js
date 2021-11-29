import SSocket from 'servisofts-socket';
import Parent from './index';
import Service from '../../index';
import { SNavigation } from 'servisofts-component';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }
    static validateSession(props,preventRedirect) {
        var reducer = Actions._getReducer(props);
        var data = reducer.usuarioLog;
        if (!data) {
            if(preventRedirect) return null;
            SNavigation.replace("carga");
            return null;
        }
        return data;

    }
    static login(data) {
        var object = {
            service: Service.ServiceName,
            component: "usuario",
            version: "2.0",
            type: "login",
            estado: "cargando",
            data: data,
        }
        // alert(JSON.stringify(object));
        SSocket.send(object);
    }
    static getAll = (props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                service: Service.ServiceName,
                component: Parent.component,
                version: Parent.version,
                type: "getAll",
                estado: "cargando",
                key_usuario: "",
                cabecera: "usuario_app"
            })
            return null;
        }
        return data;
    }

    static getByKey = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return data[key];
    }

    static registro = (data, props) => {
        SSocket.send({
            service: Service.ServiceName,
            component: Parent.component,
            version: Parent.version,
            type: "registro",
            estado: "cargando",
            key_usuario: "",
            cabecera: "usuario_app",
            data: data
        })
    }
    static editar = (data, props) => {
        SSocket.send({
            service: Service.ServiceName,
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: "",
            cabecera: "usuario_app",
            data: data
        })
    }
    static eliminar = (data, props) => {
        SSocket.send({
            service: Service.ServiceName,
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: "",
            cabecera: "usuario_app",
            data: {
                ...data,
                estado: 0,
            }
        })
    }
}