
import React,{ Component } from 'react';
import {StyleSheet, Text, View} from "react-native";

export default class FlexBox extends Component{

    render(){
        return(
            <View style={styles.fatherStyle}>
                {/*<View style={styles.container}>*/}
                {/*</View>*/}
                <View style={styles.childStyle1}>
                    <Text style={styles.textStyle}>1</Text>
                </View>
                <View style={styles.childStyle1}>
                    <Text style={styles.textStyle}>2</Text>
                </View>
                <View style={styles.childStyle2}>
                    <Text style={styles.textStyle}>3</Text>
                </View>
                <View style={styles.childStyle2}>
                    <Text style={styles.textStyle}>4</Text>
                </View>
                <View style={styles.childStyle3}>
                    <Text style={styles.textStyle}>5</Text>
                </View>
            </View>
        );
    }

}

//定义styles
const styles = StyleSheet.create({
    fatherStyle:{
        flexDirection:'row', //指定子元素排列方式
        flexWrap:'wrap', //指定益处怎么处理
        justifyContent:'flex-start', //指定子元素在横轴的对齐方式
        alignItems:'stretch', //指定纵轴的对齐方式
        backgroundColor:'darkgray',
        marginTop:20,
    },
    container:{
        width:400,
        height:300,
        flex:1,
        backgroundColor:'red',
    },
    childStyle1:{
        width:80,
        height:40,
        alignSelf:'flex-end',
        backgroundColor:'green',
        margin:10,
    },
    childStyle2:{
        width:100,
        height:60,
        backgroundColor:'green',
        margin:10,
    },
    childStyle3:{
        left:40,
        width:120,
        height:80,
        backgroundColor:'green',
        margin:10,
    },
    textStyle:{
       fontSize:16,
    },
});