<template>
  <div class="container">
    <van-nav-bar
      :title="pageTitle"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <van-form @failed="onFailed" ref="form">
        <!-- <div class="tableHeader">主表区</div> -->
        <van-cell-group inset>
          <van-field
             v-model="formData.belongType"
            label="违规人所属公司/部门"
            placeholder="违规人所属公司/部门"
            :rules="[{ required: true, message: '请输入违规人所属公司/部门' }]"
          />
          <van-field
            v-model="formData.violatorName"
            label="违规人姓名"
            placeholder="违规人姓名"
            :rules="[{ required: true, message: '请输入违规人姓名' }]"
          />
          <van-field
              v-model="formData.itemLbl"
              is-link
              readonly
              name="picker"
              label="违规项目"
              placeholder="选择违规项目"
              :rules="[{ required: true, message: '请选择违规项目' }]"
              @click="violation()"
            />
            <van-popup v-model:show="showItem" position="bottom">
              <van-picker
                :columns="formData.dropDowns"
                @confirm="violationComfirm"
                @cancel="showItem = false"
              />
            </van-popup>
          <van-field
            label="违规照片"
            :rules="[{ required: true, message: '请上传违规照片' }]"
          >
                <template #input>
                    <van-uploader @oversize="onOversize"
                        @delete="deleteClzp" :before-read="beforeRead" :after-read="clzpAfterRead"
                        :max-count="5" :max-size="5 * 1024 * 1024"
                        v-model="formData.imgBase64List_" />
                </template>
          </van-field>
           <van-field
            v-model="formData.description"
            label="违规说明"
            placeholder="违规说明"
          />
        </van-cell-group>
        <div class="flexBox positionBottom">
          <van-button round color="#1989fa" native-type="submit" @click="saveRepair"  text="保存" />
        </div>
      </van-form>
    </div>
  </div>

</template>

<script setup>
import { ref,watch } from "vue";
import {useRouter} from 'vue-router';
import { onBeforeMount } from "vue";
import { getViolationDropDowns as getViolationDropDowns,saveViolationRecord as saveViolationRecord,getVioRecordById as getVioRecordById} from '@/api/home'
import {getCurrentInstance} from 'vue'
const {proxy} = getCurrentInstance();
const router = useRouter()
const pageTitle = ref('违规登记')
const numId = ref('');
const form = ref('');
const copyImgPath = ref()
const formData = ref({
    belongType:'',
    violatorName:'',
    itemLbl:'',
    imgBase64List:[],
    imgBase64List_:[],
    description:'',
    clzpfilePath: "",//删除照片所需参数
    dropDowns:[]
});
const showApprove = ref(true); // 新建状态
watch(
  () => router.currentRoute.value.query,
  (newValue) => {
    console.log("newValue", newValue);
    if (newValue.numId) {
      // 数据详情
      showApprove.value = true;
      pageTitle.value = '违规登记记录'
      numId.value = newValue.numId;
    } else {
      showApprove.value = false;
    }
  },
  { immediate: true }
);

const dataURLtoBlobtoFile = (dataurl) =>{
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
    }
    // return new Blob([u8arr], { type: mime })
    let theBlob = new Blob([u8arr], { type: mime });
    theBlob.lastModifiedDate = new Date()
    theBlob.name = "预览图片"
    return theBlob;
}
onBeforeMount(() => {
  getViolationDropDown();
  if(showApprove.value){
    getVioRecordById(numId.value).then((res)=>{
      if(res.code === 200){
       formData.value=res.data;
       let arr=[]
       res.data.imgBase64List.forEach((item)=>{
          let obj = {
            content:item,
            file:dataURLtoBlobtoFile(item)
          }
          arr.push(obj)
      })
       formData.value.imgBase64List_ = arr
       copyImgPath.value = res.data.imgBase64List
      //  approveActive.value = res.data.apvDetails.length;
      }else{
        proxy.$toast({
              message: res.msg,
            })
      }
    })
  }
});

const getViolationDropDown = ()=>{
    getViolationDropDowns().then((res)=>{
       if(res.code === 200){
          formData.value.dropDowns = res.data.violationItem
       }else{
         proxy.$toast({
              message: res.msg,
            })
       }
    })
}
const saveRepair =()=>{
   form.value.validate().then(()=>{
     let imgArr = []
     for(let item of formData.value.imgBase64List_){
       if(item.content){
          imgArr.push(item.content)
       }
     }
     let arr = JSON.parse(JSON.stringify(copyImgPath.value))
     formData.value.imgBase64List = imgArr.concat(arr);
     saveViolationRecord(formData.value).then((res)=>{
       if(res.code === 200){
            console.log(res.data)
          }else{
            proxy.$toast({
                  message: res.msg,
                })
          }
     })
   })
}
const showItem = ref(false);
const violationComfirm = (value) => {
  formData.value.itemLbl = value;
  showItem.value = false;
};
const violation =()=>{
  showItem.value = true;
}
const onClickLeft = ()=>{
  router.go(-1)
}
const onOversize=(file) =>{
      proxy.$toast({
        message: "文件大小不能超过5MB",
      })
}
const beforeRead=(file) =>{
      if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
        proxy.$toast({
          message: "请上传正确格式的图片",
        })
        return false;
      }
      return true;
}
// const    clzpAfterRead=(file)=> {
//       // 上传状态提示开启
//       file.status = "uploading";
//       file.message = "上传...";
//       // 创建一个空对象实例
//       let formDataObj = new FormData();
//     //   // 调用append()方法添加数据
//       formDataObj.append("file", file.file);
//       console.log(formDataObj.get("file"))
//       formDataObj.append("filecontent", file.content);
//       file.status = "done";
//       // formData.value.imgBase64List = formDataObj
//       // formData.value.imgBase64List.push(file.content)
//       // uploadFiles(formDataObj).then((res) => {
//       //   if (res.code == "10000") {
//       //     // 上传状态提示关闭
//       //     file.status = "done";
//       //     alert("上传成功！");
//       //     formData.value.clzpfilePath = res.data.relativePath; //删除所需参数
//       //   }
//       // });
//     }
// const deleteClzp=()=> {
//       // filePath：删除所需的参数
//     //   deleteFiles({ filePath: this.clzpfilePath }).then((res) => {
//     //     if (res.code == "10000") {
//     //       this.$toast("删除成功！");
//     //     }
//     //   });
// }
</script>

<style lang="less" scoped>
:deep(.van-button--round){
  width: 3rem;
}

.positionBottom{
    position: absolute;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 1.5rem;
}
.tableHeader {
  color: #666;
  font-size: 32px;
  margin: 16px;
}
.container{
    display: flex;
    height: 100vh;
    flex-direction: column;
    .main{
        width: 100%;
        flex: 1;
        overflow-y: scroll;
    }
}
:deep(.van-icon) {
  color: #666;
}
:deep(.van-switch--on) {
  height: 48px;
  width: 108px;
}
:deep(.van-switch--on .van-switch__node) {
  height: 44px;
  width: 44px;
}
:deep(.van-cell-group--inset) {
  margin: .16rem 0;
}
.cardBox {
  padding-top: 90px;
  background-color: #ffffff;
  margin: 32px;
  border-radius: 0.21333rem;
  position: relative;
  .closeFault{
    font-size: 28px;
    position: absolute;
    top: 32px;
    right: 32px;
  }
  .tableIndex{
    font-size: 28px;
    position: absolute;
    top: 32px;
    left: 32px;
    font-weight: 600;
  }
}
.addFault{
  font-size: 32px;
  margin: 0 32px;
  display: block;
}
</style>