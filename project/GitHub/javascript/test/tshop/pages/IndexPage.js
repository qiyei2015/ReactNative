import React, {Component} from 'react';
import {StyleSheet,Text, View} from "react-native";


export default class IndexPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>首页</Text>
            </View>
        );
    }
}

//样式
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center', //子元素对齐
    },
});