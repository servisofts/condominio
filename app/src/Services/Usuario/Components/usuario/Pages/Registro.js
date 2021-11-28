import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad,SView, SIcon } from 'servisofts-component';
import Parent from '../index'
import Kolping from '../../../../../Components/Kolping';
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
                customStyle: "kolping"
            }}
            inputs={{
                Nombres: { label: "Nombres", isRequired: true, defaultValue: this.usr.Nombres, icon: <SIcon name={"InputUser"} width={40} height={30} /> },
                Apellidos: { label: "Apellidos",isRequired: true, defaultValue: this.usr.Apellidos, icon: <SIcon name={"InputUser"} width={40} height={30} />  },
                Correo: { label: "Correo",isRequired: true, defaultValue: this.usr.Correo, icon: <SIcon name={"InputEmail"} width={40} height={30} />  },
                "Fecha de nacimiento": { label: "Fecha de nacimiento", type: "date", isRequired: true, defaultValue: this.usr["Fecha de nacimiento"],icon: <SIcon name={"InputRePassword"} width={40} height={30} />  },
                Telefono: { label: "Telefono",isRequired: true, defaultValue: this.usr.Telefono, type:"phone", },
                Password: { label: "Password",isRequired: true, type: "password",defaultValue: this.usr.Password, icon: <SIcon name={"InputPassword"} width={40} height={30} />  },
                RepPassword: { label: "Repetir password", type: "password", isRequired: true, defaultValue: this.usr.Password,icon: <SIcon name={"InputRePassword"} width={40} height={30} />  },

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
        return (
            <SPage title={'Registro de '+Parent.component} center>
                <SView height={30}></SView>
                {this.getContent()}
                <SHr height={25}/>
                <Kolping.KButtom 
                style={{color: '#fff'}}
                    props={{
                        type: "outline"
                    }}
                    onPress={() => { this.form.submit() }}
                >{(this.key ? "Editar" : "Registrar")}</Kolping.KButtom>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);