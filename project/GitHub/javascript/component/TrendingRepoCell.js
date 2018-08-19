import React,{Component}from "react";
import {View, Image, StyleSheet, TouchableOpacity, Text,DeviceEventEmitter} from "react-native";
import HTMLView from 'react-native-htmlview'
import { PropTypes} from 'prop-types';

export default class TrendingRepoCell extends Component{


    static propTypes = {
        data:PropTypes.object,
        onSelected:PropTypes.func,
        onFavorite:PropTypes.func,
    };

    constructor(props){
        super(props);
        this.state = {
            isFavorite:this.props.projectModel.favorite,
            favoriteIcon:this.props.projectModel.favorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        };
    }

    /**
     * 组件接收到新的props时，会触发该函数
     * @param nextProps 新属性值
     */
    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.projectModel.favorite)
    }

    render(){
        let item = this.props.projectModel.item;
        let description='<p>'+item.description+'</p>';
        let favoriteButton=item?
            <TouchableOpacity
                style={{padding:10}}
                onPress={()=>this.onPressFavorite()} underlayColor='transparent'>
                <Image
                    ref='favoriteIcon'
                    style={[{width: 22, height: 22,},this.props.theme.styles.tabBarSelectedIcon]}
                    source={this.state.favoriteIcon}/>
            </TouchableOpacity>:null;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.cell_container}
                    onPress={this.props.onSelected}>
                    <Text style={styles.title}>{item.fullName}</Text>
                    <HTMLView
                        value={description}
                        onLinkPress={(url) => {

                        }}
                        //指定标签样式
                        stylesheet={{
                            p:styles.description,
                            a:styles.description,
                        }}
                    />
                    <Text style={styles.description}>{item.meta}</Text>
                    {/*最后一行布局及样式*/}
                    <View style={styles.row}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={styles.author}>Built by</Text>
                            {item.contributors.map((result, i, arr) => {
                                return <Image
                                    key={i}
                                    style={{width: 22, height: 22,margin:2}}
                                    source={{uri: arr[i]}}
                                />
                            })}
                        </View>
                        {favoriteButton}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    //是否喜欢
    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel, !this.state.isFavorite)
    }

    //设置属性
    setFavoriteState(isFavorite) {
        this.props.projectModel.favorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        })
    }

    /**
     * 渲染AuthorIcon
     * @param item
     * @returns {Array}
     */
    renderAuthorIcons(item){
        let views = [];
        item.contributors.map((result, i, arr) => {
            views.push(<Image
                key={i}
                style={{width: 22, height: 22,margin:2}}
                source={{uri: arr[i]}}
            />);
        });
        return views;
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
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    author:{
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
});


