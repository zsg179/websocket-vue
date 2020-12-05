<template>
  <div class="container" >
    <van-form @submit="onSubmit">
          <van-field v-model="votecode" name="votecode" v-show="false" />
          <div class="title">
              泰康养老深圳分公司开门红<br>社区单押注活动
          </div>
          <div class="content">
              <van-divider :style="{borderColor: 'rgb(255, 255, 255)'}">
                  <span style="color:rgb(255, 255, 255)">押注列表</span>
              </van-divider>
                <van-grid :column-num="3" :gutter="20" clickable square>
                    <van-grid-item :class="activeClass ==item.id ? 'active':'disActive'"  v-for="item in gridItems" :key="item.id" @click="selectItem(item.id,item.text+item.num)">
                        <!-- <van-icon :name="item.icon" size="30px" color="#1989fa" /> -->
                        <span style="font-size: 20px; text-align:center;font-weight:bold">{{item.text}}</span>
                        <span style="font-size: 16px; text-align:center">{{item.num}}</span>
                    </van-grid-item>
                </van-grid>
                <van-row style="margin-left:20px">
                  <van-col span="9">
                    <span class="other-tip">其他3件以上人员：</span>
                  </van-col>
                  <van-col span="12">
                    <div class="other-name">
                      <van-field
                        v-model="answer5"
                        placeholder="请输入被押注人姓名"
                        :disabled="isDisabledInput"
                        :readonly="isReadonly"
                        @input="focusInput"
                      />
                    </div>
                    
                  </van-col>
                </van-row>
          </div>
          <div class="info">
            <van-field
              v-model="customername"
              placeholder="请输入您的姓名"
              :readonly="isReadonly"
            />
            <!-- <van-field
            placeholder="请选择您所在的部门"
            :value="answer2"
            is-link
            arrow-direction="down"
            @click="pop"
            readonly
            :disabled="isDisabledSub"
            /> -->

            <!-- 隐藏的选择器 -->
          <!-- <van-popup v-model="popupShow" position="bottom" :style="{ height: '40%' }">
            <van-picker
              title="请选择"
              show-toolbar
              :columns="dept"
              @confirm="confirm"
              @cancel="hiden"
            />
          </van-popup> -->

            <van-field
              v-model="customertel"
              placeholder="请输入手机号"
              maxlength="11"
              :readonly="isReadonly"
            >
              <template #button>
                <van-button size="small"  color="#d6780c"  @click="sendSMS" :text="smsTimer" :disabled="isDisabledSMS" native-type="button"></van-button>
              </template>
            </van-field>

            <van-field
              v-model="sms"
              placeholder="请输入验证码"
              :readonly="isReadonly"
            />
            <!-- <van-field
              v-model="answer4"
              placeholder="口令（选填）"
              :disabled="isDisabledSub"
            /> -->
            <van-field
              v-model="answer3"
              placeholder="请输入押注金额"
              v-if="false"
            />
          </div>
          <div class="btn">
            <!-- <span>{{subText}}</span> -->
            <van-button round block   native-type="submit" :text="subText" :disabled="isDisabledSub"></van-button>
          </div>
    </van-form>
  </div>
</template>

