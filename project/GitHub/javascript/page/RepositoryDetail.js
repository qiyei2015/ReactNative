
import React,{Component}from "react";
import {View, WebView, StyleSheet, TouchableOpacity, Image} from "react-native";
import {colorPrimary} from "../common/BaseStyles";
import NavigationBar from "../common/NavigationBar";


/**
 * 详情页面
 */
export default class RepositoryDetail extends Component{
    constructor(props){
        super(props);
        //获取数据
        this.data = this.props.navigation.state.params.data;
        //设置url,title等
        this.state = {
            url:this.data.html_url,
            title:this.data.full_name,
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
                    leftView={
                        <TouchableOpacity
                            onPress={() => {
                                this.goBack();
                            }
                            }>
                            <Image style={{width: 22, height: 22, margin: 5}}
                                   source={require("../../res/images/ic_arrow_back_white_36pt.png")}/>
                        </TouchableOpacity>
                    }
                    rightView={
                        <TouchableOpacity>
                            <Image style={{width: 22, height: 22, margin: 5}}
                                   source={require("../../res/images/ic_star.png")}/>
                        </TouchableOpacity>
                    }
                />
                <WebView
                    ref = {webView => this.webView = webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange = {navState => this.navigationStateChange(navState)}
                    startInLoadingState={true}
                />
            </View>
        );
    }

    //返回
    goBack(){
        if (this.state.canGoBack){
            this.webView.goBack();
        }else {
            //返回上个界面
            this.props.navigation.goBack();
        }
    }

    //状态监听回调
    navigationStateChange(navState){
        this.setState({
            canGoBack:navState.canGoBack,
            url: navState.url,
        });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input:{
        flex:1,
        borderWidth: 1,
    }
});