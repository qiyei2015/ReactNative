import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import FlexBox from "../test/FlexBox";


export default class LauncherPage extends Component{

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.6} onPress={this.gotoMainPage.bind(this)}>
                    <Text> 点击跳转页面</Text>
                </TouchableOpacity>
            </View>
        );
    }

    gotoMainPage(){
        this.props.navigation.push('FlexBox');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
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