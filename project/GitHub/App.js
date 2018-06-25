/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text, TouchableHighlight,
    View
} from 'react-native';
import { PropTypes} from 'prop-types';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class Greeting extends Component{
  render(){
      return (
          <Text>Hello {this.props.name}</Text>
      );
  }
}

export default class App extends Component<Props> {

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

    /**
     * 在组件渲染完成之后，当reactNative组件接受到新的props时，这个函数将被调用，这个函数接受一个object参数，object里时新的props。
     * @param nextProps 新的props
     */
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps' + nextProps.value);
    }

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
                <Greeting name='React 1'/>
                <Greeting name='React 2'/>
                <Greeting name='React 3'/>

                <TouchableHighlight onPress={this._onPressButton}>
                    <Text>Button</Text>
                </TouchableHighlight>
            </View>
        );
    }

    _onPressButton() {
        console.log("点击了按钮！");
    }

    //实例化 组件已经被加载 可以与JS其他组件交互 只调用一次
    componentDidMount() {
        console.log('componentDidMount');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
