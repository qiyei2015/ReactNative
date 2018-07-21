import React,{Component} from "react";
import {Text, View, StyleSheet, Button} from "react-native";


export default class HomePage extends Component{

    //覆盖路由里面设置
    static navigationOptions = {
        title:"Home",
        headerBackTitle:"主页返回",
    };

    render(){
        //解构赋值 等价于const navigation = this.props.navigation;
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <Text>HomePage</Text>

                <Button
                    title="Go to Page1"
                    onPress={() => {
                        //动态传递属性到Page1
                        navigation.navigate('Page1',{name:"动态的"});
                    }}
                />
                <Button
                    title="Go to Page2"
                    onPress={() => {
                        navigation.navigate('Page2',{name:"page2的页面"});
                    }}
                />
                <Button
                    title="Go to Page3"
                    onPress={() => {
                        navigation.navigate('Page3',{title:"哈哈"});
                    }}
                />
                <Button
                    title="Go to AppTabNavigator"
                    onPress={() => {
                        navigation.navigate('AppTabNavigator',{title:"哈哈"});
                    }}
                />
                <Button
                    title="Go to ListViewDemo"
                    onPress={() => {
                        navigation.navigate('ListViewDemo',{title:"ListViewDemo"});
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    },

});