

export default class ArrayUtil {

    /**
     * 如果数组存在该item，则移除，否则添加该item
     * @param array
     * @param item
     */
    static updateArray(array,item){
        for (let i = 0,len = array.length ; i < len;i++) {
            let temp = array[i];
            if (temp === item){
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
    }

    static updateArray2(array,item){
        for (let i = 0,len = array.length ; i < len;i++) {
            let temp = array[i];
            if (temp.name === item.name){
                array[i] = item;
                return;
            }
        }
    }

    /**
     * 拷贝数组
     * @param destArray
     * @param srcArray
     */
    static clone(srcArray){
        if (!srcArray){
            return [];
        }
        let array = [];
        for (let i = 0,len = srcArray.length ; i < len;i++) {
            array[i] = srcArray[i];
        }
        return array;
    }

    /**
     * 判断两个数组是否相等
     * @param arr1
     * @param arr2
     */
    static isEqual(arr1,arr2){
        if ((!arr1 || !arr2)) {
            return false;
        }
        if (arr1.length !== arr2.length){
            return false;
        }
        for (let i= 0; i < arr1.length ;i++){
            if (arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    }

    /**
     * 从数组中移除item
     * @param array
     * @param item
     */
    static remove(array,item){
        if (!array instanceof Array) {
            return ;
        }
        for (let i = 0;i < array.length ;i++){
            if (item === array[i]){
                array.splice(i,1);
            }
        }
    }
}