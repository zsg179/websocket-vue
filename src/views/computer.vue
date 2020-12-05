<template>
  <div class="container">
    <div class="header">
      <div class="header-bg">
        <div class="title">深分设备登记系统</div>
      </div>
    </div>
    <div class="main">
      <div class="form">
        <van-form @submit="onSubmit">
          <van-field v-model="votecode" name="votecode" v-show="false" />

          <van-field
            label="您所在的部门"
            placeholder="请选择您所在的部门"
            :value="answer1"
            is-link
            arrow-direction="down"
            @click="pop"
            required
            readonly
            label-class="blod"
          />
          <van-field
            v-model="answer2"
            name="answer2"
            label="计算机名"
            placeholder="请输入您的计算机名"
            required
            label-class="blod"
          />
          <van-field
            v-model="answer3"
            name="answer3"
            label="OA账号"
            placeholder="请输入您的OA账号"
            required
            label-class="blod"
          />  
          <van-field
            v-model="answer4"
            name="answer4"
            label="其他"
            placeholder="其他"
            label-class="blod"
          />
        

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
      votecode: "COMPUTER",
      answer1: "", //部门
      answer2: "", //计算机名
      answer3: "", //OA账号
      answer4: "", //其他
      company: [
         "信息技术部",
         "直销业务部",
         "银行业务部",
         "战略业务部",
         "中介业务部",
         "综拓业务部",
         "办公室",
         "合规法律与风险管理部",
         "计划财务部",
         "健康保险部",
         "客户运营部",
         "人力资源部",
         "养老金支持部",
         "员福BBC支持部",
         "总经理室",
         "组织发展部",
        ],
      popupShow: false,
      subText: "登记",
      isDisabledSub: false,
    };
  },
  methods: {
    onSubmit() {
      //个人基本信息校验
      if (this.answer1 == "") {
        this.$toast.fail("请选择您所在的单位");
        return;
      } else if (this.answer2 == "") {
        this.$toast.fail("请填写您的计算机名");
        return;
      } else if (this.answer3 == "") {
        this.$toast.fail("请填写您的OA账号");
        return;
      } 

      this.$toast.loading({
        forbidClick: true,
        message: "正在登记...",
      });

      //请求提交
      this.$axios({
        method: "post",
        url: "/comupter/",
        data: {
          votecode: this.votecode,
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
              this.subText = "已登记";
              this.$dialog.alert({
                message: "登记成功！",
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
          this.$toast.fail("登记异常");
        });
    },
    pop() {
      this.popupShow = true;
    },
    hiden() {
      this.popupShow = false;
    },
    confirm(val) {
      this.answer1 = val;
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