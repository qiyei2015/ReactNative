import React,{Component}from "react";
import {AsyncStorage} from "react-native";
import keys from "../../../res/data/keys.json";
import languages from "../../../res/data/language";

export var FLAG_LANGUAGE = {flag_language:"flag_language_language",flag_key:"flag_language_key"};

export default class LanguageDao {

    constructor(type){
        this.type = type;
    }

    //读取配置
    fetch(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.type,(error, result) => {
                if (error){
                    reject(error);
                } else {
                    if (result) {
                        //保存的是json字符串，需要解析
                        try {
                            resolve(JSON.parse(result));
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        let data = this.type === FLAG_LANGUAGE.flag_key ? keys:languages;
                        this.save(data);
                        resolve(data);
                    }
                }
            });
        });
    }

    //保存数据
    save(data){
        console.log("save:" + JSON.stringify(data));
        AsyncStorage.setItem(this.type,JSON.stringify(data), error => {
            console.log(error);
        });
    }

    //清除数据
    clear(){
        AsyncStorage.removeItem(this.type, error => {
            console.log(error);
        });
    }
}