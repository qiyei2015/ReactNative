import React, { Component } from 'react';
import {Text} from "react-native";
import { PropTypes} from 'prop-types';

export default class PropsTest extends Component{

    //默认属性
    static defaultProps = {
        name:"",

    };

    //属性检查
    static propTypes = {
        name:PropTypes.string.isRequired, //必须传递
    };

    render(){
        return(
            <Text>name:{this.props.name}</Text>
        );
    }
}