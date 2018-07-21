import React,{Component} from "react";
import {Text, View, StyleSheet, Button} from "react-native";


export default class Page1 extends Component{

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
                {/*使用属性名*/}
                <Text>Page1</Text>
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