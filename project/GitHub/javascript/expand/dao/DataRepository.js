import {AsyncStorage, DeviceEventEmitter} from "react-native";
import Constant from "../../common/Constant";
import GitHubTrending from "GitHubTrending";


const FLAG_STORAGE = {flag_popular:"popular",flag_trending:"trending"};

export default class DataRepository {

    /**
     * 构造方法
     * @param flag
     */
    constructor(flag){
        this.flag = flag;
        if (this.flag === FLAG_STORAGE.flag_trending){
            this.trending = new GitHubTrending();
        }
    }

    //获取数据
    fetchRepository(url){
        return new Promise((resolve, reject) => {
            this.fetchLocalRepository(url).then((warpData) => {
                if (this.checkLocalDataAvailable(warpData)) {
                    //数据未过期
                    DeviceEventEmitter.emit(Constant.SHOW_TOAST, "本地数据");
                    resolve(warpData.data);
                } else {
                    this.fetchNetworkRepository(url).then((data) => {
                        if (data) {
                            DeviceEventEmitter.emit(Constant.SHOW_TOAST, "网络数据 1");
                            resolve(data);
                        } else {
                            reject(new Error("data is null"));
                            console.log(data);
                        }
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    })
                }
            }).catch(error => {
                console.log("fetchLocalRepository error:" + error);
                this.fetchNetworkRepository(url).then((data) => {
                    if (data) {
                        DeviceEventEmitter.emit(Constant.SHOW_TOAST, "网络数据 2");
                        resolve(data);
                    } else {
                        reject(new Error("data is null"));
                        console.log(data);
                    }
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                })
            })
        });
    }

    //获取本地缓存数据
    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, ((error, result) => {
                if (error){
                    console.log("getData error:" + e);
                    reject(error);
                } else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        console.log("getData error:" + e);
                        reject(e);
                    }
                }
            }))
        });
    }

    //获取网络数据
    fetchNetworkRepository(url){
        return new Promise((resolve, reject) => {
            //trending模块
            if (this.trending){
                this.trending.fetchTrending(url)
                    .then((result)=> {
                        //保存数据
                        this.saveRepository(url,result);
                        resolve(result);
                    }).catch((error)=> {
                    reject(error);
                });
                return;
            }
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    //成功的回调
                    resolve(result);
                    //保存数据
                    this.saveRepository(url,result);
                })
                .catch(error => {
                    //失败的回调
                    reject(error);
                });
        });
    }

    //保存数据
    saveRepository(url,data){
        if (!url || !data){
            console.log("saveRepository error,url:" + url + " data:" + data);
            return;
        }
        //保存时间戳
        let warpData = {data:data,time:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(warpData),error => {
            if (error){
                console.log(error);
                DeviceEventEmitter.emit(Constant.SHOW_TOAST,"保存数据错误");
            }
        });
    }

    /**
     * 检查本地数据是否可用 30分钟以内
     * @param data
     */
    checkLocalDataAvailable(data){
        let currentTime = new Date();
        let dataTime = new Date();
        dataTime.setTime(data.time);
        if (dataTime.getMonth() != currentTime.getMonth()) {
            return false;
        }
        if (dataTime.getDay() != currentTime.getDay()) {
            return false;
        }
        if (dataTime.getHours() != currentTime.getHours()) {
            return false;
        }
        if (dataTime.getMinutes() + 30 < currentTime.getMinutes()){
            return false;
        }
        return true;
    }
}

export {FLAG_STORAGE};