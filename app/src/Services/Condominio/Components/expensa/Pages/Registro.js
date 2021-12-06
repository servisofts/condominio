import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SNavigation, SPage, SText, SView, SButtom, SLoad } from 'servisofts-component';
import Parent from '../index';
import SSocket from 'servisofts-socket'
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_condominio = SNavigation.getParam("key_condominio");
    }

    getContent() {
        this.data = {};
        if (this.key) {
            this.data = Parent.Actions.getByKey(this.key, this.key_condominio, this.props);
            if (!this.data) return <SLoad />
        }
        return <SForm
            ref={(form) => { this.form = form; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                // foto_p: { type: "image", isRequired: false, defaultValue: `${SSocket.api.root}${Parent.component}/${this.key}` },
                fecha: { label: "fecha", isRequired: true, type: "date", defaultValue: this.data["fecha"] },
                monto: { label: "monto", isRequired: true, type: "money", defaultValue: this.data["monto"] ? parseFloat(this.data["monto"]).toFixed(2) : "" },
                descripcion: { label: "descripcion", type: "textArea", defaultValue: this.data["descripcion"] },

            }}
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.data,
                        ...values
                    }, this.props);

                } else {
                    Parent.Actions.registro(values, this.key_condominio, this.props);
                }
            }}
        />
    }

    render() {
        if (Parent.Actions._getEstadoByType("registro", this.props) == "exito") {
            Parent.Actions._setEstado("", this.props);
            if (this.form) {
                // this.form.uploadFiles(SSocket.api.root + "upload/" + Parent.component + "/" + this.key);
            }
            SNavigation.goBack();
        }
        if (Parent.Actions._getEstadoByType("editar", this.props) == "exito") {
            Parent.Actions._setEstado("", this.props);
            if (this.form) {
                // this.form.uploadFiles(SSocket.api.root + "upload/" + Parent.component + "/" + this.key);
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