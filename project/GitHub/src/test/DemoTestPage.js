import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import Counter from "../component/Counter";

import {mainBackgroundColor} from "../common/BaseStyles";
/**
 * Demo测试
 */
export default class DemoTestPage extends Component{

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPress.bind(this)} onLongPress={this._onLongPress.bind(this)}>
                    <Text>onPress</Text>
                </TouchableOpacity>
                <TouchableOpacity onLongPress={this._onLongPress.bind(this)}>
                    <Text>onLongPress</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={true}>
                    <Text>无法点击</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={this._pressIn.bind(this)} onPressOut={this._pressOut.bind(this)}>
                    <Text>测试按下的时间</Text>
                </TouchableOpacity>

                <Counter/>
                <Counter initValue={10}/>

            </View>
        );
    }

    _onPress(){
        console.log("onPress");
    }

    _onLongPress(){
        console.log("onLongPress");
    }

    _pressIn(){
        console.log("pressIn");
    }

    _pressOut(){
        console.log("pressOut");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainBackgroundColor,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor: '#FF00FF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        backgroundColor: '#FFFF00',
    },
    button:{
        width:200,
        height:50,
        textAlign:'center',
        backgroundColor:'gray',
    }
});