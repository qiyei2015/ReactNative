import React,{Component} from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import CustomLabelPage from "./CustomLabelPage";
import {FLAG_LANGUAGE} from "../../model/dao/LanguageDao"
import GlobalStyle from "../../style/GlobalStyle"
import ViewUtil from "../../util/ViewUtil";
import {MORE_MENU} from "../../common/MoreMenu";
import CustomThemePage from "./CustomThemePage";
import NavigatorUtil from "../../util/NavigatorUtil";

export default class MyPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            theme:this.props.theme,
            customThemeVisible:false,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"我的"}
                    style={{
                        backgroundColor: this.state.theme.colorPrimary,
                    }}
                />
                <ScrollView>
                    <TouchableOpacity
                        onPress={()=>this.onClick(MORE_MENU.About)}>
                        <View style={[styles.item, {height: 90}]}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Image source={require('../../../res/images/ic_trending.png')}
                                       style={{width: 40, height: 40, marginRight: 10,tintColor:this.state.theme.colorPrimary}}/>
                                <Text>GitHub Popular</Text>
                            </View>
                            <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                                   style={{
                                       opacity: 1,
                                       marginRight: 10,
                                       height: 22,
                                       width: 22,
                                       alignSelf: 'center',
                                       tintColor:this.state.theme.colorPrimary
                                   }}/>
                        </View>
                    </TouchableOpacity>
                    <View style={GlobalStyle.line}/>

                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    <View style={GlobalStyle.line}/>
                    {this.renderItemView(MORE_MENU.Custom_Language)}
                    <View style={GlobalStyle.line}/>
                    {this.renderItemView(MORE_MENU.Sort_Language)}
                    <View style={GlobalStyle.line}/>
                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    <View style={GlobalStyle.line}/>
                    {this.renderItemView(MORE_MENU.Custom_Key)}
                    <View style={GlobalStyle.line}/>
                    {this.renderItemView(MORE_MENU.Sort_Key)}
                    <View style={GlobalStyle.line}/>
                    {this.renderItemView(MORE_MENU.Remove_Key)}
                    <View style={GlobalStyle.line}/>

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    <View style={GlobalStyle.line}/>
                    {this.renderItemView(MORE_MENU.Custom_Theme)}
                    <View style={GlobalStyle.line}/>
                    {this.renderItemView(MORE_MENU.About_Author)}
                    <View style={GlobalStyle.line}/>
                </ScrollView>
                {this.renderCustomThemeView()}
            </View>
        )
    }

    /**
     * item事件
     * @param tab
     */
    onClick(tab){
        let targetComponent;
        let flag = null;
        switch (tab) {
            case MORE_MENU.Custom_Key:
                targetComponent = 'CustomLabelPage';
                flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Sort_Key:
                targetComponent = 'SortLabelPage';
                flag = FLAG_LANGUAGE.flag_key;
                break;
            case MORE_MENU.Remove_Key:
                targetComponent = 'CustomLabelPage';
                //flag = true;
                break;

            case MORE_MENU.Custom_Language:
                targetComponent = 'CustomLabelPage';
                flag = FLAG_LANGUAGE.flag_language;
                break;
            case MORE_MENU.Sort_Language:
                targetComponent = 'SortLabelPage';
                flag = FLAG_LANGUAGE.flag_language;
                break;


            case MORE_MENU.Custom_Theme:
                this.setState({customThemeVisible:true});
                break;
            case MORE_MENU.About_Author:
                targetComponent='AboutMePage';
                break;
            case MORE_MENU.About:
                targetComponent='AboutPage';
                break;
            case '更新':
                this.update();
                break;
            default:
                break;
        }

        let params = {...this.props,flag:flag};
        if (targetComponent) {
            //跳转到指定页面，并传入参数
            NavigatorUtil.goToMenuPage(targetComponent,params);
        }
    }

    /**
     * 渲染设置item
     * @param tab
     * @param icon
     * @param text
     * @returns {*}
     */
    renderItemView(tab){
        return ViewUtil.getSettingItemView(() => this.onClick(tab),tab.icon,tab.name,this.state.theme.styles.tabBarSelectedIcon,null);
    }

    /**
     * 自定义主题页面
     */
    renderCustomThemeView(){
        return <CustomThemePage
            visible={this.state.customThemeVisible}
            onThemeClose={() => this.setState({customThemeVisible:false})}
            {...this.props}
        />
    }

    /**
     * 更新
     */
    update(){

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
        color: 'gray',
    },
});
