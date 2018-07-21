import React,{ Component } from 'react';
import {Image, ListView, Text, View,StyleSheet} from "react-native";
import {data} from "./DataSource";


export default class ListViewDemo extends Component{

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
        };
    }

    render(){
        return(
            <ListView
                //关联dataSource
                dataSource={this.state.dataSource}
                //返回的视图，当前row数据
                renderRow={(rowData) => this.renderRow(rowData)}
            />
        )
    }

    renderRow(item){
        return(
            <View style={styles.row}>
                <Text style={styles.tips}>{item.name}</Text>
                <Text style={styles.tips}>{item.startTime}</Text>
            </View>
        )
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
        height:70,
    }
});