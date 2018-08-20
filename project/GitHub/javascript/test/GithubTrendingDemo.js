import React,{Component}from "react";
import {View, TouchableOpacity, Text, TextInput, AsyncStorage, ScrollView} from "react-native";
import GitHubTrending from 'GitHubTrending';


const URL = "https://github.com/trending/";

export default class GithubTrendingDemo extends Component{

    constructor(props){
        super(props);
        this.trending = new GitHubTrending();
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
                    <ScrollView>
                        <Text>{this.state.result}</Text>
                    </ScrollView>
                </View>
            </View>
        );
    }

    onLoadData(){
        let url = URL + this.text + "?since=daily";
        this.trending.fetchTrending(url)
            .then((data)=> {
                this.setState({
                    result:JSON.stringify(data),
                });
            }).catch((error)=> {
            this.setState({
                result:JSON.stringify(error),
            });
        });
    }

}