console.log(process.env)
const root = process.env.VUE_APP_API_ROOT
// const root = ''
let interfaceUrl = {}
interfaceUrl = {
  api: {
    getFolderTypeDic: root + '/api/getFolderTypeDic', // 获取模块类型字典
    getElementTypeDic: root + '/api/getElementTypeDic', // 获取模块类型字典
    getRoleListDic: root + '/api/getRoleListDic', // 获取角色类型字典
    getQrCodeImageFromUrl: root + '/api/getQrCodeImageFromUrl'// 生成二维码
  },
  doc: {
    docSubmit: root + '/doc/docSubmit', // 提交文档数据
    getDocData: root + '/doc/getDocData' // 获取文档数据
  },
  guide: {
    getGuideListData: root + '/guide/guideListData' // 获取导航栏数据
  },
  manageCenter: {
    getViewData: root + '/manageCenter/getViewData', // 获取导航栏数据,
    getViewDataByPathId: root + '/manageCenter/getViewDataByPathId', // 根据路径获得列表数据
    addProject: root + '/manageCenter/addProject', // 添加项目
    updateProject: root + '/manageCenter/updateProject', // 更新项目
    deleteProject: root + '/manageCenter/deleteProject', // 删除项目
    addModule: root + '/manageCenter/addModule', // 添加模块
    updateModule: root + '/manageCenter/updateModule', // 更新模块
    deleteModule: root + '/manageCenter/deleteModule', // 删除项目
    getInfoByPathId: root + '/manageCenter/getInfoByPathId'// 根据路径id查找信息
  },
  users: {
    getSession: root + '/users/getSession', // 获取session
    loginStatus: root + '/users/loginStatus', // 获取登录信息
    login: root + '/users/login', // 登录
    logout: root + '/users/logout', // 登出
    register: root + '/users/register'// 注册
  },
  setting: {
    getUserList: root + '/setting/getUserList', // 获取用户列表
    getRoleList: root + '/setting/getRoleList', // 获取角色列表
    saveUserInfo: root + '/setting/saveUserInfo', // 修改用户信息，
    checkRoleExist: root + '/setting/checkRoleExist' // 检查角色信息
  }
}
export default interfaceUrl
