import React,{Component}from "react";
import {View,TouchableOpacity, Text, TextInput, AsyncStorage} from "react-native";
import Toast, {DURATION} from 'react-native-easy-toast'

const KEY = "key";

export default class AsyncStorageDemo extends Component{


    constructor(props){
        super(props);
    }

    render(){
        return (
            <View>
                {/*赋值给AsyncStorageDemo.text变量*/}
                <TextInput onChangeText={(text) => this.text=text}/>
                <View style={{flexDirection:"row",justifyContent:"space-between", margin:10}}>
                    <TouchableOpacity onPress={() => this.onSave()}>
                        <Text>保存</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onRemove()}>
                        <Text>删除</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onFetch()}>
                        <Text>获取</Text>
                    </TouchableOpacity>
                </View>
                <Toast ref={(toast) => this.toast = toast}/>
            </View>
        );
    }

    onSave(){
        AsyncStorage.setItem(KEY,this.text,(error) => {
            if (!error){
                this.toast.show("保存成功",DURATION.LENGTH_SHORT);
            } else {
                this.toast.show("保存失败",DURATION.LENGTH_SHORT);
            }
        })
    }

    onRemove(){
        AsyncStorage.removeItem(KEY,(error) => {
            if (!error){
                this.toast.show("删除成功",DURATION.LENGTH_SHORT);
            } else {
                this.toast.show("删除失败",DURATION.LENGTH_SHORT);
            }
        })
    }

    onFetch(){
        AsyncStorage.getItem(KEY,(error,result) => {
            if (!error){
                if (result !== null && result !== ""){
                    this.toast.show("获取成功:" + result,DURATION.LENGTH_SHORT);
                } else {
                    this.toast.show("不存在" + result,DURATION.LENGTH_SHORT);
                }

            } else {
                this.toast.show("获取失败",DURATION.LENGTH_SHORT);
            }
        })
    }
}