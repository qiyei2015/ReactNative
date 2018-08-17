import React,{Component} from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image,Clipboard,Linking} from "react-native";
import {colorPrimary} from "../common/BaseStyles";
import ParallaxComponent from "../component/ParallaxComponent";
import config from "../../res/data/config";
import ViewUtil from "../util/ViewUtil";
import GlobalStyle from "../style/GlobalStyle";


const ITEM = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'https://blog.csdn.net/qiyei2009',
            },
            CSDN: {
                title: 'CSDN',
                url: 'https://blog.csdn.net/qiyei2009',
            },
            JIANSHU: {
                title: '简书',
                url: 'https://www.jianshu.com/u/378f46db13fc',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/qiyei2015',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1273482124',
            },
            Email: {
                title: 'Email',
                account: '1273482124@qq.com',
            },
        }
    },
    QQ: {
        name: '技术交流群',
        items: {
            MD: {
                title: '占位。。。。。。。。。。',
                account: '占位。。。。。。。。。。',
            },
            RN: {
                title: 'React Native学习',
                account: '占位。。。。。。。。。。',
            }
        },
    },
};

export default class AboutMePage extends Component{
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
        this.parallaxComponent = new ParallaxComponent({...this.params,navigation:this.props.navigation},(dic)=>this.updateState(dic),"aboutme",config);
        this.state = {
            projectModels: [],
            author: config.author,
            showRepository: false, //显示git 仓
            showBlog: false, //显示博客
            showQQ: false, //显示QQ
            showContact: false //显示联系方式
        }
    }

    render(){
        let content = <View>
            {ViewUtil.getSettingItemView(()=>this.onClick(ITEM.BLOG), require('../../res/images/ic_computer.png'), ITEM.BLOG.name, {tintColor: colorPrimary},
                this.getClickIcon(this.state.showBlog))}
            <View style={GlobalStyle.line}/>
            {this.state.showBlog ? this.renderItems(ITEM.BLOG.items) : null}

            {ViewUtil.getSettingItemView(()=>this.onClick(ITEM.REPOSITORY), require('../../res/images/ic_code.png'), ITEM.REPOSITORY, {tintColor: colorPrimary},
                this.getClickIcon(this.state.showRepository))}
            <View style={GlobalStyle.line}/>
            {this.state.showRepository ? this.parallaxComponent.renderRepository(this.state.projectModels) : null}

            {ViewUtil.getSettingItemView(()=>this.onClick(ITEM.QQ), require('../../res/images/ic_computer.png'), ITEM.QQ.name, {tintColor: colorPrimary},
                this.getClickIcon(this.state.showQQ))}
            <View style={GlobalStyle.line}/>
            {this.state.showQQ ? this.renderItems(ITEM.QQ.items, true) : null}

            {ViewUtil.getSettingItemView(()=>this.onClick(ITEM.CONTACT), require('../../res/images/ic_contacts.png'), ITEM.CONTACT.name,{tintColor: colorPrimary},
                this.getClickIcon(this.state.showContact))}
            <View style={GlobalStyle.line}/>
            {this.state.showContact ? this.renderItems(ITEM.CONTACT.items, true) : null}
        </View>;

        return(
            this.parallaxComponent.render(content,{
                'name': 'qiyei2015',
                'description': '带你装逼带你飞',
                'avatar':require("../../res/images/ic_avatar.jpg"),
                'backgroundImg':this.state.author.backgroundImg1,
            })
        )
    }

    /**
     * 显示列表数据
     * @param dic
     * @param isShowAccount
     */
    renderItems(dic, isShowAccount) {
        if (!dic)return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtil.getSettingItemView(()=>this.onClick(dic[i]), '', title,{tintColor: colorPrimary})}
                    <View style={GlobalStyle.line}/>
                </View>
            )
        }
        return views;
    }



    updateState(dic) {
        this.setState(dic);
    }

    /**
     * 获取item右侧图标:扩展，收缩
     * @param isShow
     */
    getClickIcon(isShow) {
        return isShow ? require('../../res/images/ic_tiaozhuan_up.png') : require('../../res/images/ic_tiaozhuan_down.png');
    }

    onClick(tab) {
        let targetComponent, params = {...this.params, menuType: tab};
        switch (tab) {
            case ITEM.BLOG.items.CSDN:
            case ITEM.BLOG.items.GITHUB:
            case ITEM.BLOG.items.JIANSHU:
            case ITEM.BLOG.items.PERSONAL_BLOG:
                targetComponent = 'WebViewPage';
                params.title = tab.title;
                params.url = tab.url;
                break;
            case ITEM.CONTACT.items.Email:
                let url='mailto://'+tab.account;
                //使用链接打开
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
            case ITEM.REPOSITORY:
                this.updateState({showRepository: !this.state.showRepository})
                break;
            case ITEM.BLOG:
                this.updateState({showBlog: !this.state.showBlog})
                break;
            case ITEM.QQ:
                this.updateState({showQQ: !this.state.showQQ})
                break;
            case ITEM.CONTACT:
                this.updateState({showContact: !this.state.showContact})
                break;
            case ITEM.CONTACT.items.QQ:
                //使用剪切板
                Clipboard.setString(tab.account);
                this.toast.show('QQ:' + tab.account + '已复制到剪切板。');
                break;
            case ITEM.QQ.items.MD:
            case ITEM.QQ.items.RN:
                //使用剪切板
                Clipboard.setString(tab.account);
                this.toast.show('群号:' + tab.account + '已复制到剪切板。');
                break;
        }
        if (targetComponent) {
            //跳转到指定页面，并传入参数
            this.props.navigation.navigate(
                targetComponent,
                {...params},
            );
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
});
