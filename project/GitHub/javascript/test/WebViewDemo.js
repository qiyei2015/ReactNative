import React,{Component}from "react";
import {View, TouchableOpacity, Text, TextInput, WebView, Image,StyleSheet} from "react-native";
import {colorPrimary} from "../common/BaseStyles";
import NavigationBar from "../common/NavigationBar";

const URL = "https://www.imooc.com/";

export default class WebViewDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            url:URL,
            title:"WebViewDemo",
            canGoBack:false,
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    statusBar={{
                        backgroundColor: colorPrimary,
                        hidden: false,
                    }}
                />
                <View style={styles.row}>
                    <TouchableOpacity onPress={()=> this.goBack()}>
                        <Text>返回</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.text = text}
                        defaultValue={URL}
                        underlineColorAndroid = {'transparent'}
                    />
                    <TouchableOpacity onPress={()=> this.goTo()}>
                        <Text>前往</Text>
                    </TouchableOpacity>
                </View>
                <WebView
                    ref = {webView => this.webView = webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange = {navState => this.navigationStateChange(navState)}
                />
            </View>
        );
    }

    //返回
    goBack(){
        if (this.state.canGoBack){
            this.webView.goBack();
        }
    }

    //前往
    goTo(){
        this.setState({
            url:this.text,
        })
    }

    navigationStateChange(navState){
        this.setState({
            canGoBack:navState.canGoBack,
            title:navState.title,
        });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row:{
        flexDirection: "row", //水平布局
        justifyContent:"space-between", //主轴布局
        alignItems:"center", //侧轴居中
        margin: 5,
    },
    input:{
        flex:1,
        borderWidth: 1,
    }
});