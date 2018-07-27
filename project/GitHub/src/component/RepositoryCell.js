import React,{Component}from "react";
import {View, Image, StyleSheet, TouchableOpacity, Text, ListView, RefreshControl} from "react-native";
import {DURATION} from "react-native-easy-toast";



export default class RepositoryCell extends Component{

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.cell_container}
                    onPress={() => {
                        this.toast.show("你点击:" + item.full_name,DURATION.LENGTH_SHORT);
                    }}>
                    <Text style={styles.title}>{this.props.data.full_name}</Text>
                    <Text style={styles.description}>{this.props.data.description}</Text>
                    {/*最后一行布局及样式*/}
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text>Author:</Text>
                            <Image style={{width:22,height:22}} source={{uri:this.props.data.owner.avatar_url}}/>
                        </View>
                        <Text style={styles.description}>Stars:{this.props.data.stargazers_count}</Text>
                        <Image style={{width:22,height:22}} source={require("../../res/images/ic_star.png")}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cell_container:{
        backgroundColor: 'white',
        padding:10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor:"#DDDDDD",
        borderWidth:0.5,
        borderRadius:5,
        shadowColor:"gray",
        shadowOffset:{width:1,height:1},
        shadowRadius:1,
        shadowOpacity:0.5,
        elevation:5, //Android 有效

    },
    title:{
        fontSize:16,
        marginBottom: 2,
        color:"#212121",
    },
    description:{
        fontSize:14,
        marginBottom: 2,
        color:"#757575",
    },
    line:{
        height:1,
        backgroundColor:"black",
    }
});


