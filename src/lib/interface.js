let interfaceUrl = {};
interfaceUrl = {
    api:{
      getModuleTypeDic:'/api/getModuleTypeDic',//获取模块类型字典
    },
    doc: {
        docSubmit: '/doc/docSubmit', //提交文档数据
        getDocData: '/doc/getDocData', //获取文档数据
    },
    guide: {
        getGuideListData: '/guide/guideListData', //获取导航栏数据
    },
    manageCenter: {
        getViewData: '/manageCenter/getViewData', //获取导航栏数据,
        getViewDataByPathId: '/manageCenter/getViewDataByPathId', //根据路径获得列表数据
        addProject:'/manageCenter/addProject',//添加项目
        updateProject:'/manageCenter/updateProject',//更新项目
        deleteProject:'/manageCenter/deleteProject',//删除项目
        addModule:'/manageCenter/addModule',//添加模块
        updateModule:'/manageCenter/updateModule',//更新模块
        deleteModule:'/manageCenter/deleteModule',//删除项目
        getInfoByPath:'/manageCenter/getInfoByPath',//根据路径查找信息
        getInfoByPathId:'/manageCenter/getInfoByPathId',//根据路径id查找信息
    }
}
export default interfaceUrl;
