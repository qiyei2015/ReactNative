import React,{Component} from "react";
import {Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, TouchableHighlight} from "react-native";
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import ArrayUtil from "../../util/ArrayUtil";
import SortableListView from 'react-native-sortable-listview'
import {colorPrimary} from "../../common/BaseStyles";
import ViewUtil from "../../util/ViewUtil";
import NavigationBar from "../../common/NavigationBar";

export default class SortLabelPage extends Component{

    constructor(props){
        super(props);
        this.flag = this.props.navigation.state.params.flag ? this.props.navigation.state.params.flag : FLAG_LANGUAGE.flag_key;
        this.languageDao = new LanguageDao(this.flag);
        //读取的配置数组
        this.dataArray = [];
        this.sortResultArray = [];
        //上次check数组
        this.originalCheckedArray = [];
        this.state = {
            checkedArray:[],
        }
    }

    render(){
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}>
            <View style={{margin: 10}}>
                <Text style={styles.rightText}>保存</Text>
            </View>
        </TouchableOpacity>;
        let title = this.flag === FLAG_LANGUAGE.flag_key ? "标签排序" : "语言排序";
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    leftView={ViewUtil.getLeftButton(() => {
                        this.onBack();
                    })}
                    rightView={rightButton}
                />
                <SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row} />}
                />
            </View>
        );
    }

    componentDidMount(){
        this.loadData();
    }

    //加载数据
    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.getCheckedItems(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //获取已被选中的item
    getCheckedItems(data){
        this.dataArray = data;
        let checkeds = [];
        for (let i = 0 ; i < this.dataArray.length ; i++){
            let item = this.dataArray[i];
            if (item.checked){
                checkeds.push(item);
            }
        }
        this.setState({
            checkedArray:checkeds,
        });
        this.originalCheckedArray = ArrayUtil.clone(checkeds);
    }

    //返回
    onBack(){
        if (!ArrayUtil.isEqual(this.originalCheckedArray,this.state.checkedArray)) {
            Alert.alert(
                '提示',
                '要保存修改吗？',
                [
                    {text: '取消', onPress: () => this.props.navigation.goBack(), style: 'cancel'},
                    {text: '确认', onPress: () => this.onSave(true)},
                ],
                { cancelable: false }
            )
        }else {
            this.props.navigation.goBack();
        }
    }

    //保存数据
    onSave(checked){
        if (!checked){
            if (ArrayUtil.isEqual(this.originalCheckedArray,this.state.checkedArray)) {
                this.props.navigation.goBack();
                return;
            }
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigation.goBack();
    }

    //获取排序后的结果，并保存
    getSortResult(){
        //拷贝原始数组
        this.sortResultArray = ArrayUtil.clone(this.dataArray);
        for (let i = 0; i < this.originalCheckedArray.length ; i++){
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);
            //删除老的，替换新的
            this.sortResultArray.splice(index,1,this.state.checkedArray[i]);
        }
    }
}


class SortCell extends Component{
    render(){
        return(
            <TouchableHighlight
                underlayColor={'#eee'}
                style={{
                    padding: 25,
                    backgroundColor: '#F8F8F8',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                }}
                {...this.props.sortHandlers}>
                <View style={styles.row}>
                    <Image style={{width:22,height:22, marginRight:20,tintColor:"#2196F3"}} source={require("./img/ic_sort.png")}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>

        );
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
    row: {
        flexDirection: "row",
        alignItems:"center",
    },
});
