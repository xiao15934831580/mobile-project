<template>
          <div class="contantBox">
          <div class="singBox"  v-for=" (item,index) in arrData" :key  = 'index'>
              <div class="topBox">
                <p class="danhao">
                    {{item.billCode}}
                </p>
                <p class="zhuangtai">
                    {{item.apvStatusLbl}}
                </p>
              </div>
              <div class="bottomBox">
                  <div class="leftBox">
                    <div class="rowMsg">
                      <p>车牌号:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <p>{{item.carNumber}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>车辆编号:&nbsp;&nbsp;</p>
                      <p>{{item.carCode}}</p>
                    </div>
                     <div class="rowMsg">
                      <p>品牌型号:&nbsp;&nbsp;</p>
                      <p>{{item.carBrandType}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>发起时间:&nbsp;&nbsp;</p>
                      <p>{{item.updatedDate}}</p>
                    </div>
                    <div class="rowMsg">
                      <p>紧急程度:&nbsp;&nbsp;</p>
                      <p>{{item.urgencyLevelLbl}}</p>
                    </div>
                  </div>
                  <div class="rightArrow">
                    <van-icon @click="goPage(item)" name="arrow" />
                  </div>
              </div>
          </div>
      </div>
</template>
<script setup>
import { defineProps, ref ,watch} from "vue";
import {useRouter} from 'vue-router';
const router = useRouter()
const arrData = ref('')
let props = defineProps({
    arrData:{
        type: Object,
        default: () => {},
    }
})
watch(
  () => props,
  () => {
      arrData.value = props.arrData
      console.log(arrData.value)
//     titile.value = props.dialogTitile;
//     if (titile.value === "编辑" )
//       formInline = props.dialogTableValue.value;
  },
  { deep: true, immediate: true }
);
const goPage = (item)=>{
    console.log(item)
         router.push({
            //传递参数使用params的话，只能使用name指定(在route.js里面声明name)
            path: item.type === '保养单'? '/maintainapply':'/repairapply',
            query:{
              numId:item.id,
              status:item.apvStatus,
              type:'task'
            }
            })

}
</script>
<style lang="less" scoped>
.contantBox{
          margin-top: 32px;
          .singBox{
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            padding: 16px;
            border-bottom: 0.02667rem solid #ebedf0;
            .topBox{
              display: flex;
              justify-content: space-between;
              // border-bottom: 0.02667rem solid #ebedf0;
              padding-bottom: 16px;
              p{
                font-size: 0.37333rem;
                color: #646566;
              }
            }
            .bottomBox{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .leftBox{
                  width: 80%;
                  .rowMsg{
                    width: 100%;
                    display: flex;
                    margin: 16px 0;
                     p{
                      font-size: 0.2rem;
                      color: #646566;
                      float: left;
                      }
                  }

                }
                .rightArrow{
                  width: 10%;
                  font-size: 0.37333rem;
                  color: #646566;
                }
            }
          }
        }
</style>