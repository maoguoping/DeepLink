import Vue from 'vue'
import PathBar from '@/components/bar/PathBar.vue'

describe('PathBar.vue', () => {
  it('should render correct contents', () => {
    console.log(PathBar);
    const Constructor = Vue.extend(PathBar)
    const vm = new Constructor().$mount()
    console.log("############################")
    expect(vm.$el.querySelector('.el-breadcrumb__inner a').textContent)
      .to.equal('管理中心')
  })
})
