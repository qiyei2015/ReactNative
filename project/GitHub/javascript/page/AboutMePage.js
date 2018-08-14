import React,{Component} from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
import NavigationBar from "../common/NavigationBar";
import {colorPrimary} from "../common/BaseStyles";


export default class AboutMePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"关于作者"}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                />
                <ScrollView>
                    <Text>关于作者</Text>
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
});
