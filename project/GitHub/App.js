
import {
    createStackNavigator,
} from 'react-navigation';
import LauncherPage from "./src/pages/LauncherPage";
import FlexBox from "./src/test/FlexBox";

//创建页面路由
const App = createStackNavigator({
    LauncherPage:{
        screen:LauncherPage,
        navigationOptions:{
            gesturesEnabled:true, //手势打开
            headerText:null, //去除标题
        }
    },
    FlexBox:{
        screen:FlexBox,
        navigationOptions:{
            gesturesEnabled:true, //手势打开
            headerText:null, //去除标题
        }
    }

});

export default App