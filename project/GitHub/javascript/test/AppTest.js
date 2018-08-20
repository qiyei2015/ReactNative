/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text, TouchableHighlight,
    View
} from 'react-native';
import { PropTypes} from 'prop-types';
import Counter from "./javascript/component/Counter";
import PropsTest from "./javascript/test/PropsTest";
import StateTest from "./javascript/test/StateTest";
import RefTest from "./javascript/test/RefTest";


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class AppTest extends Component<Props> {

    //定义默认属性
    static defaultProps = {
        autoPlay: false,
        maxLoops: 10,
    };

    //定义proTypes
    static propTypes = {
        autoPlay: PropTypes.bool.isRequired,
        maxLoops: PropTypes.number.isRequired,
        posterFrameSrc:PropTypes.string.isRequired,
        videoSrc: PropTypes.string.isRequired,
        nameString: PropTypes.string.isRequired,
    };

    //组件实例化时调用 可调用多次
    constructor(props) {
        super(props);
        console.log("constructor");
        this.state = {
            loopsRemaining: this.props.maxLoops,
        };
    }

    //实例化 准备加载组件
    componentWillMount() {
        console.log('componentWillMount');
    }

    //实例化 渲染
    render() {
        console.log("render()");
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>

                <TouchableHighlight onPress={this._onPressButton.bind(this)}>
                    <Text style={styles.button}>Button</Text>
                </TouchableHighlight>
                <Counter></Counter>

                <PropsTest name={12356}></PropsTest>

                <StateTest name={"123"}/>
                <RefTest name={"reftest"}/>
            </View>
        );
    }

    _onPressButton() {
        console.log("点击了按钮！");
        this.setState({
            loopsRemaining:20,
        })
        Alert.alert(title='点击按钮');
    }

    //实例化 组件已经被加载 可以与JS其他组件交互 只调用一次
    componentDidMount() {
        console.log('componentDidMount');
    }

    //在组件渲染完成之后，当reactNative组件接受到新的props时，这个函数将被调用，这个函数接受一个object参数，object里时新的props。
    componentWillReceiveProps(nextProps) {
        this.setState({loopsRemaining:nextProps.maxLoops});
        console.log('componentWillReceiveProps' + nextProps.value);
    }

    //返回布尔值（决定是否需要更新组件）
    shouldComponentUpdate(nextProps,nextState){
        console.log("shouldComponentUpdate");
        return false;
    }

    //组件将要更新
    componentWillUpdate(nextProps, nextState){
        console.log("componentWillUpdate");
    }

    //组件已经更新
    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    //销毁阶段 组件将要销毁
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor: '#FF00FF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        backgroundColor: '#FFFF00',
    },
    button:{
        width:200,
        height:50,
        textAlign:'center',
        backgroundColor:'gray',
    }
});
