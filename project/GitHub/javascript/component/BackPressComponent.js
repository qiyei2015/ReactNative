import React from "react";
import {BackHandler} from "react-native";

export default class BackPressComponent{
    constructor(props){
        this._hardwareBackPress=this.onHardwareBackPress.bind(this);
        this.props=props;
    }

    /**
     * 监听返回键，注册事件
     */
    componentDidMount(){
        if(this.props.backPress)BackHandler.addEventListener('hardwareBackPress',this._hardwareBackPress);
    }

    /**
     * 移除监听事件
     */
    componentWillUnmount(){
        if(this.props.backPress)BackHandler.removeEventListener('hardwareBackPress',this._hardwareBackPress);
    }

    onHardwareBackPress(e){
        return this.props.backPress(e);
    }
}