
import {StackNavigator} from "react-navigation";
import HomePage from "../test/pages/HomePage";
import Page1 from "../test/pages/Page1";
import Page2 from "../test/pages/Page2";
import Page3 from "../test/pages/Page3";
import React from "react";
import {Button,StyleSheet} from "react-native";


const AppNavigator = StackNavigator({
    HomePage:{
        screen:HomePage,
        navigationOptions:{
            title:"HomePage",
        }
    },
    Page1:{
        screen:Page1,
        //参数是props,{navigation} 表示解构赋值。箭头函数返回值作为navigationOptions对象,需要小括号括起来
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
    },
    Page3:{
        screen:Page3,
        navigationOptions: (props) => {
            const {navigation} = props;
            const {state,setParams} = navigation;
            const {params} = state;
            return {
                title: params.title ? params.title:"This is Page3",
                //设置右标题
                headerRight:(
                    //使用Button作为按钮
                    <Button style={styles.button} title={params.mode === "edit" ? "编辑" : "保存"}
                            onPress={() => {
                                setParams({mode:params.mode === "edit" ? "":"edit"});
                            }}
                    />
                )
            }
        }
    }

},{
    //全局配置参数
    navigationOptions:{
        // header:null,
    }
});


export default AppNavigator;

const styles = StyleSheet.create({
    button:{
        marginRight:10,
    }
});