
import React,{Component}from "react";
import {View, WebView, StyleSheet, TouchableOpacity, Image,DeviceEventEmitter} from "react-native";
import {colorPrimary} from "../common/BaseStyles";
import NavigationBar from "../common/NavigationBar";
import FavoriteDao, {FLAG_FAVORITE} from "../model/dao/FavoriteDao";
import BackPressComponent from "../component/BackPressComponent";

const TRENDING_URL = 'https://github.com/';

/**
 * 详情页面
 */
export default class RepositoryDetail extends Component{
    constructor(props){
        super(props);
        this.backPress = new BackPressComponent({backPress:(e)=>this.onBackPress(e)});
        //获取数据
        this.projectModel = this.props.navigation.state.params.projectModel;
        this.isTrending = this.props.navigation.state.params.isTrending ? true : false;

        if (this.isTrending){
            this.favoriteDao = new FavoriteDao(FLAG_FAVORITE.flag_language);
        } else {
            this.favoriteDao = new FavoriteDao(FLAG_FAVORITE.flag_key);
        }
        //设置url,title等
        this.state = {
            url:this.isTrending ? TRENDING_URL + this.projectModel.item.fullName : this.projectModel.item.html_url,
            title:this.isTrending ? this.projectModel.item.fullName : this.projectModel.item.full_name,
            canGoBack:false,
            favorite:this.projectModel.favorite,
            favoriteIcon:this.projectModel.favorite ? require("../../res/images/ic_star.png"):require("../../res/images/ic_star_navbar.png"),
        }
    }
    render(){
        let favoriteButton = <TouchableOpacity onPress={() => this._onFavorite()}>
            <Image style={{width: 22, height: 22, margin: 5}}
                   source={this.state.favoriteIcon}/>
        </TouchableOpacity>;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    statusBar={{
                        backgroundColor: colorPrimary,
                        hidden: false,
                    }}
                    leftView={
                        <TouchableOpacity
                            onPress={() => {
                                this.goBack();
                            }
                            }>
                            <Image style={{width: 22, height: 22, margin: 5}}
                                   source={require("../../res/images/ic_arrow_back_white_36pt.png")}/>
                        </TouchableOpacity>
                    }
                    rightView={favoriteButton}
                />
                <WebView
                    ref = {webView => this.webView = webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange = {navState => this.navigationStateChange(navState)}
                    startInLoadingState={true}
                />
            </View>
        );
    }

    componentDidMount(){
        this.backPress.componentDidMount();
    }

    componentWillUnmount(){
        this.backPress.componentWillUnmount();
    }

    onBackPress(){
        this.goBack();
        return true;
    }

    //返回
    goBack(){
        if (this.state.canGoBack){
            this.webView.goBack();
        }else {
            //返回上个界面
            this.props.navigation.goBack();
        }
    }

    //状态监听回调
    navigationStateChange(navState){
        this.setState({
            canGoBack:navState.canGoBack,
            url: navState.url,
        });
    }

    /**
     * 收藏点击
     * @private
     */
    _onFavorite(){
        let isFavorite = !this.state.favorite;
        // DeviceEventEmitter.emit(Constant.SHOW_TOAST,"favorite:" + isFavorite);
        this.setState({
            favorite:isFavorite,
            favoriteIcon:isFavorite ? require("../../res/images/ic_star.png"):require("../../res/images/ic_star_navbar.png"),
        });
        this.updateFavoriteItem(isFavorite);
    }

    /**
     * 更新收藏item
     * @param isFavorite
     */
    updateFavoriteItem(isFavorite){
        let key = null;
        //获取key
        if (this.isTrending){
            key = this.projectModel.item.fullName;
        }else {
            key = this.projectModel.item.id.toString();
        }
        //添加item或者删除item
        if (isFavorite){
            this.favoriteDao.saveFavoriteItem(key,this.projectModel.item);
        } else {
            this.favoriteDao.removeFavoritem(key);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input:{
        flex:1,
        borderWidth: 1,
    }
});