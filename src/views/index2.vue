<template>
  <div class="container">
    <div class="header">
      <div class="header-bg">
        <div class="title">深圳供电局赠险领取</div>
      </div>
      <div class="header-content">
        <p
          class="p1"
        >深圳供电局员工免费领取一年期间出行意外险。</p>
      </div>
    </div>
    <div class="main">
      <div class="form">
        <van-form @submit="onSubmit">
          <van-field v-model="votecode" name="votecode" v-show="false" />

          <van-field
            label="您所在的单位"
            placeholder="请选择您所在的单位"
            :value="customercomp"
            is-link
            arrow-direction="down"
            @click="pop"
            required
            readonly
            label-class="blod"
          />
          <van-field
            v-model="answer1"
            name="answer1"
            label="您所在的部门"
            placeholder="请输入您所在的部门"
            required
            label-class="blod"
          />
          <van-field
            v-model="customername"
            name="customername"
            label="您的姓名"
            placeholder="请输入您的姓名"
            required
            label-class="blod"
          />
          <van-field
            v-model="answer2"
            label="身份证号"    
            placeholder="请输入您的身份证号"
            required
            maxlength="18"
            label-class="blod"
          />
          <van-field
            v-model="customertel"
            name="customertel"
            label="您的手机号"
            placeholder="请输入您的手机号"
            maxlength="11"
            required
            label-class="blod"
          />
          <van-field name="radio" label="是否对深圳专属医疗险感兴趣" label-class="blod" required>
            <template #input>
              <van-radio-group v-model="answer3" direction="horizontal">
                <van-radio name="true">是</van-radio>
                <van-radio name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field name="radio2" label="是否对终身重大疾病保险感兴趣" label-class="blod" required>
            <template #input>
              <van-radio-group v-model="answer4" direction="horizontal">
                <van-radio name="true">是</van-radio>
                <van-radio name="false">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        
         

          <!-- 隐藏的选择器 -->
          <van-popup v-model="popupShow" position="bottom" :style="{ height: '40%' }">
            <van-picker
              title="请选择"
              show-toolbar
              :columns="company"
              @confirm="confirm"
              @cancel="hiden"
            />
          </van-popup>

          <van-cell title="保障内容" class="blod" />
          <div class="bznr">
            <p class="p2">1.轨道交通(火车、地铁、高铁)意外身故10万元；</p>
            <p class="p2">2.运营汽车(含网约车)意外身故10万元；</p>
            <p class="p2">3.新冠身故10万元；</p>
            <p class="p2">4.驾乘私家车意外身故10万元；</p>
            <p class="p2">5.意外伤害住院津贴(含新冠)100元/天。</p>
            <p class="p2" style="color:red;font-weight:bold">（本保障由泰康养老保险公司承保，限深圳供电局员工本人领取）</p>
          </div>
          <van-cell title="说明" class="blod" />
          <p class="p3">保险服务人员将联系您做好信息确认及服务工作，保障生效会统一短信通知，谢谢！</p>

          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="button"
              :text="subText"
              :disabled="isDisabledSub"
              @click="onSubmit"
            ></van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import Rules from "@/tools/checkRules";
