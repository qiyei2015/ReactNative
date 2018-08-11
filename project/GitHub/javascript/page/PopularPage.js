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


const BASE_URL = "https://api.github.com/search/repositories?q=";

const favoriteDao = new FavoriteDao(FLAG_FAVORITE.flag_key);

export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            languages:[],
        }
    }

    render(){
        let {navigation} = this.props;
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor= {colorPrimary}
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}
                renderTabBar={() =>
                    <ScrollableTabBar
                        style={{height:40,borderWidth: 0, elevation: 2}}
                        tabStyle={{height:39}}/>
                }
                initialPage={0}
                onScroll={(position)=>{}}
            >
                {/*根据配置文件加载标签*/}
                {this.state.languages.map((result,i,arr) => {
                    let lan = arr[i];
                    return lan.checked ?  <PopularTab key={i} tabLabel={lan.name} theme={{colorPrimary: colorPrimary}} {...this.props}/>:null;
                })}
            </ScrollableTabView> : null;

        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"最热"}
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
                                navigation.goBack();
                            }
                            }>
                            <Image style={{width: 22, height: 22, margin: 5}}
                                   source={require("../../res/images/ic_arrow_back_white_36pt.png")}/>
                        </TouchableOpacity>
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

    //视图加载完成
    componentDidMount(){
        this.loadData();
    }

    //加载数据
    loadData(){
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    languages: result,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

//页面具体视图
class PopularTab extends Component{

    static defaultProps={
        tabLabel:"",
    };

    static propTypes={
        tabLabel: PropTypes.string.isRequired,
    };

    constructor(props){
        super(props);
        //初始化数据仓库
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.items = [];
        this.state = {
            projectModels:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            refreshing:false,
            favoriteKeys:[],
        }
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
                            onRefresh={() => this.loadPopularData()}
                        />
                    }
                />
            </View>
        );
    }

    //页面装载完成
    componentDidMount(){
        this.loadPopularData();
    }

    //加载数据
    loadPopularData(){
        const subUrl = "&sort=stars";
        let url = BASE_URL + this.props.tabLabel + subUrl;
        //设置开始刷新
        this.setState({
            refreshing:true,
        });

        //1 加载popular数据
        this.dataRepository.fetchRepository(url)
            .then((result) => {
                //从数据仓库中获取items数据
                this.items=result && result.items ? result.items : result ? result : [];
                //2 获取收藏的keys
                this.getFavoriteKeys();
            })
            .catch((error) => {
                //2 获取收藏的keys
                this.getFavoriteKeys();
                console.log(error);
            });
    }

    //每一行渲染数据
    renderRow(projectModel){
        return(
            //设置onSelected的回调函数
            <RepositoryCell {...this.props} key={projectModel.item.id} projectModel={projectModel}
                            onSelected={() => this.onSelected(projectModel)}
                            onFavorite={(projectModel,favorite) => this._onFavorite(projectModel, favorite)}
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
            favoriteDao.saveFavoriteItem(projectModel.item.id.toString(),projectModel.item);
        }else {
            favoriteDao.removeFavoritem(projectModel.item.id.toString());
        }
        // this.getFavoriteKeys();
    }

    /**
     * 获取keys
     */
    getFavoriteKeys(){
        //获取key
        favoriteDao.getFavoriteKeys().then(result => {
            if (result){
                this.setState({
                    favoriteKeys:result,
                });
            }

            //3 更新popular item
            this.updatePopularItem(this.items);
        }).catch(error => {
            //3 更新popular item
            this.updatePopularItem(this.items);
            console.log(error);
        });
    }


    /**
     * 更新显示的ListView Item数据
     * @param items
     */
    updatePopularItem(items){
        let array = [];
        for (let i = 0 ;i < items.length ;i++){
            let model = new ProjectModel(items[i],Util.checkFavorite(items[i].id.toString(),this.state.favoriteKeys));
            array.push(model);
        }

        DeviceEventEmitter.emit(Constant.SHOW_TOAST,""+Util.checkFavorite(items[0].id.toString(),this.state.favoriteKeys));
        //4 更新ListView数据源，显示数据
        this.setState({
            refreshing:false,
            projectModels:this.state.projectModels.cloneWithRows(array),
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
});