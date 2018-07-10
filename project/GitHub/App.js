
import {
    createStackNavigator,
} from 'react-navigation';
import LauncherPage from "./src/pages/LauncherPage";
import FlexBox from "./src/test/FlexBox";
import DemoTestPage from "./src/test/DemoTestPage";

//创建页面路由
const App = createStackNavigator({
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
    }
});

export default App