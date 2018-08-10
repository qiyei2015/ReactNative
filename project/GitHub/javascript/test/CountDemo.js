import React,{Component} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import Counter from "../component/Counter";


export default class CountDemo extends Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 0,

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Counter
                    style={styles.count}
                    ref={(count) => this.count = count}
                    initValue={10}
                    onValueChange={(value) => this._onValueChange(value)}
                />
                <View>
                    <Text>{this.state.value}</Text>
                </View>
                <TouchableOpacity onPress={() => this.getValue()}>
                    <Text>点击获取值</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.clearValue()}>
                    <Text>清理</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onValueChange(value) {
        this.setState({
            value:value,
        });
    }

    getValue(){
        this.setState({
            value:this.count.getCount(),
        });
    }

    clearValue(){
        this.setState({
            value:0,
        });
    }
}

//样式
const styles = StyleSheet.create({
    container: {
        flex:1,
        borderColor:'#DDD', //边框颜色
    },
    count:{
        backgroundColor:"#FF22FF",//
    }
});