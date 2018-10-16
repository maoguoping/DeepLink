const XIEGANG = '%2F';
class Utils {
  constructor(){
  }
  static bind(){
    Utils.timeFormat();
  }
  /**
   * 路径字符串编码
   * @param {string} str 字符串
   * @return {string}
   */
  static pathStrEncode(str = ''){
    if(str === '/'){
      return XIEGANG;
    }else {
      let arr = str.split('/');
      if(arr.length == 0){
        return arr
      }else {
        return arr.join(XIEGANG);
      }
    }
  }
  /**
   * 路径字符串解码
   * @param {string} str 字符串
   * @return {string}
   */
  static pathStrDecode(str = ''){
    if(str === '%2F'){
      return '/'
    }else {
      let arr = str.split(XIEGANG);
      if(arr.length == 0){
        return arr
      }else {
        return arr.join('/');
      }
    }
  }

  static timeFormat(){
    Date.prototype.format = function (fmt) {
      let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    }
  }
}
export default Utils

