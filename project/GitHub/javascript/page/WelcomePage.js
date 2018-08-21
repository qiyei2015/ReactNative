import React,{Component} from "react";
import {Text, View,StyleSheet} from "react-native";
import ThemeDao from "../model/dao/ThemeDao";
import NavigatorUtil from "../util/NavigatorUtil";

const TAG = "WelcomePage:";

export default class WelcomePage extends Component{
    constructor(props){
        super(props);
        this.themeDao = new ThemeDao();
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
        this.themeDao.getTheme().then((data) => {
            this.theme = data;
        }).catch(error => {
            console.log(TAG + error);
        });

        this.timer = setTimeout(() => {
            console.log(TAG+"result -> "+this.theme.colorPrimary);
            NavigatorUtil.resetToHomePage({
                theme:this.theme,
                navigation:this.props.navigation,
            });
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
