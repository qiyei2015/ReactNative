import React,{Component}from "react";
import {View, Image, StyleSheet, TouchableOpacity, Text,DeviceEventEmitter} from "react-native";
import Constant from "../common/Constant";
import {PropTypes} from "prop-types";


export default class RepositoryCell extends Component{

    static propTypes = {
        projectModel:PropTypes.object,
        onSelected:PropTypes.func,
        onFavorite:PropTypes.func,
    };

    constructor(props){
        super(props);
        this.projectModel = this.props.projectModel;
        this.state = {
            isFavorite:this.projectModel.favorite,
            favoriteIcon:this.projectModel.favorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        };
    }

    render(){
        let item = this.projectModel.item;
        let favoriteButton = item ?
            <TouchableOpacity
                style={{padding: 10}}
                onPress={() => this.onPressFavorite()} underlayColor='transparent'>
                <Image
                    ref='favoriteIcon'
                    style={[{width: 22, height: 22,}, {tintColor: "#2196F3"}]}
                    source={this.state.favoriteIcon}/>
            </TouchableOpacity> : null;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.cell_container}
                    onPress={this.props.onSelected}>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    {/*最后一行布局及样式*/}
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text>Author:</Text>
                            <Image style={{width:22,height:22}} source={{uri:item.owner.avatar_url}}/>
                        </View>
                        <Text style={styles.description}>Stars:{item.stargazers_count}</Text>
                        {favoriteButton}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    onPressFavorite(){
        let favorite = !this.state.isFavorite;
        this.setFavorite(favorite);
        //回调给父组件
        this.props.onFavorite(this.projectModel.item,favorite);
    }

    setFavorite(favorite){
        // DeviceEventEmitter.emit(Constant.SHOW_TOAST,"favorite:" + favorite);
        this.setState({
            isFavorite:favorite,
            favoriteIcon:favorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        });
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


