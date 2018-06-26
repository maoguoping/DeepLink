import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
import  appRouter from '../../src/router/appRouter'
import vuex from 'vuex'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(vuex);
Vue.use(VueQuillEditor, /* { default global options } */)
const router=appRouter.router;
const store=appRouter.store;
console.log(Vue);
// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
