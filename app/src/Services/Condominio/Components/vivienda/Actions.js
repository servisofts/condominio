import SSocket from 'servisofts-socket';
import Parent from './index';
import Service from '../../index';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }
    static _getEstadoByType = (type, props) => {
        var reducer = Actions._getReducer(props);
        if (reducer.type != type) return "";
        return reducer.estado;
    }
    static _setEstado = (estado, props) => {
        var reducer = Actions._getReducer(props);
        reducer.estado = estado;
    }
    static getAll = (key_condominio, props) => {
        var reducer = Actions._getReducer(props);
        if (reducer.key_condominio != key_condominio) {
            reducer.data = null;
        }
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            reducer.key_condominio = key_condominio;
            SSocket.send({
                // service: Service.ServiceName,
                component: Parent.component,
                version: Parent.version,
                type: "getAll",
                estado: "cargando",
                key_condominio: key_condominio,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return null;
        }
        return data;
    }

    static getByKey = (key, key_condominio, props) => {
        var data = Actions.getAll(key_condominio, props);
        if (!data) return null;
        return data[key];
    }

    static registro = (data, key_condominio, props) => {
        var reducer = Actions._getReducer(props);
        if (reducer.type == "registro" && reducer.estado == "cargando") return;
        SSocket.send({
            // service: Service.ServiceName,
            component: Parent.component,
            version: Parent.version,
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                ...data,
                key_condominio: key_condominio,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }
        })
    }
    static editar = (data, props) => {
        var reducer = Actions._getReducer(props);
        if (reducer.type == "editar" && reducer.estado == "cargando") return;
        SSocket.send({
            // service: Service.ServiceName,
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                ...data,
            }
        })
    }
    static eliminar = (data, props) => {
        SSocket.send({
            // service: Service.ServiceName,
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                ...data,
                estado: 0,
            }
        })
    }
}