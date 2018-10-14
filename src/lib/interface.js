const root = process.env.API_ROOT
let interfaceUrl = {};
interfaceUrl = {
    api:{
      getFolderTypeDic:root + '/api/getFolderTypeDic',//获取模块类型字典
      getElementTypeDic:root + '/api/getElementTypeDic',//获取模块类型字典
      getQrCodeImageFromUrl:root + '/api/getQrCodeImageFromUrl',//生成二维码
    },
    doc: {
        docSubmit: root + '/doc/docSubmit', //提交文档数据
        getDocData: root + '/doc/getDocData', //获取文档数据
    },
    guide: {
        getGuideListData: root + '/guide/guideListData', //获取导航栏数据
    },
    manageCenter: {
        getViewData: root + '/manageCenter/getViewData', //获取导航栏数据,
        getViewDataByPathId:root +  '/manageCenter/getViewDataByPathId', //根据路径获得列表数据
        addProject:root + '/manageCenter/addProject',//添加项目
        updateProject:root + '/manageCenter/updateProject',//更新项目
        deleteProject:root + '/manageCenter/deleteProject',//删除项目
        addModule:root + '/manageCenter/addModule',//添加模块
        updateModule:root + '/manageCenter/updateModule',//更新模块
        deleteModule:root + '/manageCenter/deleteModule',//删除项目
        getInfoByPathId:root + '/manageCenter/getInfoByPathId',//根据路径id查找信息
    },
    users:{
      getSession:root+'/users/getSession',
      loginStatus:root+'/users/loginStatus',
      login:root+'/users/login',
      logout:root+'/users/logout',
      register:root+'/user/register'
    }
};
export default interfaceUrl;
