import axios from './axios'
import apis from './interface'
class Upload {
  constructor (param) {
    this.file = param.file
    this.filename = param.filename
    this.expire = 0
    this.targetDir = param.targetDir
  }
  async start () {
    return new Promise(async (resolve, reject) => {
      await this.getSignature()
      let data = new FormData()
      data.append('name', `${this.filename}`)
      data.append('key', `${this.dir}${this.filename}`)
      data.append('policy', this.policy)
      data.append('OSSAccessKeyId', this.accessid)
      data.append('success_action_status', 200)
      data.append('signature', this.signature)
      data.append('callback', this.callbackbody)
      data.append('file', this.file, this.filename || this.file.name)
      axios.post(this.host, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
  getAliYunOssPolicy () {
    return new Promise((resolve, reject) => {
      axios.get(apis.api.getAliYunOssPolicy, {
        params: {
          targetDir: this.targetDir
        }
      }).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
  async getSignature () {
    try {
      let info = await this.getAliYunOssPolicy()
      // 判断expire的值是否超过了当前时间，如果超过了当前时间，就重新获取签名，缓冲时间为3秒。
      let now = Date.parse(new Date()) / 1000
      if (info.expire < now + 3) {
        info = await this.getAliYunOssPolicy()
      }
      this.host = info.host
      this.policy = info.policy
      this.accessid = info.accessid
      this.signature = info.signature
      this.callbackbody = info.callback
      this.dir = info.dir
      console.log('结束')
    } catch (e) {
      console.log(e)
    }
  }
}
export default Upload
