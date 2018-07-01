import Vue from 'vue'
import PathBar from '@/components/bar/PathBar.vue'
import store from '@/router/store.js'
const Store=store;
let getbreadcrumb=function (items) {
    let path=[]
    items.forEach((item)=>{
      path.push(item.textContent)
    })
    return  path.join('/');
}
describe('PathBar.vue', () => {
  it('面包屑默认显示', () => {
    const Constructor = Vue.extend(PathBar).mixin({store})
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.el-breadcrumb__inner a').textContent)
      .to.equal('管理中心');
  })
  it('路径更改后面包屑显示', () => {
    Store._mutations.changeManageCenterPath[0]("/项目1");
    const Constructor = Vue.extend(PathBar).mixin({store})
    const vm = new Constructor().$mount()
    expect(getbreadcrumb(vm.$el.querySelectorAll('.el-breadcrumb__inner a'))).to.equal('管理中心/项目1')
    // 在状态改变后和断言 DOM 更新前等待一刻
  })
})
