

export default class Util {

    /**
     * 检查item是否
     * @param item
     * @param items
     */
    static checkFavorite(item,items){
        if (item && items) {
            for (let i = 0;i < items.length ;i++){
                if (item === items[i]){
                    return true;
                }
            }
        }
        return false;
    }

}