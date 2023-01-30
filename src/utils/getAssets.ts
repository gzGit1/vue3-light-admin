// 获取图片文件
export function getImageFile(url: string) {
    return new URL(`../assets/${url}`, import.meta.url).href;
}
const jsonObj = import.meta.glob("@/assets/mapJSON/**.json");
// jsonObj[i] 是一个import();它是异步的；
export function getJsonData(jsonname) {
    let jsonData = null;
    for (let i in jsonObj) {
        if (i.includes(jsonname)) {
            jsonData = jsonObj[i]();
        }
    }
    return jsonData;
}