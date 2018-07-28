import React,{Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import {colorPrimary} from "../../common/BaseStyles";
import ViewUtil from "../../util/ViewUtil";



export default class CustomLabelPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}
        >
            <View style={{margin: 10}}>
                <Text style={styles.rightText}>保存</Text>
            </View>
        </TouchableOpacity>
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"自定义标签"}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    leftView={ViewUtil.getLeftButton(() => {
                        this.onBack()
                    })}
                    rightView={rightButton}
                />
                <ScrollView>
                    {thi}
                </ScrollView>
                <Text>自定义标签页面</Text>
            </View>
        )
    }

    onBack(){
        this.props.navigation.goBack();
    }

    onSave(){

    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    rightText:{
        fontSize:20,
        color:"white",
    }
});
