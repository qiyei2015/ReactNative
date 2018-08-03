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
                    style={styles.row}
                    onPress={() => this.gotoLabelPage("CustomLabelPage")}>
                    <Text>自定义标签</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.gotoLabelPage("SortLabelPage")}>
                    <Text>标签排序</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.gotoLabelPage("CustomLabelPage",true)}>
                    <Text>标签移除</Text>
                </TouchableOpacity>
            </View>
        )
    }

    gotoLabelPage(page,remove){
        //跳转到指定页面，并传入参数
        this.props.navigation.navigate(
            page,
            {...this.props,removeLabel:remove},
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    row:{
        margin:10,
    }
});