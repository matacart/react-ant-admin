// 状态管理汇总
import fileUpload from "./product/fileUpload";
import oldStore from '@/store/oldStore';

let newFileUpload = new fileUpload();

// let productEditStore = new oldStore();

const store={
    newFileUpload,
}


export default store;