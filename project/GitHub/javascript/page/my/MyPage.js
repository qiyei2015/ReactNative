import React,{Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import {colorPrimary} from "../../common/BaseStyles";
import CustomLabelPage from "./CustomLabelPage";
import {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao"
import GlobalStyle from "../../style/GlobalStyle"
import ViewUtil from "../../util/ViewUtil";

export default class MyPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {navigation} = this.props;
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"我的"}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                />
                <ScrollView>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => this.gotoLabelPage("CustomLabelPage",FLAG_LANGUAGE.flag_key)}>
                        <Text>自定义标签</Text>
                    </TouchableOpacity>
                    <View style={GlobalStyle.line}/>
                    {this.renderItemView("custom_key", require('./img/ic_custom_language.png'), '自定义标签')}
                    <View style={GlobalStyle.line}/>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => this.gotoLabelPage("CustomLabelPage",FLAG_LANGUAGE.flag_language)}>
                        <Text>自定义语言</Text>
                    </TouchableOpacity>
                    <View style={GlobalStyle.line}/>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => this.gotoLabelPage("SortLabelPage",FLAG_LANGUAGE.flag_key)}>
                        <Text>标签排序</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => this.gotoSortPage("CustomLabelPage",true)}>
                        <Text>标签移除</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => this.gotoLabelPage("SortLabelPage",FLAG_LANGUAGE.flag_language)}>
                        <Text>语言排序</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    /**
     * item事件
     * @param tag
     */
    onClick(tag){

    }

    gotoLabelPage(page,flag){
        //跳转到指定页面，并传入参数
        this.props.navigation.navigate(
            page,
            {...this.props,flag:flag},
        )
    }


    gotoSortPage(page,remove){
        //跳转到指定页面，并传入参数
        this.props.navigation.navigate(
            page,
            {...this.props,removeLabel:remove},
        )
    }

    /**
     * 渲染设置item
     * @param tag
     * @param icon
     * @param text
     * @returns {*}
     */
    renderItemView(tag,icon,text){
        return ViewUtil.getSettingItemView(this.onClick(tag),icon,text,{tintColor:colorPrimary},null);
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    row:{
        margin:10,
    }
});
