import React,{Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import {colorPrimary} from "../../common/BaseStyles";
import CustomLabelPage from "./CustomLabelPage";



export default class MyPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {navigation} = this.props;
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"我的"}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        //跳转到指定页面，并传入参数
                        navigation.navigate(
                            "CustomLabelPage",
                            {...this.props}
                        )
                    }}
                >
                    <Text>我的</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
});