export default {
  data() {
    return {
      votecode: "SZGDJ20201030",
      customername: "", //姓名
      customercomp: "", //单位
      customertel: "", //手机号
      answer1: "", //部门
      answer2: "", //身份证号码
      answer3: "", //是否对深圳专属医疗险感兴趣
      answer4: "", //是否对终身重大疾病保险感兴趣
      company: [
         "宝安供电局",
         "机关（新洲）",
         "南山供电局", 
         "变电管理二所", 
         "电力科学研究院（科技创新中心）",
         "福田供电局",
         "输电管理所",
         "变电管理一所",
         "计量管理所",
         "罗湖供电局",
         "物流中心",
         "计量中心",
         "客服中心",
         "评审中心",
         "稽查中心",
         "通信管理所",
         "龙岗供电局",
         "龙华供电局",
         "光明供电局",
         "坪山供电局",
         "大鹏供电局",
         "盐田供电局",
         "深汕特别合作区供电局",
         "其它"
        ],
      popupShow: false,
      subText: "免费领取",
      isDisabledSub: false,
    };
  },
  methods: {
    onSubmit() {
      //个人基本信息校验
      if (this.customercomp == "") {
        this.$toast.fail("请选择您所在的单位");
        return;
      } else if (this.answer1 == "") {
        this.$toast.fail("请填写您所在的部门");
        return;
      } else if (this.customername == "") {
        this.$toast.fail("请填写您的姓名");
        return;
      } else if (this.answer2 == "") {
        this.$toast.fail("请填写您的身份证号");
        return;
      }else if(Rules.testId(this.answer2).status == 0){
        //校验身份证号
        this.$toast.fail(Rules.testId(this.answer2).msg);
        return;
      }else if (this.customertel == "") {
        this.$toast.fail("请填写您的手机号");
        return;
      }else if (/^1[34578]\d{9}$/.test(this.customertel) == false) {
        this.$toast.fail("请输入正确的手机号");
        return;
      } else if (this.answer3 == "") {
        this.$toast.fail("请勾选是否对深圳专属医疗险感兴趣");
        return;
      } else if (this.answer4 == "") {
        this.$toast.fail("请勾选是否对终身重大疾病保险感兴趣");
        return;
      } 

      this.$toast.loading({
        forbidClick: true,
        message: "正在领取...",
      });

      //请求提交
      this.$axios({
        method: "post",
        url: "/commonCol/",
        data: {
          votecode: this.votecode,
          customername: this.customername,
          customertel: this.customertel,
          customercomp: this.customercomp,
          answer1: this.answer1,
          answer2: this.answer2,
          answer3: this.answer3,
          answer4: this.answer4,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            setTimeout(() => {
              this.$toast.clear();
              this.isDisabledSub = true;
              this.subText = "已领取";
              this.$dialog.alert({
                message: "领取成功！",
                width: "250px",
                confirmButtonText: "我知道了",
                confirmButtonColor: "#1989fa",
              });
            }, 500);
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch((res) => {
          this.$toast.fail("领取异常");
        });
    },
    pop() {
      this.popupShow = true;
    },
    hiden() {
      this.popupShow = false;
    },
    confirm(val) {
      this.customercomp = val;
      this.popupShow = false;
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.header {
  height: auto;
}
.header-bg {
  height: auto;
  min-height: 220px;
  background-image: url("../assets/headerBG.png");
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
}
.title {
  font-size: 30px;
  color: white;
  font-weight: bold;
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  height: 100px;
  text-align: center;
}
.p1 {
  text-indent: 2em;
  color: rgb(121, 116, 116);
  font-size: 15px;
  line-height: 1.4;
  margin: 0 5px;
}
.main {
  margin-top: 30px;
}
h2 {
  font-size: 15px;
}
.van-cell {
  color: #7d3932;
  font-size: 15px;
}
.van-cell >>> .van-cell__value--alone {
  color: #7d3932;
  font-size: 15px;
}
/* .van-form >>> .van-checkbox {
  padding-left: 16px;
  padding-top: 10px;
} */
.van-checkbox >>> .van-checkbox__label {
  font-size: 15px;
}
.van-cell >>> .van-field__label {
  color: #7d3932;
  font-size: 15px;
}
.familyTitle {
  font-size: 15px;
  color: #7d3932;
  margin-left: 16px;
  margin-top: 10px;
}
.p2 {
  font-size: 14px;
  color: #606266;
}
.bznr {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 10px;
}
.p3 {
  font-size: 14px;
  color: #606266;
  margin-left: 16px;
  margin-top: 10px;
}
</style>

<style>
.blod {
  font-weight: bold;
}
</style>