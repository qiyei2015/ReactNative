/**
 * HTTP请求
 */
export default class HttpUtil {
    //get请求
    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    //成功的回调
                    resolve(result);
                })
                .catch(error => {
                    //失败的回调
                    reject(error);
                });
        })
    }

    //post请求
    static post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                //对象需要序列化成json字符串
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}