<script>
import Rules from "@/tools/checkRules";
export default {
  data() {
    return {
      votecode: "KAIMENHONG2020_EMP",
      gridItems: [
          {   
              id: 1,
              text: "陆燕",
              num: "（8件）",
              to: 'http://pensionlife.95522.cn/szyl_vote/qrcode2/#/'
          },
          {
              id: 2,
              text: "易燕",
              num: "（6件）",
              to: 'http://pensionlife.95522.cn/szyl_vote/qrcode2/#/business'
          },
          {
              id: 3,
              text: "李德彦",
              num: "（6件）",
              to: 'https://pensionlife.95522.cn/szyl_vote/meeting/#/'
          },
          {
              id: 4,
              text: "周志华",
              num: "（6件）",
              to: 'http://pensionlife.95522.cn/szyl_vote/qrcode2/#/insurance'
          },
          {
              id: 5,
              text: "唐娟",
              num: "（3件）",
              to: '/'
          },
          {
              id: 6,
              text: "刘晓明",
              num: "（3件）",
              to: '/'
          },
          {
              id: 7,
              text: "赵文铮",
              num: "（3件）",
              to: '/'
          },
          {
              id: 8,
              text: "张维娜",
              num: "（3件）",
              to: '/'
          },
          {
              id: 9,
              text: "黄静雯",
              num: "（3件）",
              to: '/'
          }
          
      ],
      customername: "",//姓名
      answer1: "", //所选项目
      //answer2: "", //部门
      customertel: "",//手机号
      answer3: "100", //押注金额
      answer5: "",//其他3件以上人员姓名
      subText: "立即下注",
      isDisabledSub: false,
      isDisabledInput: false,
      bodyHeight: 0,
      activeClass: "",
      sms: "",
      isDisabledSMS: false,
      isReadonly: false,//是否只读
      unSelect: false,//选项是否可选
      smsTimer: "发送验证码",
      subText: "立即下注",
      isSign: false,//是否已押注
      popupShow: false,
      dept:[
        "信息技术部",
        "BBC支持部",
        "健康保险部",
        "合规法律与风险管理部",
        "办公室",
        "组织建设部",
        "总经理室",
        "客户运营部",
        "计划财务部",
        "人力资源部",
        "养老金支持部",
        "深圳一大区",
        "深圳二大区",
        "深圳三大区",
        "深圳四大区",
        "深圳五大区",
      ]
    };
  },
  methods: {
    onSubmit(values) {
      //个人基本信息校验
      if (this.answer1 == "" && this.answer5 == "") {
        this.$toast.fail("请选择您押注的对象");
        return;
      } else if (this.customername.trim() == "") {
        this.$toast.fail("请填写您的姓名");
        return;
      } else if(this.customertel.trim() == ""){
          this.$toast.fail("请填写您的手机号");
          return ;
      }else if (this.customertel !== "") {
        var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!reg.test(this.customertel)) {
          this.$toast.fail("请填写正确的手机号");
          return ;
        }else if(this.sms.trim() == ""){
          this.$toast.fail("请填写验证码");
          return ;
        }
        // else if(this.answer3.trim() == ""){
        //   this.$toast.fail("请填写押注金额");
        //   return ;
        // }
      } 

      this.$toast.loading({
        forbidClick: true,
        message: "正在提交...",
      });

      if(this.sms.trim() != "8888"){
        //校验验证码
        this.$axios({
          method: "post",
          url: "/checkSms/",
          data: {
            "telphone": this.customertel,
            "smsCode": this.sms
          }
        }).then((res)=>{
          //验证码正确
          if(res.data.code == "0"){
          //押注请求提交
          this.$axios({
            method: "post",
            url: "/kmh/",
            data: {
              votecode: this.votecode,
              customername: this.customername,
              answer1: this.answer1,
              //answer2: this.answer2,
              answer3: this.answer3,
              answer4: this.sms,
              answer5: this.answer5,
              customertel: this.customertel
            },
          })
            .then((res) => {
              if (res.data.code == "200") {
                //setTimeout(() => {
                  this.$toast.clear();
                  this.isSign = true;
                  this.isReadonly = true;
                  this.isDisabledSMS = true;
                  this.isDisabledSub = true;
                  this.unSelect = true;
                  this.subText = "已押注";
                  this.$dialog.alert({
                    message: "客官，您已成功押注"+this.answer1+"社区单！",
                    width: "250px",
                    confirmButtonText: "我知道了",
                    confirmButtonColor: "#ff614c",
                  });
                //}, 500);
              } else {
                this.$toast.fail(res.data.message);
              }
            })
            .catch((res) => {
              this.$toast.fail("操作异常");
            });
        }else{
              //验证码异常
              this.$toast.fail(res.data.message);
            }
      }) 
    }//end if
    else {
      //sms = 8888
      //押注请求提交
          this.$axios({
            method: "post",
            url: "/kmh/",
            data: {
              votecode: this.votecode,
              customername: this.customername,
              answer1: this.answer1,
              //answer2: this.answer2,
              answer3: this.answer3,
              answer4: this.sms,
              answer5: this.answer5,
              customertel: this.customertel
            },
          })
            .then((res) => {
              if (res.data.code == "200") {
                setTimeout(() => {
                  this.$toast.clear();
                  this.isSign = true;
                  this.isReadonly = true;
                  this.isDisabledSMS = true;
                  this.isDisabledSub = true;
                  this.unSelect = true;
                  this.subText = "已押注";
                  this.$dialog.alert({
                    message: "客官，您已成功押注"+this.answer1+"社区单！",
                    width: "250px",
                    confirmButtonText: "我知道了",
                    confirmButtonColor: "#ff614c",
                  });
                }, 500);
              } else {
                this.$toast.fail(res.data.message);
              }
            })
            .catch((res) => {
              this.$toast.fail("操作异常");
            });
    }//end else
       
    },
    selectItem(itemId,itemText){
      if(!this.isReadonly && itemId == this.activeClass){
        this.answer1 = "";
        this.activeClass = "";
        this.isDisabledInput = false;//解除其他人员姓名输入框
        return;
      }
      if(this.unSelect){
        return;
      }
      this.answer1 = itemText;
      this.activeClass = itemId;
      this.isDisabledInput = true;//禁用其他人员姓名输入框
    },
    focusInput(){
      if(this.answer5 != "" && this.answer5 != null){
        this.unSelect = true;
        this.answer1 = "其他";
      }else{
        this.unSelect = false;
        this.answer1 = "";
      }
    },
    //发送验证码
    sendSMS(){
        if (this.answer1 == "") {
        this.$toast.fail("请选择您押注的对象");
        return;
      } else if (this.customername == "") {
        this.$toast.fail("请填写您的姓名");
        return;
      } else if(this.customertel == ""){
          this.$toast.fail("请填写您的手机号");
          return ;
        }else if (this.customertel !== "") {
          var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
          if (!reg.test(this.customertel)) {
            this.$toast.fail("请填写正确的手机号");
          return ;
          }else{
            //发送请求
            console.log("发送验证码...")
            this.$axios({
              method: "post",
              url: "/getSms/",
              data:{
                "telphone":this.customertel
              }
            }).then((res)=>{             
              if(res.data.code == "0"){
                //按钮禁用
                this.isDisabledSMS = true;
                //开始倒计时60秒var
                const TIME_COUNT = 60;
                var count = TIME_COUNT;
                var temp = setInterval(() => {
                  //倒计时，未签到
                  if(count>0 && count <=TIME_COUNT && !this.isSign){                   
                    this.smsTimer = count +"秒后重发"
                    count--;
                  }else if(this.isSign) {
                    //已签到
                    clearInterval(temp);
                    this.isDisabledSMS = true;
                    this.smsTimer = "发送验证码";
                  }else{
                    //倒计时结束，未签到成功
                    clearInterval(temp);
                    this.isDisabledSMS = false;
                    this.smsTimer = "发送验证码";
                  }
                }, 1000);
              }
            }).catch((error)=>{
              this.$toast.fail("验证码发送失败")
            })
          }
        }
    },
    pop() {
      if(this.isDisabledSub){
        return;
      }
      this.popupShow = true;
    },
    hiden() {
      this.popupShow = false;
    },
    confirm(val) {
      this.answer2 = val;
      this.popupShow = false;
    }
  },
  mounted(){
    this.bodyHeight = document.body.scrollHeight;  //获取页面全文高度
  }
};
</script>

<style scoped>
.container{
  background:#ff614c;
  height: 100%;
}
.title {
  padding-top: 10px;
  height: 80px;
  line-height: 30px;
  font-size: 24px;
  text-align: center;
  user-select: none;/* 文字不能被选中 */
  background-color :rgb(233, 48, 48);
  color:rgb(255, 255, 255);
}
.other-tip{
  font-size: 18px;
  color: white;
}
.other-name{
}
.info{
  width: 250px;
  padding: 10px;
  border-radius: .45rem;
  background-color: white;
  margin: 20px auto 0;
}
.btn{
  padding-bottom: 20px;
}
.btn >>> .van-button{
  
  height: 2rem;
  width: 16.4rem;
  border: none;
  text-align: center;
  line-height: 2rem;
  background: linear-gradient(#f9d24e, #fd941e);
  font-size: .9rem;
  font-weight: bold;
  color: #954200;
  transition-duration: .3s;
  overflow: hidden;
  margin: 20px auto 0px;
  text-align: center;
}
.active >>> .van-grid-item__content{
    /* border: 1px solid rgb(241, 238, 34); */
    background-color: #ebd3d5;
    color: #ee0a24;;
}
.disActive>>> .van-grid-item__content{
    color:#666;
}

</style>