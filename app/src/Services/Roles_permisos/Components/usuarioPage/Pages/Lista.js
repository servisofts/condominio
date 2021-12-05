import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SImage, SLoad, SNavigation, SPage, STable2, SText, SView } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket'
import usuario from '../../../../Usuario/Components/usuario';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getContent() {
        var key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
        var data = Parent.Actions.getAll(key_usuario, this.props);
        if (!data) return <SLoad />;
        return Object.keys(data).map((key) => {
            var obj = data[key];
            return <SView width={150} height={150} style={{
                padding: 12,
            }}>
                <SView col={"xs-12"} height center style={{
                    overflow: "hidden",
                }} onPress={()=>{
                    SNavigation.navigate(obj.url)
                }}>
                    <SView flex col={"xs-12"}>
                        <SImage src={`${SSocket.api.roles_permisos}page/${obj.key}`} style={{
                            // resizeMode: 'cover',
                        }} />
                    </SView>
                    <SView col={"xs-12"} height={34} center>
                        <SText secondary bold>{obj.descripcion}</SText>
                    </SView>
                </SView>
            </SView>
        })
    }
    render() {
        if(!usuario.Actions.validateSession(this.props)){
            return <SLoad/>
        }
        return (
            <SPage title={'Inicio'} preventBack>
                <SView col={"xs-12"} row>
                    {this.getContent()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);