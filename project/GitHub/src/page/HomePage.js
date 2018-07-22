import {mainBackgroundColor} from "../common/BaseStyles";
import React,{Component}from "react";
import {Text, View,StyleSheet} from "react-native";


export default class HomePage extends Component{


    render(){
        return (
            <View style={styles.container}>
                <Text>主页</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"column",
        flex: 1,
        justifyContent: 'center', //主轴
        alignItems: 'center', //侧轴
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