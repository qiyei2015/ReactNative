import React,{Component}from "react";
import {AsyncStorage} from "react-native";


export var FLAG_FAVORITE = {flag_language:"flag_favorite_language",flag_key:"flag_favorite_key"};

export default class FavoriteDao {

    constructor(type){
        this.type = type;
    }

    /**
     * 保存喜欢的item
     * @param key
     * @param value
     * @param callback
     */
    saveFavoriteItem(key,value,callback){
        //保存成功，然后存储key
        AsyncStorage.setItem(key,JSON.stringify(value), error => {
            if (!error) {
                this.updateFavoriteItem(key,true);
            } else {
                if (callback){
                    callback(error);
                }
            }
        });
    }

    /**
     * 获取收藏的keys
     * @returns {Promise<any> | Promise}
     */
    getFavoriteKeys(){
        return new Promise((resolve, reject) => {
            //先获取所有keys
            AsyncStorage.getItem(this.type,(error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                }else {
                    reject(error);
                }
            })
        });
    }

    /**
     * 更新集合中为key的item
     * @param key
     * @param isAdd 是否添加
     */
    updateFavoriteItem(key,isAdd){
        let arrayKeys = [];
        AsyncStorage.getItem(this.type,(error, result) => {
            if (!error){
                if (result){
                    //获取所有key集合
                    arrayKeys = JSON.parse(result);
                }

                let index = arrayKeys.indexOf(key);
                if (index !== -1){
                    //删除旧的值
                    arrayKeys.splice(index,1);
                }
                if (isAdd){
                    //添加key
                    arrayKeys.push(key);
                }
            }

            //保存数据keys
            if (arrayKeys){
                AsyncStorage.setItem(this.type,JSON.stringify(arrayKeys),error1 => {
                    if (error1){
                        console.log(error1);
                    }
                })
            }
        })
    }

    /**
     * 获取对应key的收藏
     * @param key
     * @returns {Promise<any> | Promise}
     */
    getFavoriteItem(key){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key,(error, result) => {
                if (!error){
                    if (result){
                        try {
                            resolve(JSON.parse(result));
                        } catch (e) {
                            reject(e);
                        }
                    }else {
                        reject(new Error("result is null"))
                    }
                }else {
                    reject(error);
                }
            })
        });
    }

    /**
     * 获取所有收藏的item
     */
    getAllFavoriteItems(){
        return new Promise((resolve, reject) => {
            this.getFavoriteKeys().then(keys => {
                if (keys){
                    let items = [];
                    for (let i = 0 ;i < keys.length ;i++){
                        AsyncStorage.getItem(keys[i],(error, result) => {
                            if (!error){
                                if (result){
                                    try {
                                        items.push(JSON.parse(result));
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }
                            }
                        });
                    }
                    //回调
                    if (items){
                        resolve(items);
                    }
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    /**
     * 删除所有收藏
     */
    removeFavoritem(key){
        AsyncStorage.removeItem(key,error => {
            if (!error){
                //删除key
                this.updateFavoriteItem(key,false);
            }
        });
    }

    //清除数据
    clear(){
        this.getFavoriteKeys().then(keys => {
            if (keys){
                for (let i = 0 ;i < keys.length ;i++){
                    AsyncStorage.removeItem(keys[i],error => {
                        if (!error){
                            console.log(error);
                        }
                    });
                }
            }
        }).catch(error => {
            console.log(error);
        });
    }
}