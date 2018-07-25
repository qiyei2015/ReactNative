import React,{Component}from "react";
import {View, Image, StyleSheet, TouchableOpacity, Text, TextInput} from "react-native";
import DataRepository from "../expand/dao/DataRepository";
import NavigationBar from "../common/NavigationBar";


const popularSearchUrl = "https://api.github.com/search/repositories?q=";

export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            result:"",
            searchKey:"android",
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"标题标题"}
                    // statusBar={{
                    //     backgroundColor: "green",
                    //     hidden: false,
                    // }}
                    style={{
                        backgroundColor: "#EE6363",
                    }}
                    leftView={
                        <TouchableOpacity onPress={() => {

                        }
                        }>
                            <Image style={{width:22,height:22,margin:5}} source={require("../../res/images/ic_arrow_back_white_36pt.png")}/>
                        </TouchableOpacity>
                    }
                    rightView={
                        <TouchableOpacity>
                            <Image style={{width:22,height:22,margin:5}} source={require("../../res/images/ic_star.png")}/>
                        </TouchableOpacity>
                    }
                />
                <TouchableOpacity onPress={() => this.onLoadFromNetwork(this.state.searchKey)}>
                    <Text>获取数据</Text>
                </TouchableOpacity>
                <TextInput style={styles.input} onChangeText={(text) => this.setState({
                    searchKey:text,
                })}/>
                <Text>{this.state.result}</Text>
            </View>
        );
    }

    //加载网络数据
    onLoadFromNetwork(key){
        const subUrl = "&sort=star";
        let url = popularSearchUrl + key + subUrl;
        this.dataRepository.fetchNetworkRepository(url)
            .then((result) => {
                this.setState({
                    result: JSON.stringify(result),
                })
            })
            .catch((error) => {
                this.setState({
                    result: JSON.stringify(error),
                })
            });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    input:{
        height:50,
    }
});