import React,{ Component } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {PropTypes} from "prop-types";

/**
 * 计数器
 */
export default class Counter extends Component{

    /**
     * 定义默认属性
     * @type {{}}
     */
    static defaultProps = {
        initValue:0,
    };

    /**
     * 属性类型
     * @type {{}}
     */
    static propTypes = {
        initValue:PropTypes.number,
        onValueChange:PropTypes.func,
    };

    /**
     * 构造方法
     * @param props
     */
    constructor(props){
        super(props);

        //初始状态
        this.state = {
            value : this.props.initValue,
        };
    }

    //组件渲染布局
    render(){
        return (
            <View style={[styles.operatingBox,this.props.styles]}>
                <TouchableOpacity activeOpacity={0.2}
                                  style={styles.reduce}
                                  onPress={this.reduce.bind(this)}>
                    <Text allowFontScaling={false} style={styles.btn1}>-</Text>
                </TouchableOpacity>

                <View style={styles.inputBox}>
                    <TextInput style={styles.input1}
                               value={this.state.value.toString()}
                               maxLength={9}
                               keyboardType='numeric'
                               autoFocus={false}
                               underlineColorAndroid='transparent'
                               onEndEditing={this.checkInput.bind(this)}
                               onChangeText={this.onChangeText.bind(this)}>
                    </TextInput>
                </View>

                <TouchableOpacity activeOpacity={0.2}
                                  style={styles.plus}
                                  onPress={this.plus.bind(this)}>
                    <Text allowFontScaling={false} style={styles.btn1}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //减少计数
    reduce(){
        this.updateValue(this.state.value-1);
    }

    //增加计数
    plus(){
        this.updateValue(this.state.value+1);
    }

    updateValue(newValue){
        this.setState({
            value: newValue,
        });
        this.props.onValueChange(newValue);
    }

    //检查输入的内容
    checkInput(){
        let res = this.state.value;
        if (res === '' || res < 0) {
            res = 0;
        } else {
            res = Math.floor(res); //舍去小数
        }
        this.updateValue(res);
    }

    //内容改变函数
    onChangeText(txt){
        this.setState({
            value:Number(txt)
        });
        this.props.onValueChange(Number(txt));
    }

    //返回数值
    getCount(){
        return this.state.value;
    }

}

//样式
const styles = StyleSheet.create({
    operatingBox: {
        margin:5,
        width: 120,
        height:35,
        borderColor:'gray', //边框颜色
        borderWidth:1,
        borderRadius: 5, //圆角半径

        flexDirection:'row', //主轴布局
        alignItems: 'center', //侧轴对齐方式
        overflow: 'hidden', //超过控件范围的隐藏
    },
    btn1:{
        fontSize:18,
        textAlign:'center',
        backgroundColor:'transparent', //透明颜色
    },
    inputBox:{
        flex:1, //
        borderRightWidth:1, //右边距
        borderRightColor:'gray', //颜色
    },
    reduce:{
        width:34,
        height:34,
        justifyContent:'center',
        borderRightWidth:1, //右边距
        borderRightColor:'gray', //颜色
    },
    plus:{
        width:34,
        height:34,
        justifyContent:'center',
    },
    input1:{
        flex:1,
        backgroundColor:'transparent', //透明
        textAlign:'center',
        padding:0,
        fontSize:14,
    },
});