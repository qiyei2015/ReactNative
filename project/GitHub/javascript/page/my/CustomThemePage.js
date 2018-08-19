
import React,{Component} from "react";
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View,Platform} from "react-native";
import {Theme} from "../../style/ThemeFactory";
import NavigationBar from "../../common/NavigationBar";
import {colorPrimary} from "../../common/BaseStyles";
import GlobalStyle from "../../style/GlobalStyle"

/**
 * 自定义主题
 */
export default class CustomThemePage extends Component{

    constructor(props){
        super(props);
        this.state= {
            visible: this.props.visible,
        };
    }

    render(){
        return (
            this.state.visible ? <View style={GlobalStyle.root_container}>
                {this.renderContentView()}
            </View>:null
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({visible:nextProps.visible});
    }

    /**
     * 渲染内容View
     * @returns {*}
     */
    renderContentView(){
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => this.onClose()}>
            <NavigationBar
                title={"自定义主题"}
                style={{
                    backgroundColor: colorPrimary,
                }}
            />
            <View style={styles.modalContainer}>
               <ScrollView>
                   {this.renderThemeItemView()}
               </ScrollView>
            </View>
        </Modal>
    }

    /**
     * 渲染itemView
     */
    renderThemeItemView(){
        let views = [];
        for (let i = 0,keys = Object.keys(Theme); i < keys.length ;i += 3) {
            views.push(
                <View key={i} style={{flexDirection:"row"}}>
                    {this.getThemeItem(keys[i])}
                    {this.getThemeItem(keys[i+1])}
                    {this.getThemeItem(keys[i+2])}
                </View>);
        }
        return views;
    }

    /**
     * 获取单个Item
     */
    getThemeItem(theme){
        return (
            <TouchableOpacity
                onPress={() => this.onSelectedTheme(theme)}
                style={{flex:1}}
            >
                <View style={[{backgroundColor:Theme[theme]},styles.themeItem]}>
                    <Text style={styles.themeText}>{theme}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    onSelectedTheme(theme){
        this.onClose();
    }

    /**
     * 主题页面关闭
     */
    onClose(){
        this.props.onThemeClose();
    }
}

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        // margin: 10,
        // marginTop:Platform.OS==='ios' ? 20:10,
        backgroundColor:'white',
        borderRadius:3,
        shadowColor:'gray',
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.5,
        shadowRadius:2,
        paddingLeft:3,
        paddingRight: 3,
        paddingBottom: 3,

    },
    themeItem:{
        flex:1,
        height: 120,
        margin:3,
        padding:3,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeText:{
        color:'white',
        fontWeight:'500',
        fontSize:16
    },

});