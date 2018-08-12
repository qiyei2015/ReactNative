import React,{Component}from "react";
import {View, Image, StyleSheet, TouchableOpacity,DeviceEventEmitter} from "react-native";
import TabNavigator from "react-native-tab-navigator";
import PopularPage from "./PopularPage";
import {colorPrimary} from "../common/BaseStyles";
import MyPage from "./my/MyPage";
import Toast,{DURATION} from "react-native-easy-toast";
import Constant from "../common/Constant";
import WebViewDemo from "../test/WebViewDemo";
import TrendingPage from "./TrendingPage";
import FavoritePage from "./FavoritePage";





//页面模型
class PageModel {
    constructor(component,key,name,icon){
        this.component = component;
        this.key = key;
        this.name = name;
        this.icon = icon;
    }
}


const PAGE = {
    popular: new PageModel(PopularPage, "popular", "最热", require('../../res/images/ic_popular.png')),
    trending: new PageModel(TrendingPage, "trending", "趋势", require('../../res/images/ic_trending.png')),
    favorite: new PageModel(FavoritePage, "favorite", "收藏", require('../../res/images/ic_favorite.png')),
    my: new PageModel(MyPage, "my", "我的", require('../../res/images/ic_my.png')),
};


export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedTab:'popular'
        };
        //屏蔽黄色告警
        console.disableYellowBox = true;
        console.warn("YellowBox is disabled.");
    }

    render(){
        return(
            <View style={styles.container}>
                <TabNavigator>
                    {this.renderPageTab(PAGE.popular)}
                    {this.renderPageTab(PAGE.trending)}
                    {this.renderPageTab(PAGE.favorite)}
                    {this.renderPageTab(PAGE.my)}
                </TabNavigator>
                {/*需要放在最外层*/}
                <Toast ref={(toast) => this.toast = toast}/>
            </View>
        );
    }

    componentDidMount(){
        //注册showToast事件
        this.showToastListener = DeviceEventEmitter.addListener(Constant.SHOW_TOAST,(text) => {
            this.toast.show(text,DURATION.LENGTH_SHORT);
        });
    }

    componentWillUnmount(){
        //移除监听
        this.showToastListener && this.showToastListener.remove();
    }

    //渲染PageTab页面
    renderPageTab(model){
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === model.key}
                selectedTitleStyle={{color: colorPrimary}}
                title={model.name}
                renderIcon={() => <Image style={styles.image} source={model.icon}/>}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: colorPrimary}]}
                                                 source={model.icon}/>}
                //角标显示
                badgeText=""
                onPress={() => this.setState({selectedTab: model.key})}>
                {/*传递属性参数*/}
                <model.component {...this.props}/>
            </TabNavigator.Item>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF'
    },
    page1:{
        flex:1,
        backgroundColor:'red'
    },
    page2:{
        flex:1,
        backgroundColor:'yellow'
    },
    page3:{
        flex:1,
        backgroundColor:'green'
    },
    page4:{
        flex:1,
        backgroundColor:'blue'
    },
    image:{
        width:22,
        height:22,
    }
});