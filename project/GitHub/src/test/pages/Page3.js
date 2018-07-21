import React,{Component} from "react";
import {Text, View, StyleSheet, Button, TextInput} from "react-native";


export default class Page3 extends Component{

    render(){
        const {navigation} = this.props;
        const {state,setParams} = navigation;
        const {params} = state;
        let showText = params.mode === "edit" ? "正在编辑":"编辑完成";
        return (
            <View style={styles.container}>
                <Button
                    title="Go Back"
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text>Page3 + {navigation.state.params.title}</Text>
                <Text>{showText}</Text>
                <TextInput
                    style={styles.input}
                    //监听内容改变，并设置标题
                    onChangeText={text => {
                        setParams({
                            title:text,
                        });
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    },
    input:{
        borderWidth:1,
        borderColor:'red',
        marginTop:20,
        height:50,
        // backgroundColor:'gray',
    }

});