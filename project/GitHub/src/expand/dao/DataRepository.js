import HttpUtil from "../../util/HttpUtil";

export default class DataRepository {

    //获取网络数据
    fetchNetworkRepository(url){
        return HttpUtil.get(url);
    }

}