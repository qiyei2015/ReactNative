import React,{Component}from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";

const dataUrl = "http://rapapi.org/mockjsdata/35672/qiyei2009";
const loginUrl = "http://rapapi.org/mockjsdata/35672/login";

export default class FetchDemo extends Component{

    constructor(props){
        super(props);
        this.state={
            result:"",
        }
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this.onLoadFromNetwork(dataUrl)}>
                    <Text>获取数据</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.login(loginUrl,{name:"张三",password:"123456"})}>
                    <Text>登录</Text>
                </TouchableOpacity>
                <Text>返回结果:{this.state.result}</Text>
            </View>
        )
    }

    //加载网络数据
    onLoadFromNetwork(url){
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //设置到状态中
                this.setState({
                    result: JSON.stringify(data),
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            });
    }

    //登录
    login(url,data){
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            //对象需要序列化成json字符串
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                //设置到状态中
                this.setState({
                    result: JSON.stringify(data),
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            });

    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    },
    tips:{
        fontSize:20,
    },
    row:{
        height:80,
    },
    line:{
        height:1,
        backgroundColor:"black",
    }
});