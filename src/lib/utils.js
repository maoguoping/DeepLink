const XIEGANG = '%2F'
class Utils {
  static bind () {
  }
  /**
   * 路径字符串编码
   * @param {string} str 字符串
   * @return {string}
   */
  static pathStrEncode (str = '') {
    if (str === '/') {
      return XIEGANG
    } else {
      let arr = str.split('/')
      if (arr.length === 0) {
        return arr
      } else {
        return arr.join(XIEGANG)
      }
    }
  }
  /**
   * 路径字符串解码
   * @param {string} str 字符串
   * @return {string}
   */
  static pathStrDecode (str = '') {
    if (str === '%2F') {
      return '/'
    } else {
      let arr = str.split(XIEGANG)
      if (arr.length === 0) {
        return arr
      } else {
        return arr.join('/')
      }
    }
  }

  static timeFormat (date, fmt) {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
export default Utils
