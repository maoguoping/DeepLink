import Vue from 'vue'
import PathBar from '@/components/bar/PathBar.vue'
import store from '@/router/store.js'
const Store=store;
describe('PathBar.vue', () => {
  it('should render correct contents', () => {
    console.log(PathBar);
    const Constructor = Vue.extend(PathBar).mixin({store})
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.el-breadcrumb__inner a').textContent)
      .to.equal('管理中心');
    Store._mutations.changeManageCenterPath[0]("/项目1");
    let a=vm.$el.querySelectorAll('.el-breadcrumb__inner a');
    console.log(a);
    a=a;
  })
})
