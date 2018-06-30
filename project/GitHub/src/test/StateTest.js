import React, { Component } from 'react';
import {Image, Text, View, StyleSheet} from "react-native";
import { PropTypes} from 'prop-types';

export default class StateTest extends Component{

    //默认属性
    static defaultProps = {
        name:"",

    };

    //属性检查
    static propTypes = {
        name:PropTypes.string.isRequired, //必须传递
    };

    //方式2
    state={
        size:80,
    };

    constructor(props){
        super(props);
        //方式1
        // this.state={
        //     size:80,
        // };
    }

    render(){
        return(
        <View>
            <Text style={{fontSize:30}} onPress={this.press1.bind(this)}>吹气球</Text>
            <Image style={{width:this.state.size, height:this.state.size,}} source={require('../../res/img/qiqiu.jpg')}></Image>
        </View>
        );
    }

    //点击事件
    press1(){
        this.setState({
            size:this.state.size+10
        })
    }
}

const styles = StyleSheet.create({
    container:{

    },
});