import React , { Component } from "react";
import {StyleSheet,Image, View} from "react-native";
import TabNavigator from "react-native-tab-navigator";

//底部tab使用例子
export default class TabNavigatorDemo extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedTab:'home'
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={{color:'red'}}
                        title="Home"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_popular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_popular.png')} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <View style={styles.page1}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="Profile"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'profile' })}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home2'}
                        selectedTitleStyle={{color:'red'}}
                        title="Home2"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_popular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_popular.png')} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'home2' })}>
                        <View style={styles.page1}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile2'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="Profile2"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')} />}
                        // renderBadge={() => <CustomBadgeView />}
                        onPress={() => this.setState({ selectedTab: 'profile2' })}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
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
    image:{
        width:22,
        height:22,
    }
});