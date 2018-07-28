import {Image, TouchableOpacity} from "react-native";
import React from "react";

export default class ViewUtil {

    //获取左侧返回按钮
    static getLeftButton(callback){
        return (
            <TouchableOpacity
                onPress={callback}>
                <Image style={{width:22,height:22,margin:5}} source={require("../../res/images/ic_arrow_back_white_36pt.png")}/>
            </TouchableOpacity>
        );
    }


}
