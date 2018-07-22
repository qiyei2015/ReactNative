import React,{ Component } from 'react';
import {Image, ListView, Text, View, StyleSheet, TouchableOpacity,RefreshControl} from "react-native";
import {data, data2} from "./DataSource";
import Toast, {DURATION} from 'react-native-easy-toast'

const image_path1 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532239791998&di=32c51d8caf80fb4e3d99947cb4c792ea&imgtype=0&src=http%3A%2F%2Fs13.sinaimg.cn%2Fmw690%2F006VYEqnzy7fjjYn5HC8c%26690';

export default class ListViewDemo extends Component{

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
            refreshing:false,
        };
    }

    render(){
        return(
            <View>
                <ListView
                    //关联dataSource
                    dataSource={this.state.dataSource}
                    //返回的视图，当前row数据
                    renderRow={(rowData) => this.renderRow(rowData)}
                    //行与行之间分隔符
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    renderFooter={() => this.renderFooter()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.onRefresh()}
                        />
                    }
                />
                {/*需要放在最外层*/}
                <Toast ref={(toast) => this.toast = toast}/>
            </View>

        )
    }

    //每一行渲染数据
    renderRow(item){
        return(
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => {
                        this.toast.show("你点击:" + item.name,DURATION.LENGTH_SHORT);
                }}>
                    <Text style={styles.tips}>{item.name}</Text>
                    <Text style={styles.tips}>{item.startTime}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return (
            <View key={rowID} style={styles.line}>

            </View>
        )
    }

    renderFooter(){
        return(
            <Image
                style={{width:Module.screenWidth,height:200}}
                source={{uri:image_path1}}
            />
        )
    }

    //下拉刷新数据
    onRefresh(){
        this.setState({
            refreshing:true,
        });
        //做网络数据请求
        setTimeout(()=>{
            this.toast.show("数据请求完毕！更新界面",DURATION.LENGTH_SHORT);
            var newData = data2.result;
            this.setState({
                refreshing:false,
                // dataSource:ds.cloneWithRows(data2.result),
            })
        },3000);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    },
    tips:{
        fontSize:20,
    },
    row:{
        height:80,
    },
    line:{
       height:1,
       backgroundColor:"black",
    }
});