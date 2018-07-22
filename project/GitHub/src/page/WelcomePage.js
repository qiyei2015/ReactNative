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
        },2000);
    }

    //将要被卸载
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
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
