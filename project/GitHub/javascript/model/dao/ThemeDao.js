import React from "react";
import {AsyncStorage} from "react-native";
import ThemeFactory, {Theme} from "../../style/ThemeFactory";



const THEME_KEY = "theme_key";
const TAG = "ThemeDao:";
export default class ThemeDao {

    /**
     * 获取主题
     */
    getTheme(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(THEME_KEY,(error, result) => {
                if (error){
                    reject(error);
                    return ;
                }
                if (!result) {
                    //先保存默认主题
                    this.saveTheme(Theme.Default);
                    result = Theme.Default;
                }
                resolve(ThemeFactory.createTheme(result));
            });
        });
    }

    /**
     * 保存主题
     * @param theme
     */
    saveTheme(theme){
        console.log(TAG + theme);
        AsyncStorage.setItem(THEME_KEY,theme,error => {
           if (error){
               console.log(TAG + error);
           }
        });
    }
}