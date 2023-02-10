<template>
  <div class="container">
    <van-nav-bar
      :title="pageTitle"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <van-form @failed="onFailed">
        <!-- <div class="tableHeader">主表区</div> -->
        <van-cell-group inset>
          <van-field
            :model-value="formData.violatorCompany"
            label="违规人所属公司/部门"
            placeholder="违规人所属公司/部门"
          />
          <van-field
            v-model="formData.violatorName"
            label="违规人姓名"
            placeholder="违规人姓名"
          />
          <van-field
            v-model="formData.itemLbl"
            label="违规项目"
            placeholder="违规项目"
          />
          <van-field
            label="违规照片"
          >
                <template #input>
                    <van-uploader @oversize="onOversize"
                        @delete="deleteClzp" :before-read="beforeRead" :after-read="clzpAfterRead"
                        :max-count="1" :max-size="5 * 1024 * 1024"
                        v-model="formData.imgBase64" />
                </template>
          </van-field>
           <van-field
            v-model="formData.description"
            label="违规说明"
            placeholder="违规说明"
          />
        </van-cell-group>
        <div class="flexBox positionBottom">
          <van-button round color="#1989fa"  text="保存" />
          <van-button round color="#1989fa"  text="提交" />
        </div>
      </van-form>
    </div>
  </div>

</template>

<script setup>
import { ref,watch } from "vue";
import {useRouter} from 'vue-router';
const router = useRouter()
const pageTitle = ref('违规登记')
const formData = ref({
  violatorCompany:'',
    violatorName:'',
    itemLbl:'',
    imgBase64:[],
    description:'',
    clzpfilePath: "",//删除照片所需参数
});
const showApprove = ref(true); // 新建状态
watch(
  () => router.currentRoute.value.query,
  (newValue) => {
    console.log("newValue", newValue);
    if (newValue.numId) {
      // 数据详情
      showApprove.value = true;
      let repairId = newValue.numId;
      pageTitle.value = '违规登记记录'
      formData.value.violatorName = repairId;
    } else {
      showApprove.value = false;
    }
  },
  { immediate: true }
);
const onClickLeft = ()=>{
  router.push({ path:'home'})
}
const onOversize=(file) =>{
      console.log(file);
      alert("文件大小不能超过5MB");
}
const beforeRead=(file) =>{
      if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
        alert("请上传正确格式的图片");
        return false;
      }
      return true;
}
const    clzpAfterRead=(file)=> {
      // 上传状态提示开启
      file.status = "uploading";
      file.message = "上传中...";
      // 创建一个空对象实例
      let formData = new FormData();
    //   // 调用append()方法添加数据
      formData.append("file", file.file);
      console.log(formData)
      file.status = "done";
    //   uploadFiles(formData).then((res) => {
    //     if (res.code == "10000") {
    //       // 上传状态提示关闭
    //       file.status = "done";
    //       alert("上传成功！");
    //       this.clzpfilePath = res.data.relativePath; //删除所需参数
    //     }
    //   });
    }
const deleteClzp=()=> {
      // filePath：删除所需的参数
    //   deleteFiles({ filePath: this.clzpfilePath }).then((res) => {
    //     if (res.code == "10000") {
    //       this.$toast("删除成功！");
    //     }
    //   });
}
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