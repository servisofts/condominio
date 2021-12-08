import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket'
import { SImage } from 'servisofts-component';
import usuario from '../../../../Usuario/Components/usuario';
import { SButtom } from 'servisofts-component';
import condominio from '../../condominio';
class MisCondominios extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.key_condominio = SNavigation.getParam("key_condominio");
    }

    getContent() {
        var usrLog = usuario.Actions.validateSession(this.props);
        var data = Parent.Actions.getAll(null, usrLog.key, this.props);
        var condominios = condominio.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        if (!condominios) return <SLoad />;
        return <STable2
            header={[
                { key: "index", label: "#", width: 50 },
                {
                    key: "key_condominio-foto", label: "Foto", width: 70, center: true, component: (key) => {
                        return <SView width={40} height={40} onPress={() => {
                        }}>
                            <SImage src={SSocket.api.root + "condominio/" + key} enablePreview/>
                        </SView>
                    }
                },
                {
                    key: "key_condominio", label: "Condominio", width: 150, center: true, render: (key) => {
                        if (!condominios[key]) return "";
                        return `${condominios[key]["nombre"]}`
                    }
                },
                // { key: "key_condominio-editar", label: "Editar", width: 70, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate("condominio/registro", { key: item }) }}> <SIcon name={"Edit"} width={35} /></SView> } },
                { key: "key_condominio-vivienda", label: "Vivienda", width: 70, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate("vivienda/card", { key_condominio: item }) }}> <SIcon name={"Ajustes"} width={35} /></SView> } },
                { key: "key_condominio-expensa", label: "Expensa", width: 70, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate("expensa", { key_condominio: item }) }}> <SIcon name={"Money"} width={35} /></SView> } },
            ]}
            limit={50}
            data={data}
            filter={(item) => {
                return item.estado == "1";
            }}
        />
    }

    render() {
        return (
            <SPage title={'MisCondominios de ' + Parent.component} disableScroll center>
                {this.getContent()}



            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(MisCondominios);