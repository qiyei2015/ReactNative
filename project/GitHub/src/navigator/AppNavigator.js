
import {StackNavigator} from "react-navigation";
import HomePage from "../test/pages/HomePage";
import Page1 from "../test/pages/Page1";
import Page2 from "../test/pages/Page2";

const AppNavigator = StackNavigator({
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            title:"HomePage",
        }
    },
    Page1:{
        screen:Page1,
        //箭头函数返回值作为navigationOptions对象
        navigationOptions: ({navigation}) => ({
            //这里是TAB键上面那个
            title:`${navigation.state.params.name}页面名`,
        })
    },
    Page2:{
        screen:Page2,
        navigationOptions:{
            title:"Page2",
        }
    }

},{
    //全局配置参数
    navigationOptions:{
        // header:null,
    }
});


export default AppNavigator;