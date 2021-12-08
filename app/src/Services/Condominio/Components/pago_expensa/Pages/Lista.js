import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket'
import { SImage } from 'servisofts-component';
import usuario from '../../../../Usuario/Components/usuario';
import { SButtom } from 'servisofts-component';
import vivienda from '../../vivienda';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_condominio = SNavigation.getParam("key_condominio");
        this.key_vivienda = SNavigation.getParam("key_vivienda");
        this.key_expensa = SNavigation.getParam("key_expensa");
    }

    getContent() {
        var data = Parent.Actions.getAll(this.key_vivienda, this.key_expensa, this.props);
        var usuarios = usuario.Actions.getAll(this.props);
        var viviendaObj = vivienda.Actions.getAll(this.key_condominio, this.props);
        if (!data) return <SLoad />;
        if (!usuarios) return <SLoad />;
        if (!viviendaObj) return <SLoad />;
        console.log(viviendaObj);
        return <STable2
            header={[
                { key: "index", label: "#", width: 50 },
                {
                    key: "key-foto", label: "Foto", width: 70, center: true, component: (key) => {
                        return <SView width={40} height={40} onPress={() => {
                        }}>
                            <SImage src={SSocket.api.root + Parent.component + "/" + key} enablePreview/>
                        </SView>
                    }
                },
                {
                    key: "key_vivienda", label: "Vivienda", width: 200, center: true, render: (key) => {
                        if (!viviendaObj[key]) return key;
                        return `${viviendaObj[key].nombre}`
                    }
                },

                { key: "monto", label: "Monto", width: 150, center: true, render: (key) => `Bs. ${key}` },
                { key: "descripcion", label: "Descripcion", width: 300 },
                {
                    key: "key_usuario", label: "Administrador", width: 200, center: true, render: (key) => {
                        if (!usuarios[key]) return "";
                        return `${usuarios[key]["Nombres"]} ${usuarios[key]["Apellidos"]}`
                    }
                },
                { key: "fecha_on", label: "Fecha pago", width: 150, render: (key) => new SDate(key).toString("yyyy-MM-dd hh:mm") },
                // { key: "key-editar", label: "Editar", width: 50, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate(Parent.component + "/registro", { key: item, key_vivienda: this.key_vivienda }) }}> <SIcon name={"Edit"} width={35} /></SView> } },
                {
                    key: "key-eliminar", label: "Elimnar", width: 50, center: true, component: (item) => {
                        return <SView onPress={() => {
                            SPopup.confirm({
                                title: "Seguro que desea eliminar?", onPress: () => {
                                    Parent.Actions.eliminar(data[item], this.props);
                                }
                            })
                        }}> <SIcon name={"Delete"} width={35} />
                        </SView>
                    }
                },

            ]}
            data={data}
            filter={(item) => {
                return item.estado == "1";
            }}
        />
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll center>
                {this.getContent()}


                <SButtom type={"float"} onPress={() => {
                    SNavigation.navigate(Parent.component + "/registro", { key_vivienda: this.key_vivienda, key_expensa: this.key_expensa, key_condominio: this.key_condominio })
                }}>
                    <SIcon name={"Add"} height={50} />
                </SButtom>


            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);