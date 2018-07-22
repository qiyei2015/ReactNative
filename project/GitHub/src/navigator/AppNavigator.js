import React from "react";
import {StackNavigator} from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";

//App路由配置
export default AppNavigator = StackNavigator({
    WelcomePage: {
        screen:WelcomePage,
    },
    HomePage: {
        screen: HomePage
    },

},{
    //全局配置
    navigationOptions:{
        header:null,
    }
});

