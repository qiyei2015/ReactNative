import React,{Component}from "react";
import {View, Image, StyleSheet, TouchableOpacity, Text, ListView, RefreshControl} from "react-native";
import DataRepository from "../expand/dao/DataRepository";
import NavigationBar from "../common/NavigationBar";
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view";
import { PropTypes} from 'prop-types';
import Toast, {DURATION} from 'react-native-easy-toast'
import RepositoryCell from "../component/RepositoryCell";
import {colorPrimary} from "../common/BaseStyles";


const popularSearchUrl = "https://api.github.com/search/repositories?q=";

export default class PopularPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            result:"",
            searchKey:"android",
        }
    }

    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={"最热"}
                    statusBar={{
                        backgroundColor: colorPrimary,
                        hidden: false,
                    }}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    leftView={
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }
                            }>
                            <Image style={{width:22,height:22,margin:5}} source={require("../../res/images/ic_arrow_back_white_36pt.png")}/>
                        </TouchableOpacity>
                    }
                    rightView={
                        <TouchableOpacity>
                            <Image style={{width:22,height:22,margin:5}} source={require("../../res/images/ic_star.png")}/>
                        </TouchableOpacity>
                    }
                />
                <ScrollableTabView
                    tabBarBackgroundColor= {colorPrimary}
                    tabBarInactiveTextColor="mintcream"
                    tabBarActiveTextColor="white"
                    tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}
                    renderTabBar={() =>
                        <ScrollableTabBar/>
                    }>
                    <PopularTab tabLabel="java" theme={{colorPrimary: colorPrimary}}/>
                    <PopularTab tabLabel="android" theme={{colorPrimary: colorPrimary}}/>
                    <PopularTab tabLabel="ios" theme={{colorPrimary: colorPrimary}}/>
                    <PopularTab tabLabel="C++" theme={{colorPrimary: colorPrimary}}/>
                </ScrollableTabView>
                {/*需要放在最外层*/}
                <Toast ref={(toast) => this.toast = toast}/>
            </View>
        );
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

        this.dataRepository.fetchNetworkRepository(url)
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
            <RepositoryCell data={item}/>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
});