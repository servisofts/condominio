import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SNavigation, SOrdenador, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket'
import { SImage } from 'servisofts-component';
import usuario from '../../../../Usuario/Components/usuario';
import { SButtom } from 'servisofts-component';
import habitante from '../../habitante';
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_condominio = SNavigation.getParam("key_condominio");
    }

    getContent() {
        var data = Parent.Actions.getAll(this.key_condominio, this.props);
        var habitantes = habitante.Actions.getAllByKeyCondominio(this.key_condominio, this.props);
        var usuarios = usuario.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        if (!habitantes) return <SLoad />;
        if (!usuarios) return <SLoad />;
        return new SOrdenador([{ key: "nombre", order: "asc" }]).ordernarObject(data).map((key, index) => {
            var obj = data[key];
            var habitantes_vivienda = habitantes[obj.key];
            var cantidad_habitantes = habitantes_vivienda ? Object.keys(habitantes_vivienda).length : 0;
            return <>
                <SView col={"xs-6 md-4 xl-3"} height={100} center style={{
                    padding: 8,
                }}>
                    <SView col={"xs-12"} height card center>
                        <SText fontSize={18} bold>{obj.nombre}</SText>
                        <SText>{obj.descripcion}</SText>
                        <SText color={STheme.color.darkGray}>{`# Habitantes: ${cantidad_habitantes}`}</SText>
                    </SView>
                </SView>
            </>
        })
    }

    render() {
        return (
            <SPage title={'Card de ' + Parent.component} center>
                <SHr height={50} />
                <SView row col={"xs-11"}>
                    {this.getContent()}
                </SView>
                <SHr height={50} />
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Card);