import { expect } from 'chai'
import Utils from '@/lib/utils.js'
// 路径信息编码
describe('pathStrEncode', () => {
  // 空输入
  it('empty input', () => {
    let strInput, strOutput
    strInput = ''
    strOutput = Utils.pathStrEncode(strInput)
    expect(strOutput).to.equal('')
  })
  // “/”输入
  it('/', () => {
    let strInput, strOutput
    strInput = '/'
    strOutput = Utils.pathStrEncode(strInput)
    expect(strOutput).to.equal('%2F')
  })
  it('normal', () => {
    let strInput, strOutput
    strInput = '/abcde/12314'
    strOutput = Utils.pathStrEncode(strInput)
    expect(strOutput).to.equal('%2Fabcde%2F12314')
  })
})
// 路径信息解码
describe('pathStrDecode', () => {
  // 空输入
  it('empty input', () => {
    let strInput, strOutput
    strInput = ''
    strOutput = Utils.pathStrDecode(strInput)
    expect(strOutput).to.equal('')
  })
  // “%2F”输入
  it('%2F', () => {
    let strInput, strOutput
    strInput = '%2F'
    strOutput = Utils.pathStrDecode(strInput)
    expect(strOutput).to.equal('/')
  })
  it('normal', () => {
    let strInput, strOutput
    strInput = '%2Fabcde%2F12314'
    strOutput = Utils.pathStrDecode(strInput)
    expect(strOutput).to.equal('/abcde/12314')
  })
})
