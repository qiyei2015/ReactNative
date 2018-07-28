import React,{Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView} from "react-native";
import NavigationBar from "../../common/NavigationBar";
import {colorPrimary} from "../../common/BaseStyles";
import ViewUtil from "../../util/ViewUtil";
import LanguageDao,{FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import CheckBox from "react-native-check-box";
import ArrayUtil from "../../util/ArrayUtil";

export default class CustomLabelPage extends Component{
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.changeValues = [];
        this.state = {
            //数组
            dataArray:[],
        }
    }

    render(){
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}
        >
            <View style={{margin: 10}}>
                <Text style={styles.rightText}>保存</Text>
            </View>
        </TouchableOpacity>
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"自定义标签"}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    leftView={ViewUtil.getLeftButton(() => {
                        this.onBack();
                    })}
                    rightView={rightButton}
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }

    //视图加载完成
    componentDidMount(){
        this.loadData();
    }

    //加载数据
    loadData(){
        this.languageDao.fetch()
            .then(result => {
                console.log("loadData:" + JSON.stringify(result));
                this.setState({
                    dataArray: result,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onBack(){
        this.languageDao.clear();
    }

    //保存数据
    onSave(){
        if (this.changeValues.length !== 0){
            this.languageDao.save(this.changeValues);
        }
        this.props.navigation.goBack();
    }

    renderView(){
        if (!this.state.dataArray || this.state.dataArray.length === 0) {
            return null;
        }
        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0,l = len - 2 ; i < l;i +=2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len-2]):null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        );
        return views;
    }

    renderCheckBox(data) {
        let leftText = data.name;
        return <CheckBox
            style={{flex: 1,padding: 10}}
            leftText={leftText}
            onClick={() => {
                this.onClick(data);
            }
            }
            isChecked={data.checked}
            checkedImage={<Image style={{tintColor:"#6495ED"}} source={require("./img/ic_check_box.png")}/>}
            unCheckedImage={<Image style={{tintColor:"#6495ED"}} source={require("./img/ic_check_box_outline_blank.png")}/>}
            />
    }

    //标签单击函数
    onClick(data){
        data.checked = !data.checked;
        ArrayUtil.updateArray(this.changeValues,data);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    rightText:{
        fontSize:20,
        color:"white",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    line: {
        height: 0.3,
        backgroundColor:"darkgray",
    },
});
