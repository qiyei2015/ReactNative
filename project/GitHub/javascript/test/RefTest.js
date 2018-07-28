import React, { Component } from 'react';
import {Image, Text, View, StyleSheet} from "react-native";
import { PropTypes} from 'prop-types';
import Counter from "../component/Counter";


export default class RefTest extends Component{

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
        count:0,
    };

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Counter ref={"counterRef"}/>
                <Text style={{fontSize:30}} onPress={this.press1.bind(this)}>Counter:{this.state.count}</Text>
            </View>
        );
    }

    //点击事件
    press1(){
        var count = this.refs.counterRef.getCount();
        this.setState({
            count:count
        })
    }
}

const styles = StyleSheet.create({
    container:{

    },
});