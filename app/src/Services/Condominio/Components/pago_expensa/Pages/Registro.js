import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SNavigation, SPage, SText, SView, SButtom, SLoad, SPopup } from 'servisofts-component';
import Parent from '../index';
import SSocket from 'servisofts-socket'
import usuario from '../../../../Usuario/Components/usuario';
import vivienda from '../../vivienda';
import expensa from '../../expensa';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_condominio = SNavigation.getParam("key_condominio");
        this.key_vivienda = SNavigation.getParam("key_vivienda");
        this.key_expensa = SNavigation.getParam("key_expensa");
    }

    getContent() {
        this.data = {};
        var viviendas = vivienda.Actions.getAll(this.key_condominio, this.props);
        var expensav = expensa.Actions.getByKey(this.key_expensa, this.key_condominio, this.props);
        if (!viviendas) return <SLoad />;
        if (!expensav) return <SLoad />;
        var viviendasTXT = "";
        // if (this.key) {
        //     this.data = Parent.Actions.getByKey(this.key, this.key_vivienda, this.props);
        //     if (!this.data) return <SLoad />
        //     var key_usuario_habita = this.data.key_usuario_habita;
        //     if (key_usuario_habita) {
        //         usuarioLBL = usuarios[key_usuario_habita].Nombres + " " + usuarios[key_usuario_habita].Apellidos;
        //     }
        // }
        if (this.state.key_vivienda) {
            viviendasTXT = viviendas[this.state.key_vivienda].nombre;
        }
        var key_vivienda_final = this.state.key_vivienda

        return <SForm
            ref={(form) => { this.form = form; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "calistenia",
            }}
            inputs={{
                
                vivienda: {
                    label: "vivienda", value: viviendasTXT, editable: false,
                    onPress: () => {
                        SNavigation.navigate("vivienda/select", {
                            key_condominio: this.key_condominio,
                            onSelect: (keyR) => {
                                this.setState({ key_vivienda: keyR });
                            }
                        })
                    }
                },
                monto: { label: "monto", isRequired: true, type: "money", defaultValue: parseFloat(expensav.monto).toFixed(2) },
                descripcion: { label: "descripcion", type: "textArea", defaultValue: this.data["descripcion"] },
                foto_p: {label:"Comprobante", type: "image", isRequired: false, defaultValue: `${SSocket.api.root}${Parent.component}/${this.key}`, height:200, },
            }}
            onSubmit={(values) => {
                if (!this.state.key_vivienda) {
                    SPopup.alert("Seleccione una vivienda");
                    return;
                }
                if (key_vivienda_final) {
                    values.key_vivienda = key_vivienda_final;
                }
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.data,
                        ...values
                    }, this.props);

                } else {
                    values.key_expensa = this.key_expensa;
                    Parent.Actions.registro(values, this.props);
                }
            }}
        />
    }

    render() {
        if (Parent.Actions._getEstadoByType("registro", this.props) == "exito") {
            Parent.Actions._setEstado("", this.props);
            if (this.form) {
                var lastsend = Parent.Actions._getReducer(this.props).lastRegister;
                this.form.uploadFiles(SSocket.api.root + "upload/" + Parent.component + "/" + lastsend.key);
            }
            SNavigation.goBack();
        }
        if (Parent.Actions._getEstadoByType("editar", this.props) == "exito") {
            Parent.Actions._setEstado("", this.props);
            SNavigation.goBack();
        }
        return (
            <SPage title={'Registro de ' + Parent.component} center>
                <SView height={30}></SView>
                {this.getContent()}
                <SHr />
                <SButtom
                    style={{ color: '#fff' }}
                    props={{
                        type: "outline"
                    }}
                    onPress={() => { this.form.submit() }}
                >{(this.key ? "Editar" : "Registrar")}

                </SButtom>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);