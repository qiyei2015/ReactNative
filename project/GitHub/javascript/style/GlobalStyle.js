
import {
    Dimensions
}from 'react-native'

/**
 * 全局样式
 */
const {height, width} = Dimensions.get('window');
module.exports={
    line:{
        height: 0.6,
        opacity:0.5, //透明度
        backgroundColor:"gray",
    },
    root_container:{
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
    backgroundColor: '#f3f3f4',
    nav_bar_height_ios:44,
    nav_bar_height_android:50,
    window_height:height,
    window_width:width,
};