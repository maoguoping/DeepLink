const usenameReg = /^[a-zA-Z0-9_-]{4,16}$/// 用户名正则
const passwordReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/// 密码正则
//const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/// email正则
//const mobilePhoneReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/// 手机正则
//const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/// 身份证正则
export default {
  usenamePattern (rule, value, callback) {
    if (value === '') {
      callback(new Error('用户名不能为空！'))
    } else if (!usenameReg.test(value)) {
      callback(new Error('用户名为4到16位（字母，数字，下划线，减号）'))
    } else {
      callback()
    }
  },
  passwordPattern (rule, value, callback) {
    if (value === '') {
      callback(new Error('密码不能为空！'))
    } else if (!passwordReg.test(value)) {
      callback(new Error('密码最少6位，包括至少1个大写字母，1个小写字母，1个数字'))
    } else {
      callback()
    }
  },
  passwordQesPattern (rule, value, callback) {
    if (value === '') {
      callback(new Error('密码保护问题不能为空！'))
    } else {
      callback()
    }
  },
  passwordAnsPattern (rule, value, callback) {
    if (value === '') {
      callback(new Error('密码保护问题答案不能为空！'))
    } else {
      callback()
    }
  }
}
