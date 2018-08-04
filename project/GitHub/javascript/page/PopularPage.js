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
import DataRepository from "../expand/dao/DataRepository";
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view";
import { PropTypes} from 'prop-types';
import RepositoryCell from "../component/RepositoryCell";
import {colorPrimary} from "../common/BaseStyles";
import NavigationBar from "../common/NavigationBar";
import LanguageDao,{FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import Constant from "../common/Constant";
import RepositoryDetail from "./RepositoryDetail";


const popularSearchUrl = "https://api.github.com/search/repositories?q=";

export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            languages:[],
            searchKey:"android",
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
        this.dataRepository = new DataRepository();
        this.state = {
            result:"",
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2}),
            refreshing:false,
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ListView
                    //关联dataSource
                    dataSource={this.state.dataSource}
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
                            onRefresh={() => this.onLoadFromNetwork()}
                        />
                    }
                />
            </View>
        );
    }

    //页面装载完成
    componentDidMount(){
        this.onLoadFromNetwork();
    }

    //加载网络数据
    onLoadFromNetwork(){
        const subUrl = "&sort=stars";
        let url = popularSearchUrl + this.props.tabLabel + subUrl;
        //设置开始刷新
        this.setState({
            refreshing:true,
        });

        this.dataRepository.fetchRepository(url)
            .then((result) => {
                this.setState({
                    refreshing:false,
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                })
            })
            .catch((error) => {
                this.setState({
                    result: JSON.stringify(error),
                    refreshing:false,
                })
            });
    }

    //每一行渲染数据
    renderRow(item){
        return(
            //设置onSelected的回调函数
            <RepositoryCell {...this.props} data={item} onSelected={() => this.onSelected(item)}/>
        )
    }

    //选中某一行
    onSelected(item){
        this.props.navigation.navigate(
            "RepositoryDetail",
            {...this.props,data:item},
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
});