
import {NavigationActions,StackActions} from 'react-navigation'

/**
 * 导航，页面跳转工具类
 */
export default class NavigatorUtil {

    /**
     * 返回上一级
     * @param navigation
     */
    static goBack(navigation){
        navigation.goBack();
    }

    /**
     * 跳转首页
     */
    static resetToHomePage(params) {
        const {navigation, theme, selectedTab} = params;
        //创建action
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "HomePage",
                    params: {
                        theme: theme,
                        selectedTab: selectedTab
                    }
                })
            ]
        });
        navigation.dispatch(resetAction);
    }

    /**
     * 跳转到菜单详情页
     * @param routeName
     * @param params
     */
    static goToMenuPage(routeName,params) {
        const {navigation} = params;
        navigation.navigate(
            routeName,
            {
                ...params
            }
        )
    }
}