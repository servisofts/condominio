import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket'
import { SImage } from 'servisofts-component';
import usuario from '../../../../Usuario/Components/usuario';
import { SButtom } from 'servisofts-component';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_condominio = SNavigation.getParam("key_condominio");
    }

    getContent() {
        var data = Parent.Actions.getAll(this.key_condominio, this.props);
        var usuarios = usuario.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        if (!usuarios) return <SLoad />;
        return <STable2
            header={[
                { key: "index", label: "#", width: 50 },
                // {
                //     key: "key-foto", label: "Foto", width: 70, center: true, component: (key) => {
                //         return <SView width={40} height={40} onPress={() => {
                //         }}>
                //             <SImage src={SSocket.api.root + Parent.component + "/" + key} />
                //         </SView>
                //     }
                // },
                { key: "fecha", label: "Fecha", width: 80, order: "desc", center: true, render: (val) => new SDate(val).toString("yyyy-MM") },
                { key: "fecha-ano", label: "Año", width: 50, render: (val) => new SDate(val).toString("yyyy") },
                { key: "fecha-mes", label: "Mes", width: 100, render: (val) => new SDate(val).toString("MONTH") },
                { key: "monto", label: "Monto", width: 150, center: true, render: (val) => `Bs. ${parseFloat(val).toFixed(2)}` },
                { key: "descripcion", label: "Descripcion", width: 200 },
                // {
                //     key: "key_usuario", label: "Usuario", width: 150, center: true, render: (key) => {
                //         if (!usuarios[key]) return "";
                //         return `${usuarios[key]["Nombres"]} ${usuarios[key]["Apellidos"]}`
                //     }
                // },
                { key: "key-editar", label: "Editar", width: 50, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate(Parent.component + "/registro", { key: item, key_condominio: this.key_condominio }) }}> <SIcon name={"Edit"} width={35} /></SView> } },
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
                {
                    key: "key-pagos", label: "Pagos", width: 50, center: true,
                    component: (item) => {
                        return <SView
                            onPress={() => {
                                SNavigation.navigate("pago_expensa", { key_expensa: item, key_condominio: this.key_condominio })
                            }}> <SIcon name={"Money"} width={35} /></SView>
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
                    SNavigation.navigate(Parent.component + "/registro", { key_condominio: this.key_condominio })
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