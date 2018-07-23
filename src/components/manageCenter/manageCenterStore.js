import axios from 'axios'
import interfaceUrl from '../../lib/interface'
export default {
  state:{
    manageCenterPath:"",
    manageCenterId:""
  },
  mutations:{
    changeManageCenterPath(state,path){
      state.manageCenterPath=path;
      axios.post(interfaceUrl.manageCenter.getInfoByPath, {
        path:path
      }).then(res => {
        let tempData=res.data.data;
        let path=path?path:"";
        let length=path.split('/').length;
        //项目
        state.manageCenterId=tempData.id;
      });
    }
  }
}
