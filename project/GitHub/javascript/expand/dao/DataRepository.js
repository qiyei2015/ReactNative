import {AsyncStorage} from "react-native";

export default class DataRepository {

    //获取数据
    fetchRepository(url){
        return new Promise((resolve, reject) => {
            this.fetchLocalRepository(url).then((warpData) =>{
                if (warpData){
                    resolve(warpData)
                } else {

                }
            }).catch((error) =>{
                this.fetchNetworkRepository(url).then((data) =>{
                    if (data){
                        resolve(data);
                    } else {
                        reject(data);
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
                    reject(result);
                } else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.log(e);
                    }
                }
            }));
        });
    }

    //获取网络数据
    fetchNetworkRepository(url){
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    //成功的回调
                    resolve(result);
                    this.saveRepository(result);
                })
                .catch(error => {
                    //失败的回调
                    reject(error);
                });
        });
    }

    //保存数据
    saveRepository(url,data){
        //保存时间戳
        let warpData = {data:data,time:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(warpData),(error => {
            console.log(error);
        }));
    }
}