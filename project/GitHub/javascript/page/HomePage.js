import React,{Component}from "react";
import {View, Image, StyleSheet, TouchableOpacity,DeviceEventEmitter} from "react-native";
import TabNavigator from "react-native-tab-navigator";
import PopularPage from "./PopularPage";
import {colorPrimary} from "../common/BaseStyles";
import AsyncStorageDemo from "../test/AsyncStorageDemo";
import MyPage from "./my/MyPage";
import Toast,{DURATION} from "react-native-easy-toast";
import Constant from "../common/Constant";


export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedTab:'popular'
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'popular'}
                        selectedTitleStyle={{color:colorPrimary}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_popular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:colorPrimary}]} source={require('../../res/images/ic_popular.png')} />}
                        //角标显示
                        badgeText=""
                        onPress={() => this.setState({ selectedTab: 'popular' })}>
                        {/*传递属性参数*/}
                        <PopularPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'profile' })}>
                        <AsyncStorageDemo />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'favorite'}
                        selectedTitleStyle={{color:'green'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'green'}]} source={require('../../res/images/ic_favorite.png')} />}
                        //角标显示
                        badgeText=""
                        onPress={() => this.setState({ selectedTab: 'favorite' })}>
                        <View style={styles.page3}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'my'}
                        selectedTitleStyle={{color:'blue'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_my.png')} />}
                        onPress={() => this.setState({ selectedTab: 'my' })}>
                        <MyPage {...this.props}/>
                    </TabNavigator.Item>
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