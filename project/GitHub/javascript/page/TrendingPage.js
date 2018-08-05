import React,{Component}from "react";
import {View,TouchableOpacity, Text, TextInput} from "react-native";
import DataRepository, {FLAG_STORAGE} from "../expand/dao/DataRepository";


const URL = "https://github.com/trending/";

export default class TrendingPage extends Component{

    constructor(props){
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            result:"",
        }
    }

    render(){
        return (
            <View>
                {/*赋值给AsyncStorageDemo.text变量*/}
                <TextInput onChangeText={(text) => this.text=text}/>
                <View style={{flexDirection:"row",justifyContent:"space-between", margin:10}}>
                    <TouchableOpacity onPress={() => this.onLoadData()}>
                        <Text>加载</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>{this.state.result}</Text>
                </View>
            </View>
        );
    }

    onLoadData(){
        let url = URL + this.text + "?since=daily";
        this.dataRepository.fetchRepository(url).then(data => {
            this.setState({
                result:JSON.stringify(data),
            });
        }).catch(error => {
            this.setState({
                result:JSON.stringify(error),
            });
        });
    }

}