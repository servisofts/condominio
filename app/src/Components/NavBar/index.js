import React, { Component } from 'react';
import { Animated } from 'react-native';
import { SButtom, SView, SImage, SDate, SNavigation, STheme, SIcon, SText } from 'servisofts-component';
import { connect } from 'react-redux';
// import SSocket from 'servisofts-socket';
// import CerrarSession from '../../Pages/Usuario/Page/Perfil/CerrarSession';


class NavBar extends Component {
    static INSTACE = null;
    static open() {
        NavBar.INSTACE.fadeIn();
    }
    static close() {
        NavBar.INSTACE.fadeOut();
    }

    constructor(props) {
        super(props);
        this.state = {
            timeAnim: 350,
            isOpen: false,
        };
        NavBar.INSTACE = this;
        this.animSize = new Animated.Value(0);
    }

    fadeIn() {
        this.setState({ isOpen: true });
        Animated.timing(this.animSize, {
            toValue: 1,
            duration: this.state.timeAnim,
            // useNativeDriver: true
        }).start();
    }

    fadeOut() {

        Animated.timing(this.animSize, {
            toValue: 0,
            duration: this.state.timeAnim,
            // useNativeDriver: true
        }).start(() => {
            this.setState({ isOpen: false });
        });
    }



    getNav() {
        var usuario= this.props.state.usuarioReducer.usuarioLog;
        if (!usuario) {
            SNavigation.navigate('login');
            return <SView />
        }
        var destacado = require("../../Assets/svg/perfil.jpg");
        return <SView col={"xs-10 md-6 xl-4"} height backgroundColor={STheme.color.secondary}
            style={{
                position: "absolute",
                left: this.animSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["-70%", "0%"],
                }),
            }}
        >
            <SView backgroundColor={STheme.color.primary} width="100%" height={105} center
                style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} row>
                <SView col={"xs-3"} center style={{ textAlign: "right" }}>
                    <SView style={{
                        width: 50,
                        height: 50, borderRadius: 30, overflow: "hidden", borderWidth: 2, borderColor: "#fff"
                    }}>
                        <SImage src={destacado} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover"
                        }} />
                    </SView>
                </SView>
                <SView col={"xs-9"} onPress={() => {
                    SNavigation.navigate('perfil');
                    this.fadeOut();
                }}>
                    <SText font={"Roboto-Bold"}
                        style={{
                            color: "#fff",
                            fontSize: 24,
                        }}>{usuario.Nombres}</SText>
                    <SText font={"Roboto"}
                        style={{
                            color: "#fff",
                            fontSize: 12,
                        }}>Ver Perfil
                        <SIcon name="Ver" width={12} color="#fff"
                            style={{
                                paddingLeft: 5,
                                position: "relative",
                                top: 4
                            }} />
                    </SText>
                </SView>
            </SView>

            <SView col={"xs-12"} style={{ color: "#666666", padding: 10, }}>
                <SView row onPress={() => {
                    // SNavigation.navigate("inicio");
                    // this.fadeOut();
                }}  >
                    <SView style={{ padding: 5, }} row >
                        <SIcon fill="#666666" name={"Inicio"} width={40} />
                        <SText center style={{ paddingLeft: 5, color: "#666666", fontSize: 18 }} >Inicio</SText>
                    </SView>
                    <SView style={{ right: 10, position: "absolute", top: 14 }} row >
                        <SIcon style={{ textAlign: "right" }} fill="#fff" name={"Icon1"} width={10} />
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 5, paddingLeft: 16 }} row>
                        <SView width={40} height={40} center style={{ paddingTop: 5}}>
                            <SIcon fill="#666666" name={"Kolping"} width={55} />
                        </SView>
                        <SText center style={{ color: "#666666", fontSize: 18 }} >Sobre Kolping</SText>
                    </SView>
                    <SView style={{ right: 10, position: "absolute", top: 14 }} row >
                        <SIcon style={{ textAlign: "right" }} fill="#fff" name={"Icon1"} width={10} />
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 5}} row>
                        <SView width={40} height={40} center>
                            <SIcon fill="#666666" name={"Consultas"} width={19} />
                        </SView>
                        <SText center style={{ color: "#666666", fontSize: 18 , paddingLeft:5}} >Mis consultas</SText>
                    </SView>
                    <SView style={{ right: 10, position: "absolute", top: 14 }} row >
                        <SIcon style={{ textAlign: "right" }} fill="#fff" name={"Icon1"} width={10} />
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 5, }} row>
                        <SView width={40} height={40} center>
                            <SIcon fill="#666666" name={"Compras"} width={21} />
                        </SView>
                        <SText center style={{ paddingLeft: 5, color: "#666666", fontSize: 18 }} >Mis Compras</SText>
                    </SView>
                    <SView style={{ right: 10, position: "absolute", top: 14 }} row >
                        <SIcon style={{ textAlign: "right" }} fill="#fff" name={"Icon1"} width={10} />
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 5, }} row>
                        <SView width={40} height={40} center>
                            <SIcon fill="#666666" name={"KNotify"} width={16} />
                        </SView>
                        <SText center style={{ paddingLeft: 5, color: "#666666", fontSize: 18 }} >Mis Notificaciones</SText>
                    </SView>
                    <SView style={{ right: 10, position: "absolute", top: 14 }} row >
                        <SIcon style={{ textAlign: "right" }} fill="#fff" name={"Icon1"} width={10} />
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 5, }} row>
                        <SIcon fill="#666666" name={"Configuracion"} width={40} />
                        <SText center style={{ paddingLeft: 5, color: "#666666", fontSize: 18 }} >Configuraci??n</SText>
                    </SView>
                    <SView style={{ right: 10, position: "absolute", top: 14 }} row >
                        <SIcon style={{ textAlign: "right" }} fill="#fff" name={"Icon1"} width={10} />
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView onPress={() => {
                }}>
                    <SView style={{ padding: 5, }} row>
                        <SIcon fill="#666666" name={"Ayuda"} width={40} />
                        <SText center style={{ paddingLeft: 5, color: "#666666", fontSize: 18 }} >Ayuda</SText>
                    </SView>
                    <SView style={{ right: 10, position: "absolute", top: 14 }} row >
                        <SIcon style={{ textAlign: "right" }} fill="#fff" name={"Icon1"} width={10} />
                    </SView>
                </SView>
                <SView col={"xs-12"} />
                <SView col={"xs-9.5 md-5.8 xl-3.8"} center style={{ padding: 15, bottom: 0, position: "fixed", }}>
                    <SIcon name={"Logo"} height={70} />
                </SView>
                {/* <CerrarSession /> */}
            </SView>

        </SView>
    }
    render() {
        NavBar.INSTACE = this;
        if (!this.state.isOpen) return null;
        return (
            <SView style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                //backgroundColor: "#66000066",
                backgroundColor: "#00000099",
            }}
                activeOpacity={1}
                onPress={() => {
                    if (this.state.isOpen) {
                        this.fadeOut();
                    } else {
                        this.fadeIn();
                    }
                }
                }>
                {this.getNav()}
            </SView>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NavBar);