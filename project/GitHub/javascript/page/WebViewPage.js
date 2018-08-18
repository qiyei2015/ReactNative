
import React,{Component}from "react";
import {View, WebView, StyleSheet, TouchableOpacity, Image,DeviceEventEmitter} from "react-native";
import {colorPrimary} from "../common/BaseStyles";
import NavigationBar from "../common/NavigationBar";
import NavigatorUtil from "../util/NavigatorUtil";
import GlobalStyle from "../style/GlobalStyle";
import ViewUtil from "../util/ViewUtil";

export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        this.params=this.props.navigation.state.params;
        this.state = {
            url: this.params.url,
            canGoBack: false,
            title: this.params.title,
        }
    }

    /**
     * 返回按钮
     * @param e
     */
    onBackPress(e) {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigatorUtil.goBack(this.props.navigation)
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    render() {
        return (
            <View
                style={GlobalStyle.root_container}
                topColor={colorPrimary}>
                <NavigationBar
                    navigator={this.props.navigator}
                    popEnabled={false}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    leftView={ViewUtil.getLeftButton(()=>this.onBackPress())}
                    title={this.state.title}
                />
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </View>
        );
    }
}
