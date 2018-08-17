import {Dimensions, Image, Text, View,DeviceInfo,Platform,StyleSheet} from "react-native";
import React from "react";
import ViewUtils from "../util/ViewUtil";
import ParallaxScrollView from "react-native-parallax-scroll-view"
import GlobalStyles from "../style/GlobalStyle"
import BackPressComponent from "./BackPressComponent";
import {colorPrimary} from "../common/BaseStyles";


//获取窗口
const window = Dimensions.get('window');

const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + 20 +(DeviceInfo.isIPhoneX_deprecated?24:0): GlobalStyles.nav_bar_height_android;


export default class ParallaxComponent {

    constructor(props,updateState,flag,config){
        this.props = props;
        this.backPress = new BackPressComponent(props);
        this.updateState = updateState;
        this.flag = flag;
        this.config = config;
    }

    getParallaxRenderConfig(params) {
        let config = {};
        let avatar = typeof(params.avatar) === 'string' ? {uri: params.avatar} : params.avatar;
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );
        config.renderForeground = () => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={styles.avatar} source={avatar}/>
                <Text style={ styles.sectionSpeakerText }>
                    {params.name}
                </Text>
                <Text style={ styles.sectionTitleText }>
                    {params.description}
                </Text>
            </View>
        );
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtils.getLeftButton(()=>this.props.navigation.goBack())}
                {/*{ViewUtils.getShareButton(()=>this.onShare())}*/}
            </View>
        );
        return config;
    }

    render(contentView, params) {
        let renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                contentBackgroundColor={GlobalStyles.backgroundColor}
                backgroundColor={colorPrimary}
                headerBackgroundColor="#333"
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                backgroundSpeed={10}
                {...renderConfig}
            >
                {contentView}
            </ParallaxScrollView>
        );
    }
}

const styles = StyleSheet.create({
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20+(DeviceInfo.isIPhoneX_deprecated?24:0) : 0,
        alignItems: 'center',
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    fixedSection: {
        position: 'absolute', //绝对布局
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        paddingTop: (Platform.OS === 'ios') ? 20+(DeviceInfo.isIPhoneX_deprecated?24:0) : 0,

        flexDirection: 'row',//横向排列
        alignItems: 'center', //侧轴居中
        justifyContent: 'space-between',//主轴对齐方式
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 60
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        marginBottom: 5,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
    },
});

