import React from "react";
import {StackNavigator} from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import MyPage from "../page/my/MyPage";
import CustomLabelPage from "../page/my/CustomLabelPage";
import SortLabelPage from "../page/my/SortLabelPage";
import RepositoryDetail from "../page/RepositoryDetail";
import AboutMePage from "../page/AboutMePage";
import AboutPage from "../page/AboutPage";

//App路由配置
export default AppNavigator = StackNavigator({
    WelcomePage: {
        screen:WelcomePage,
    },
    HomePage: {
        screen: HomePage,
    },
    MyPage: {
        screen: MyPage,
    },
    CustomLabelPage: {
        screen: CustomLabelPage,
    },
    SortLabelPage: {
        screen: SortLabelPage,
    },
    RepositoryDetail: {
        screen: RepositoryDetail,
    },
    AboutMePage: {
        screen: AboutMePage,
    },
    AboutPage: {
        screen: AboutPage,
    },
},{
    //全局配置
    navigationOptions:{
        header:null,
    }
});

