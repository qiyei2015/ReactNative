import {Image, Text, TouchableOpacity, View,StyleSheet} from "react-native";
import React from "react";

export default class ViewUtil {


    /**
     * 获取设置页的Item
     * @param callback 单击item的回调
     * @param icon 左侧图标
     * @param text 显示的文本
     * @param tintStyle 图标着色
     * @param expandableIco 右侧图标
     */
    static getSettingItemView(callback,icon,text,tintStyle,expandableIco){

        let leftIcon = icon ?
            <Image source={icon} resizeMode='stretch'
                   style={[{opacity: 1, width: 16, height: 16, marginRight: 10}, tintStyle]}/> :
            <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}}/>;

        return (
            <TouchableOpacity
                style={styles.setting_item}
                onPress={callback}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    {leftIcon}
                    <Text>{text}</Text>
                </View>
                <Image source={expandableIco ? expandableIco : require('../../res/images/ic_tiaozhuan.png')}
                       style={[styles.expandableIco,tintStyle]}
                />
            </TouchableOpacity>
        );
    }


    /**
     * 获取左侧返回按钮
     * @param callback
     * @returns {*}
     */
    static getLeftButton(callback){
        return (
            <TouchableOpacity
                onPress={callback}>
                <Image style={{width:22,height:22,margin:5}} source={require("../../res/images/ic_arrow_back_white_36pt.png")}/>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    setting_item:{
        flexDirection: "row",//横向排列
        marginLeft:10,
        marginRight:5,
        padding: 10,
        height: 60,
        justifyContent: "space-between", //主轴均匀分布
        alignItems: "center", //侧轴居中对齐
    },
    expandableIco:{
        marginRight: 5,
        width: 22,
        height:22,
        opacity:1,
    }
});

