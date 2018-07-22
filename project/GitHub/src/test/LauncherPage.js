import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import FlexBox from "./FlexBox";

import {mainBackgroundColor} from "../common/BaseStyles";
import TabNavigatorDemo from "./TabNavigatorDemo";


export default class LauncherPage extends Component{

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.listItem} activeOpacity={0.6} onPress={this.gotoMainPage.bind(this)}>
                    <Text>主页面</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} activeOpacity={0.6} onPress={this.gotoDemoTestPage.bind(this)}>
                    <Text>Demo测试</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} activeOpacity={0.6} onPress={this.gotoTShop.bind(this)}>
                    <Text>电商</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} activeOpacity={0.6} onPress={this.gotoTabNavigatorDemo.bind(this)}>
                    <Text>TabNavigatorDemo</Text>
                </TouchableOpacity>
            </View>
        );
    }

    gotoMainPage(){
        this.props.navigation.push('FlexBox');
    }

    gotoDemoTestPage(){
        this.props.navigation.push('DemoTestPage');
    }

    gotoTShop(){
        this.props.navigation.push('MyTab');
    }
    gotoTabNavigatorDemo(){
        this.props.navigation.push('TabNavigatorDemo');
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection:"column",
        flex: 1,
        justifyContent: 'flex-start', //主轴
        alignItems: 'stretch', //侧轴
        backgroundColor: mainBackgroundColor,
    },
    listItem:{
        marginTop:10,
        marginBottom:10,
        alignItems:"center", //子元素侧轴
        backgroundColor: '#FFFF00',
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