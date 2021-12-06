import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SNavigation, SPage, SText, SView, SButtom, SLoad, SPopup } from 'servisofts-component';
import Parent from '../index';
import SSocket from 'servisofts-socket'
import usuario from '../../../../Usuario/Components/usuario';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_condominio = SNavigation.getParam("key_condominio");
        this.key_vivienda = SNavigation.getParam("key_vivienda");
    }

    getContent() {
        this.data = {};
        var usuarios = usuario.Actions.getAll(this.props);
        if (!usuarios) return <SLoad />;
        var usuarioLBL = "";
        if (this.key) {
            this.data = Parent.Actions.getByKey(this.key, this.key_vivienda, this.props);
            if (!this.data) return <SLoad />
            var key_usuario_habita = this.data.key_usuario_habita;
            if (key_usuario_habita) {
                usuarioLBL = usuarios[key_usuario_habita].Nombres + " " + usuarios[key_usuario_habita].Apellidos;
            }
        }
        if (this.state.key_usuario_habita) {
            usuarioLBL = usuarios[this.state.key_usuario_habita].Nombres + " " + usuarios[this.state.key_usuario_habita].Apellidos;
        }

        return <SForm
            ref={(form) => { this.form = form; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                foto_p: { type: "image", isRequired: false, defaultValue: `${SSocket.api.root}${Parent.component}/${this.key}` },
                usuario: {
                    label: "usuario",  value: usuarioLBL, defaultValue: usuarioLBL, editable: false,
                    onPress: () => {
                        SNavigation.navigate("usuario/select", {
                            onSelect: (key) => {
                                this.setState({ key_usuario_habita: key });
                            }
                        })
                    }
                },
                tipo: { label: "tipo", isRequired: true, type: "select", defaultValue: this.data["tipo"], options: ["", "Propietario", "Inquilino", "Invitado"] },
                descripcion: { label: "descripcion", type: "textArea", defaultValue: this.data["descripcion"] },
            }}
            onSubmit={(values) => {
                if (this.state.key_usuario_habita) {
                    values.key_usuario_habita = this.state.key_usuario_habita;
                }
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.data,
                        ...values
                    }, this.props);

                } else {
                    Parent.Actions.registro(values, this.key_vivienda, this.props);
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
            if (this.form) {
                this.form.uploadFiles(SSocket.api.root + "upload/" + Parent.component + "/" + this.key);
            }
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