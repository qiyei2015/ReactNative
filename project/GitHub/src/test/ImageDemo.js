import React, { Component } from 'react';
import {Image, View} from "react-native";

const image_path1 = '../../res/img/star.jpg';
const imgae_url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531544047510&di=c76803f98e7e5e7b86ef403716ecd670&imgtype=0&src=http%3A%2F%2Fs8.sinaimg.cn%2Fmw690%2F006LDoUHzy7auXu0wVp67%26690';
const image_native_1 = 'qiqiu';

export default class ImageDemo extends Component{

    render(){
        return (
            <View>
                <Image source={require(image_path1)} />
                <Image source={{uri:imgae_url}} style={{width:200,height:200,margin:5}}/>
                <Image source={{uri:image_native_1}} style={{width:100,height:100,margin:5}}/>
            </View>
        );
    }

}