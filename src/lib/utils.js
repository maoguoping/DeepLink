const XIEGANG = '%2F';
class Utils {
  constructor(){}

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
}
export default Utils

