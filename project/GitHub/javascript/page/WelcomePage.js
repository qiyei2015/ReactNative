import React,{Component} from "react";
import {Text, View,StyleSheet} from "react-native";
import {mainBackgroundColor} from "../common/BaseStyles";


export default class WelcomePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>欢迎页面</Text>
            </View>
        )
    }

    //已经被加载
    componentDidMount() {
        const {navigation} = this.props;

        this.timer = setTimeout(() => {
            navigation.navigate("HomePage");
        },1000);
    }

    //将要被卸载
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
