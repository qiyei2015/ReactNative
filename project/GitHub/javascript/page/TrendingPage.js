import React,{Component}from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ListView,
    RefreshControl,
    DeviceEventEmitter, Text,
} from "react-native";

import DataRepository, {FLAG_STORAGE} from "../expand/dao/DataRepository";
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view";
import { PropTypes} from 'prop-types';
import {colorPrimary} from "../common/BaseStyles";
import NavigationBar from "../common/NavigationBar";
import LanguageDao,{FLAG_LANGUAGE} from "../expand/dao/LanguageDao";

import RepositoryDetail from "./RepositoryDetail";
import TrendingRepoCell from "../component/TrendingRepoCell";
import Constant from "../common/Constant";
import TrendingDialog ,{TimeSpans} from "../component/TrendingDialog";
import ProjectModel from "../model/ProjectModel";
import FavoriteDao, {FLAG_FAVORITE} from "../expand/dao/FavoriteDao";
import Util from "../util/Util";





const BASE_URL = "https://github.com/trending/";

const EVENT_TYPE_TIME_SPAN_CHANGE="EVENT_TYPE_TIME_SPAN_CHANGE";

const favoriteDao = new FavoriteDao(FLAG_FAVORITE.flag_language);

export default class TrendingPage extends Component{
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            languages:[],
            isVisible: false,
            timeSpan:TimeSpans[0],
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
                {this.state.languages.map((result, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ? <TrendingTab key={i} tabLabel={lan.name} labelData={lan}
                                                      theme={{colorPrimary: colorPrimary}}
                                                      timeSpan={this.state.timeSpan} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;

        return(
            <View style={styles.container}>
                {/*导航条*/}
                <NavigationBar
                    titleView={this.renderTitleView()}
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
                {/*对话框*/}
                {this.renderTrendingDialog()}
            </View>
        );
    }

    //视图加载完成
    componentDidMount(){
        this.loadData();
    }

    /**
     * 渲染TitleView
     */
    renderTitleView(){
        return (
            <View>
                <TouchableOpacity
                    ref='button'
                    underlayColor='transparent'
                    onPress={() => this.showPopover()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 18,
                            color: '#FFFFFF',
                            fontWeight: '400'
                        }}>趋势 {this.state.timeSpan.showText}</Text>
                        <Image
                            style={{width: 12, height: 12, marginLeft: 5}}
                            source={require('../../res/images/ic_spinner_triangle.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 渲染对话框
     * @returns {*}
     */
    renderTrendingDialog(){
        return (
            <TrendingDialog
                ref = {dialog => this.dialog = dialog}
                onSelect={(tab) => this.onSelectTimeSpan(tab)}/>
        );

    }

    /**
     * 选中timeSpan
     */
    onSelectTimeSpan(timeSpan){
        this.closePopover();
        //发送更新事件到TendingTab
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE,this.state.timeSpan,timeSpan);
        this.setState({
           timeSpan:timeSpan,
        });
    }

    showPopover() {
        this.dialog.show();
    }

    closePopover() {
        this.dialog.dismiss();
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
class TrendingTab extends Component{

    static defaultProps={
        labelData:"",
    };

    static propTypes={
        labelData: PropTypes.object,
    };

    constructor(props){
        super(props);
        //初始化数据仓库
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.items = [];
        this.state = {
            projectModels: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            refreshing: false,
            favoriteKeys: [],
        }

    }

    render(){
        return(
            <View style={{flex:1}}>
                <ListView
                    //关联dataSource
                    dataSource={this.state.projectModels}
                    //返回的视图，当前row数据
                    renderRow={(projectModel) => this.renderRow(projectModel)}
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
                            onRefresh={() => this.loadTrendingData(this.props.timeSpan)}
                        />
                    }
                />
            </View>
        );
    }

    //页面装载完成
    componentDidMount(){
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (from,to) => {
            this.loadTrendingData(to);
        });
        this.loadTrendingData(this.props.timeSpan);
    }

    componentWillUnmount(){
        //卸载监听
        this.timeSpanChangeListener && this.timeSpanChangeListener.remove();

    }

    //1 加载数据
    loadTrendingData(timeSpan){
        let url = BASE_URL + this.props.labelData.path + "?since=" + timeSpan.searchText;
        //设置开始刷新
        this.setState({
            refreshing:true,
        });

        this.dataRepository.fetchRepository(url)
            .then((result) => {
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
        return (
            //设置onSelected的回调函数
            <TrendingRepoCell {...this.props} projectModel={projectModel} onSelected={() => this.onSelected(projectModel)}
                              onFavorite={(projectModel, favorite) => {
                                  this._onFavorite(projectModel, favorite)
                              }}/>
        )
    }

    //选中某一行
    onSelected(projectModel){
        this.props.navigation.navigate(
            "RepositoryDetail",
            {...this.props,projectModel:projectModel,isTrending:true},
        )
    }

    /**
     * 是否收藏的回调
     * @param item
     * @param favorite
     * @private
     */
    _onFavorite(projectModel,favorite){
        if (favorite){
            favoriteDao.saveFavoriteItem(projectModel.item.fullName,projectModel);
        }else {
            favoriteDao.removeFavoritem(projectModel.item.fullName);
        }
        //this.getFavoriteKeys();
        //DeviceEventEmitter.emit(Constant.SHOW_TOAST,"name:" + projectModel.item.fullName + " favorite:" + favorite);
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

            //3 更新item
            this.updateTrendingItem(this.items);
        }).catch(error => {
            //3 更新item
            this.updateTrendingItem(this.items);
            console.log(error);
        });
    }

    /**
     * 更新显示的ListView Item数据
     * @param items
     */
    updateTrendingItem(items){
        let array = [];
        for (let i = 0 ;i < items.length ;i++){
            let model = new ProjectModel(items[i],Util.checkFavorite(items[i].fullName,this.state.favoriteKeys));
            array.push(model);
        }

        DeviceEventEmitter.emit(Constant.SHOW_TOAST,""+Util.checkFavorite(items[0].fullName,this.state.favoriteKeys));
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