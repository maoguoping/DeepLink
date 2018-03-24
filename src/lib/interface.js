let interfaceUrl = {};
interfaceUrl = {
    doc: {
        docSubmit: '/doc/docSubmit', //提交文档数据
        getDocData: '/doc/getDocData', //获取文档数据
    },
    guide: {
        getGuideListData: '/guide/guideListData', //获取导航栏数据
    },
    manageCenter: {
        getViewData: '/manageCenter/getViewData', //获取导航栏数据,
        getViewDataByPath: '/manageCenter/getViewDataByPath', //根据路径获得列表数据
    }
}
export default interfaceUrl;
