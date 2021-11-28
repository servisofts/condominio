import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SHr, SIcon, SNavigation, SPage, SThread, SView } from 'servisofts-component';

export default class Carga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 2500,
        };
    }

    redirect() {
        SNavigation.replace("/");
    }
    hilo() {
        new SThread(this.state.delay, "cargaHilo", true).start(() => {
            this.redirect();
        });
    }
    render() {
        // this.hilo()
        return (
            <SPage hidden disableScroll center>
                <SHr height={32}/>
                <SView col={"xs-9 sm-7 md-5 lg-4 xl-3"}>
                    <SIcon name={"Logo"} />
                </SView>
                <SHr height={32}/>
                <SView col={"xs-10 sm-9 md-7 lg-5 xl-4"} flex >
                    <SView style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        right: "-35%",
                    }}>
                        <SIcon name={`Enfermera4`} fill={"#f0f"} />
                    </SView>
                </SView>
                <SHr height={32}/>
                <SView col={"xs-8 sm-6 md-4 lg-3 xl-2"}>
                    <SIcon name={"tuvidaesmejor"} />
                </SView>
                <SHr height={32}/>
            </SPage>
        );
    }
}