import axios from 'axios'
import interfaceUrl from '../../../lib/interface'
export default {
  state:{
    manageCenterPath:'',
    manageCenterPathId:'',
    manageCenterPathType:'',
    manageCenterPathInfo:[
      {
        label:'管理中心',
        value:''
      }
    ],
    manageCenterInfo:""
  },
  mutations:{
    changeManageCenterPath(state,pathInfo,type){
      state.manageCenterPath=pathInfo.pathName;
      state.manageCenterPathId=pathInfo.pathId;
      state.manageCenterPathType=pathInfo.type;
      let idArr = pathInfo.pathId.slice(1).split('/'),
          nameArr = pathInfo.pathName.slice(1).split('/'),
          output = [{
            label:'管理中心',
            value:''
          }]
      if(pathInfo.pathId){
        for(let i =0 ; i < idArr.length ; i++ ){
          output.push({
            label :nameArr[i],
            value:idArr[i]
          })
        }
      }

      state.manageCenterPathInfo=output;
      axios.post(interfaceUrl.manageCenter.getInfoByPathId, {
        pathId:pathInfo.pathId,
        path:pathInfo.pathName
      }).then(res => {
        let tempData=res.data;
        // let path=pathName?pathName:"";
        // let length=path.split('/').length;
        //项目
        state.manageCenterInfo=tempData;
      });
    }
  }
}
