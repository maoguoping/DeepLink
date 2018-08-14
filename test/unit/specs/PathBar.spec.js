import { expect } from 'chai'
import { mount ,createLocalVue  } from '@vue/test-utils'
import Vuex from 'vuex'
import element from 'element-ui'

import PathBar from '../../../src/components/bar/PathBar.vue';
import Store from '../../../src/router/store'
import '../fonts/element-icons.ttf'
import '../fonts/element-icons.woff'
import '../index.css'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(element)
describe('PathBar.vue', () => {
  let actions
  let store
  it('create', () => {
    beforeEach(() => {
      actions = {}
      store = new Vuex.Store(Store)
    })
    store = new Vuex.Store(Store)
    let pathBar=mount(PathBar,{store,localVue,attachToDocument:true}).find('.path-bar')
    expect(pathBar.find('.el-breadcrumb__inner a').element.innerText).to.equal('管理中心')
  });
  it('change', (done) => {
    let manageCenterStore = Store.modules.manageCenterStore
    manageCenterStore.mutations.changeManageCenterPath(manageCenterStore.state,{
    pathId:'/4em2h1buqga000',
    pathName:'/新项目1'
    });
    beforeEach(() => {
      actions = {}
      store = new Vuex.Store(Store)
    })
    store = new Vuex.Store(Store)
    let pathBarCom=mount(PathBar,{store,localVue,attachToDocument:true})

    pathBarCom.vm.$nextTick(()=>{
      expect(pathBarCom.findAll('.el-breadcrumb__inner a').at(1).element.innerText).to.equal('新项目1')
      expect(typeof manageCenterStore.state.manageCenterInfo).to.equal('Array')
      done()
    })

  // 在状态改变后和断言 DOM 更新前等待一刻
    })
})
let getbreadcrumb=function (items) {
  let path=[];
  items.forEach((item)=>{
    path.push(item.textContent)
  });
  return  path.join('/');
}
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
