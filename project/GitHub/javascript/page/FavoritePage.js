import React,{Component}from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    ListView,
    RefreshControl,
    DeviceEventEmitter
} from "react-native";
import DataRepository, {FLAG_STORAGE} from "../expand/dao/DataRepository";
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view";
import { PropTypes} from 'prop-types';
import RepositoryCell from "../component/RepositoryCell";
import {colorPrimary} from "../common/BaseStyles";
import NavigationBar from "../common/NavigationBar";
import LanguageDao,{FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import Constant from "../common/Constant";
import RepositoryDetail from "./RepositoryDetail";
import ProjectModel from "../model/ProjectModel";
import FavoriteDao, {FLAG_FAVORITE} from "../expand/dao/FavoriteDao";
import Util from "../util/Util";
import ViewUtil from "../util/ViewUtil";
import TrendingRepoCell from "../component/TrendingRepoCell";

/**
 * 定义收藏页面的key
 * @type {{}}
 */
const FLAG = [{name:"最热",key:FLAG_FAVORITE.flag_key},{name:"趋势",key:FLAG_FAVORITE.flag_language}];

export default class FavoritePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {navigation} = this.props;
        let content = <ScrollableTabView
            tabBarBackgroundColor={colorPrimary}
            tabBarInactiveTextColor="mintcream"
            tabBarActiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor: "#E7E7E7", height: 2}}
            renderTabBar={() =>
                <ScrollableTabBar
                    style={{height: 40, borderWidth: 0, elevation: 2}}
                    tabStyle={{height: 39}}/>
            }
            initialPage={0}
            onScroll={(position) => {
            }}
        >
            <FavoriteTab tabLabel={FLAG[0].name} data = {FLAG[0]} theme={{colorPrimary: colorPrimary}} {...this.props}/>
            <FavoriteTab tabLabel={FLAG[1].name} data = {FLAG[1]} theme={{colorPrimary: colorPrimary}} {...this.props}/>
        </ScrollableTabView>;
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"收藏"}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    statusBar={{
                        backgroundColor: colorPrimary,
                        hidden: false,
                    }}
                    leftView={
                        ViewUtil.getLeftButton(() => {
                            navigation.goBack();
                        })
                    }
                    rightView={
                        <TouchableOpacity>
                            <Image style={{width: 22, height: 22, margin: 5}}
                                   source={require("../../res/images/ic_star.png")}/>
                        </TouchableOpacity>
                    }
                />
                {content}
            </View>
        );
    }

}

//页面具体视图
class FavoriteTab extends Component{

    static defaultProps={
        tabLabel:"",
    };

    static propTypes={
        tabLabel: PropTypes.string.isRequired,
    };

    constructor(props){
        super(props);
        //初始化数据仓库
        this.flag = this.props.data.key;
        this.favoriteDao = new FavoriteDao(this.flag);
        console.log("flag:" + this.flag);
        //显示的原始数据
        this.items = [];
        this.state = {
            projectModels:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            refreshing:false,
            favoriteKeys:[],
        };

        this.getFavoriteKeys();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ListView
                    //关联dataSource
                    dataSource={this.state.projectModels}
                    //返回的视图，当前row数据
                    renderRow={(rowData) => this.renderRow(rowData)}
                    //行与行之间分隔符
                    // renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    refreshControl={
                        <RefreshControl
                            //android
                            colors={[this.props.theme.colorPrimary]}
                            //ios
                            tintColor={this.props.theme.colorPrimary}
                            //ios
                            title="Loading"
                            titleColor={this.props.theme.colorPrimary}
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.loadData()}
                        />
                    }
                />
            </View>
        );
    }

    //页面装载完成
    componentDidMount(){
        this.loadData();
    }

    //加载数据
    loadData() {
        this.favoriteDao.getAllFavoriteItems().then(items => {
            if (items){
                this.items = items;
            }
            console.log("items:" + items);
            this.getFavoriteKeys();
        }).catch(error => {
            console.log(error);
        })
    }

    //每一行渲染数据
    renderRow(projectModel){
        let CellComponent = this.flag === FLAG_FAVORITE.flag_key ? RepositoryCell : TrendingRepoCell
        //设置onSelected的回调函数
        return (
            <CellComponent {...this.props} key={this.getFavoriteKeyForItem(projectModel.item)}
                           projectModel={projectModel}
                           onSelected={() => this.onSelected(projectModel)}
                           onFavorite={(projectModel, favorite) =>
                               this._onFavorite(projectModel, favorite)}
            />
        )
    }

    //选中某一行
    onSelected(projectModel){
        this.props.navigation.navigate(
            "RepositoryDetail",
            {...this.props,projectModel:projectModel},
        )
    }

    /**
     * 点击收藏函数
     * @param item
     * @param favorite
     * @private
     */
    _onFavorite(projectModel, favorite){
        //更新状态

        if (favorite){
            this.favoriteDao.saveFavoriteItem(this.getFavoriteKeyForItem(projectModel.item),projectModel.item);
        }else {
            this.favoriteDao.removeFavoritem(this.getFavoriteKeyForItem(projectModel.item));
        }
        // this.getFavoriteKeys();
    }

    /**
     * 获取keys
     */
    getFavoriteKeys(){
        //获取key
        this.favoriteDao.getFavoriteKeys().then(result => {
            if (result){
                this.setState({
                    favoriteKeys:result,
                });
                console.log("favoriteKeys:" + result);
            }

            //3 更新popular item
            this.updateItem(this.items);
        }).catch(error => {
            //3 更新popular item
            this.updateItem(this.items);
            console.log(error);
        });
    }


    /**
     * 更新显示的ListView Item数据
     * @param items
     */
    updateItem(items){
        let array = [];
        for (let i = 0 ;i < items.length ;i++){
            let model = new ProjectModel(items[i],Util.checkFavorite(this.getFavoriteKeyForItem(items[i]),this.state.favoriteKeys));
            array.push(model);
        }

        //4 更新ListView数据源，显示数据
        this.setState({
            refreshing:false,
            projectModels:this.state.projectModels.cloneWithRows(array),
        });
    }

    /**
     * 获取收藏的key
     * @param flag
     */
    getFavoriteKeyForItem(item){
        if (this.flag === FLAG_FAVORITE.flag_key) {
            return item.id.toString();
        }else if (this.flag === FLAG_FAVORITE.flag_language) {
            return item.fullName;
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
});