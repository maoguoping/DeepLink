import Vue from 'vue'
import VueRouter from 'vue-router'
import util from '../util.js';
import store from '../../../src/router/store'
import  appRouter from '../../../src/router/appRouter'
import PathBar from '../../../src/components/bar/PathBar.vue';
Vue.use(VueRouter);
Vue.extend(appRouter.router).mixin({store});
const Store=store;
let getbreadcrumb=function (items) {
    let path=[];
    items.forEach((item)=>{
      path.push(item.textContent)
    });
    return  path.join('/');
}
describe('PathBar.vue', () => {
  let vm;
  appRouter.router.afterEach(() => {
      util.destroyVM(vm)
  });
  it('create', () => {
    vm = util.createTest(PathBar, {
      beforeChange:()=>{
        return true;
      }
    }, true);
    expect(vm.$el.querySelector('.el-breadcrumb__inner a').textContent).to.equal('管理中心');
  });
  // it('面包屑默认显示', () => {
  //   const Constructor = Vue.extend(PathBar).mixin({store})
  //   const vm = new Constructor().$mount()
  //   expect(vm.$el.querySelector('.el-breadcrumb__inner a').textContent)
  //     .to.equal('管理中心');
  // })
  // it('路径更改后面包屑显示', () => {
  //   Store._mutations.changeManageCenterPath[0]("/项目1");
  //   const Constructor = Vue.extend(PathBar).mixin({store})
  //   const vm = new Constructor().$mount()
  //   expect(getbreadcrumb(vm.$el.querySelectorAll('.el-breadcrumb__inner a'))).to.equal('管理中心/项目1')
  //   // 在状态改变后和断言 DOM 更新前等待一刻
  // })
})
