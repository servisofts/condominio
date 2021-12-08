import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
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
                //             <SImage src={SSocket.api.root + Parent.component + "/" + key}  enablePreview/>
                //         </SView>
                //     }
                // },
                { key: "nombre", label: "nombre", width: 150, order: "asc", center: true },
                { key: "descripcion", label: "Descripcion", width: 200 },
                // { key: "mts2", label: "mts2", width: 100, center: true },
                {
                    key: "key-select", label: "Seleccionar", width: 50, center: true, component: (item) => {
                        return <SView onPress={() => {
                            var onSelect = SNavigation.getParam("onSelect");
                            if (onSelect) onSelect(item);
                            SNavigation.goBack();
                        }}> <SIcon name={"Add"} width={35} /></SView>
                    }
                },


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