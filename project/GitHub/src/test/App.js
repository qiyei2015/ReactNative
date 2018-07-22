
import {
    createBottomTabNavigator,
    createStackNavigator, StackNavigator,
} from 'react-navigation';
import LauncherPage from "./LauncherPage";
import FlexBox from "./FlexBox";
import DemoTestPage from "./DemoTestPage";
import CartPage from "./tshop/pages/CartPage";
import IndexPage from "./tshop/pages/IndexPage";
import MyPage from "./tshop/pages/MyPage";

import React from "react";
import CategoryPage from "./tshop/pages/CategoryPage";
import Theme from "../config/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import TabNavigatorDemo from "./TabNavigatorDemo";
import AppStackNavigator, {AppTabNavigator} from "../navigator/AppNavigator";


/**
 * 创建底部Tab
 */
const MyTab = createBottomTabNavigator({
    IndexPage: {
        screen: IndexPage,
        navigationOptions: {
            tabBarLabel:'首页',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name={`ios-home${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
            ),
        }
    },
    CategoryPage: {
        screen: CategoryPage,
        navigationOptions: {
            tabBarLabel:'分类',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name={`ios-apps${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
            )
        }
    },
    CartPage: {
        screen: CartPage,
        navigationOptions: {
            tabBarLabel:'购物车',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name={`ios-cart${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
            ),
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name={`ios-person${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
            ),
        }
    }
}, {
    tabBarOptions:{
        //label和icon的前景色 活跃状态下（选中）
        activeTintColor:Theme.primaryColor,
        //label和icon的背景色 不活跃状态下
        inactiveBackgroundColor:Theme.lightGray,
        //label和icon的前景色 不活跃状态下(未选中)
        inactiveTintColor: Theme.lightBlack,
    }
});



//创建页面路由
let App = createStackNavigator({
    LauncherPage:{
        screen:LauncherPage,
        navigationOptions:{
            gesturesEnabled:false, //手势打开
            header:null,
            headerText:null, //去除标题
        }
    },
    FlexBox:{
        screen:FlexBox,
        navigationOptions:{
            gesturesEnabled:false, //手势打开
            header:null, //去除header
            headerText:null, //去除标题
        }
    },
    DemoTestPage:{
        screen:DemoTestPage,
        navigationOptions:{
            gesturesEnabled:false, //手势打开
            header:null,
            headerText:null, //去除标题
        }
    },
    MyTab:{
        screen:MyTab,
        navigationOptions:{
            gesturesEnabled:false, //手势打开
            header:null,
            headerText:null, //去除标题
        }
    },
    TabNavigatorDemo:{
        screen:TabNavigatorDemo,
        navigationOptions:{
            gesturesEnabled:false, //手势打开
            header:null,
            headerText:null, //去除标题
        }
    }
});
export default App