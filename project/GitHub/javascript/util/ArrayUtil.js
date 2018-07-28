

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
                // array.splice(i,1);
                array[i] = item;
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
    static clone(array,srcArray){
        for (let i = 0,len = srcArray.length ; i < len;i++) {
            array[i] = srcArray[i];
        }
    }
}