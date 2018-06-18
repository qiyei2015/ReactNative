import React,{ Component } from 'react';
import {Image} from "react-native";

/**
 * 定义Bananas
 */
export default class Banans extends Component{
    render(){
        let pic = {
            uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };

        return(
            <Image source={pic} style={{width:193,height:110}}/>
        )
    }
}