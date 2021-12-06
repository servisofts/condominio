import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad,SView, SIcon, SPopup } from 'servisofts-component';
import Parent from '../index'
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
    }
    getContent() {
        this.usr = {};
        if (this.key) {
            this.usr = Parent.Actions.getByKey(this.key, this.props);
            if (!this.usr) return <SLoad />
        }
        return <SForm
            ref={(form) => { this.form = form; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                CI: { label: "CI", defaultValue: this.usr.CI, },
                Nombres: { label: "Nombres", isRequired: true, defaultValue: this.usr.Nombres, },
                Apellidos: { label: "Apellidos",isRequired: true, defaultValue: this.usr.Apellidos,  },
                Correo: { label: "Correo",isRequired: true, defaultValue: this.usr.Correo,  },
                "Fecha de nacimiento": { label: "Fecha de nacimiento", type: "date", isRequired: true, defaultValue: this.usr["Fecha de nacimiento"]  },
                Telefono: { label: "Telefono", defaultValue: this.usr.Telefono?this.usr.Telefono:" ", type:"phone", },
                Password: { label: "Password",isRequired: true, type: "password",defaultValue: this.usr.Password,  },
                // RepPassword: { label: "Repetir password", type: "password", isRequired: true, defaultValue: this.usr.Password  },

            }}
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.usr,
                        ...values
                    }, this.props);
                } else {
                    Parent.Actions.registro(values, this.props);
                }
            }}
        />
    }
    render() {
        var reducer = this.props.state.usuarioReducer;
        if(reducer.type =="registro" && reducer.estado=="exito"){
            // SNavigation.goBack();
            SPopup.alert("exito");
        }
        if(reducer.type =="editar" && reducer.estado=="exito"){
            // SNavigation.goBack();
            SPopup.alert("exito");
        }
        if(reducer.type =="registro" && reducer.estado=="error"){
            reducer.estado = "";
            SPopup.alert(JSON.stringify(reducer.error));
            // SPopup.alert("El usuario ya existe");
        }

        return (
            <SPage title={'Registro de '+Parent.component} center>
                <SView height={30}></SView>
                {this.getContent()}
                <SHr height={25}/>
                <SButtom 
                style={{color: '#fff'}}
                    props={{
                        type: "outline"
                    }}
                    onPress={() => { this.form.submit() }}
                >{(this.key ? "Editar" : "Registrar")}</SButtom>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);