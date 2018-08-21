import React,{Component}from "react";
import {View, Image, StyleSheet, Text,Platform, StatusBar} from "react-native";
import { PropTypes} from 'prop-types';
import {Theme} from "../style/ThemeFactory";

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;

const StatusBarShape={
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden:PropTypes.bool,
};

export default class NavigationBar extends Component{

    //定义属性，并设置默认值
    static defaultProps = {
        statusBar:{
            barStyle:"light-content",
            hidden:false,
        },
    };

    //设置属性约束
    static propTypes = {
        title:PropTypes.string,
        titleView:PropTypes.element,
        hide:PropTypes.bool,
        leftView:PropTypes.element,
        rightView:PropTypes.element,
        statusBar:PropTypes.shape(StatusBarShape),
    };

    //构造方法
    constructor(props){
        super(props);
        //初始化状态
        this.state = {
            title:"",
            hide:false,
        }
    }

    render(){
        //状态栏
        let statusBar = <View style={[styles.statusBar,this.props.statusBar]}>
            {/*获取props属性赋值给StatusBar*/}
            <StatusBar {...this.props.statusBar}/>
        </View>
        let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>
        let contentView = <View style={styles.navigationBar}>
            {this.props.leftView}
            <View style={styles.titleContent}>
                {titleView}
            </View>
            {this.props.rightView}
        </View>;

        return (
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {contentView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Theme.Default,
    },
    navigationBar:{
        justifyContent:"space-between",//主轴
        alignItems:"center",//侧轴
        height:Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
        flexDirection:"row",
    },
    titleContent:{
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        left:40,
        right:40,
        top:0,
        bottom:0,
    },
    title:{
        fontSize:20,
        color:"white",
    },
    statusBar:{
        height:Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,
    }
});