import React,{Component} from "react";
import {View, StyleSheet,GlobalStyles} from "react-native";
import {colorPrimary} from "../common/BaseStyles";
import ViewUtil from "../util/ViewUtil"
import {MORE_MENU} from "../common/MoreMenu";
import ParallaxComponent from "../component/ParallaxComponent";
import GlobalStyle from "../style/GlobalStyle";

import config from '../../res/data/config.json'
import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";

export default class AboutPage extends Component{
    constructor(props){
        super(props);
        this.params=this.props.navigation.state.params;
        this.parallaxComponent=new ParallaxComponent({...this.params,navigation:this.props.navigation},(dic)=>this.updateState(dic),"about",config);
        this.state = {
            projectModels: [],
            author:config.author
        }
    }

    render(){
        let content=<View>
            {ViewUtil.getSettingItemView(()=>this.onClick(MORE_MENU.Website), require('../../res/images/ic_computer.png'),MORE_MENU.Website.name, {tintColor:colorPrimary})}
            <View style={GlobalStyle.line}/>
            {ViewUtil.getSettingItemView(()=>this.onClick(MORE_MENU.About_Author), require('./my/img/ic_insert_emoticon.png'), MORE_MENU.About_Author.name, {tintColor:colorPrimary})}
            <View style={GlobalStyle.line}/>
            {ViewUtil.getSettingItemView(()=>this.onClick(MORE_MENU.Feedback), require('../../res/images/ic_feedback.png'), MORE_MENU.Feedback.name,{tintColor:colorPrimary})}
        </View>;

        return(
           this.parallaxComponent.render(content,{
               'name': 'GitHub',
               'description': '这是一个用来查看GitHub最受欢迎与最热项目的App,它基于React Native支持Android和iOS双平台。',
               'avatar':require("../../res/images/ic_avatar.jpg"),
               'backgroundImg':this.state.author.backgroundImg1,
           })
        )
    }

    updateState(dic){

    }

    /**
     * item事件
     * @param tab
     */
    onClick(tab){
        let targetComponent;
        let flag = null;
        switch (tab) {
            case MORE_MENU.Website:
                targetComponent = 'CustomLabelPage';
                flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.About_Author:
                targetComponent = 'SortLabelPage';
                flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Feedback:
                targetComponent = 'CustomLabelPage';
                //flag = true;
                break;
            default:
                break;
        }
        if (targetComponent) {
            //跳转到指定页面，并传入参数
            this.props.navigation.navigate(
                targetComponent,
                {...this.props,flag:flag},
            );
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
});
