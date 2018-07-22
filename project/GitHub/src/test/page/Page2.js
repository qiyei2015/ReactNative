import React,{Component} from "react";
import {Text, View, StyleSheet, Button} from "react-native";


export default class Page2 extends Component{

    render(){
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Button
                    title="Go Back"
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Text>Page2 </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    },

});