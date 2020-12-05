<template>
  <div class="container">
    <div class="header">
      <div class="header-bg">
        <div class="title">坪山区直机关工会复工复产保障领取登记</div>
      </div>
      <div class="header-content">
        <p
          class="p1"
        >自新冠疫情爆发以来，我区各条战线干部职工积极投身抗击“疫”情一线，齐心协力， 为全民抗“疫”贡献力量。考虑到大家在义无反顾投身常态化抗疫防控的同时，也承担着极大的公共卫生风险，为切实保障大家人身安全，区直机关工会与泰康养老保险公司协调，为全体干部职工及家属免费办理保障额度为10万元的“复工复产保障”人身保险。</p>
        <p class="p1">为保障每位干部职工和家属的权益，泰康养老保险股份有限公司深圳分公司将为全体干部职工统一承保，且接受干部职工为家属报名，家属自愿参加。</p>
      </div>
    </div>
    <div class="main">
      <div class="form">
        <van-form @submit="onSubmit">
          <van-field v-model="votecode" name="votecode" v-show="false" />
          <van-field
            v-model="customername"
            name="customername"
            label="您的姓名"
            placeholder="请输入您的姓名"
            required
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
          <van-field
            v-model="customercomp"
            name="customercomp"
            label="您所在的单位"
            placeholder="请输入您所在的单位"
            required
            label-class="blod"
          />
          <van-field
            v-model="answer1"
            name="answer1"
            label="您所在的部门"
            placeholder="如：**处/**科/**院/*中心"
            required
            label-class="blod"
          />
          <van-cell value="选择领取" :border="false" style="padding-bottom:0;" class="blod" />
          <van-field name="answer2" style="padding-top:0">
            <template #input>
              <van-checkbox v-model="answer2" icon-size="15px">为家属领取复工复产保险（18-70周岁）</van-checkbox>
            </template>
          </van-field>

          <van-cell
            value="为家属领取份数"
            required
            v-if="answer2"
            :border="false"
            style="padding-bottom:0;"
            class="blod"
          />
          <van-cell
            :title="answer3"
            is-link
            arrow-direction="down"
            @click="pop"
            v-if="answer2"
            style="color:#323233"
          />

          <!-- 隐藏的选择器 -->
          <van-popup v-model="popupShow" position="bottom" :style="{ height: '40%' }">
            <van-picker
              title="请选择"
              show-toolbar
              :columns="familyNums"
              @confirm="confirm"
              @cancel="hiden"
            />
          </van-popup>

          <!-- 隐藏的家属列表 -->
          <div class="familyTitle blod" v-if="answer3 >= 1 && answer2">家属1</div>
          <van-cell
            title="亲属关系"
            :value="answer4"
            is-link
            arrow-direction="down"
            @click="pop1"
            v-if="answer3 >= 1 && answer2"
            required
          />
          <!-- 隐藏的选择器 -->
          <van-popup v-model="popupShow1" position="bottom" :style="{ height: '40%' }">
            <van-picker
              title="请选择"
              show-toolbar
              :columns="relationship"
              @confirm="confirm1"
              @cancel="hiden1"
            />
          </van-popup>
          <van-field
            class="fix-blod"
            v-model="answer5"
            label="姓名"
            placeholder="请输入家属1的姓名"
            required
            v-if="answer3 >= 1 && answer2"
          />
          <van-field
            v-model="answer6"
            label="身份证号"
            required
            placeholder="请输入家属1的身份证号"
            maxlength="18"
            v-if="answer3 >= 1 && answer2"
          />

          <div class="familyTitle blod" v-if="answer3 >= 2 && answer2">家属2</div>
          <van-cell
            title="亲属关系"
            :value="answer7"
            is-link
            arrow-direction="down"
            @click="pop2"
            v-if="answer3 >= 2 && answer2"
            required
          />
          <!-- 隐藏的选择器 -->
          <van-popup v-model="popupShow2" position="bottom" :style="{ height: '40%' }">
            <van-picker
              title="请选择"
              show-toolbar
              :columns="relationship"
              @confirm="confirm2"
              @cancel="hiden2"
            />
          </van-popup>
          <van-field
            v-model="answer8"
            label="姓名"
            placeholder="请输入家属2的姓名"
            required
            v-if="answer3 >= 2 && answer2"
          />
          <van-field
            v-model="answer9"
            label="身份证号"
            placeholder="请输入家属2的身份证号"
            required
            maxlength="18"
            v-if="answer3 >= 2 && answer2"
          />

          <div class="familyTitle blod" v-if="answer3 >= 3 && answer2">家属3</div>
          <van-cell
            title="亲属关系"
            :value="answer10"
            is-link
            arrow-direction="down"
            @click="pop3"
            v-if="answer3 >= 3 && answer2"
            required
          />
          <!-- 隐藏的选择器 -->
          <van-popup v-model="popupShow3" position="bottom" :style="{ height: '40%' }">
            <van-picker
              title="请选择"
              show-toolbar
              :columns="relationship"
              @confirm="confirm3"
              @cancel="hiden3"
            />
          </van-popup>
          <van-field
            v-model="answer11"
            label="姓名"
            placeholder="请输入家属3的姓名"
            required
            v-if="answer3 >= 3 && answer2"
          />
          <van-field
            v-model="answer12"
            label="身份证号"
            placeholder="请输入家属3的身份证号"
            required
            maxlength="18"
            v-if="answer3 >= 3 && answer2"
          />

          <div class="familyTitle blod" v-if="answer3 >= 4 && answer2">家属4</div>
          <van-cell
            title="亲属关系"
            :value="answer13"
            is-link
            arrow-direction="down"
            @click="pop4"
            v-if="answer3 >= 4 && answer2"
            required
          />
          <!-- 隐藏的选择器 -->
          <van-popup v-model="popupShow4" position="bottom" :style="{ height: '40%' }">
            <van-picker
              title="请选择"
              show-toolbar
              :columns="relationship"
              @confirm="confirm4"
              @cancel="hiden4"
            />
          </van-popup>
          <van-field
            v-model="answer14"
            label="姓名"
            placeholder="请输入家属4的姓名"
            required
            v-if="answer3 >= 4 && answer2"
          />
          <van-field
            v-model="answer15"
            label="身份证号"
            placeholder="请输入家属4的身份证号"
            required
            maxlength="18"
            v-if="answer3 >= 4 && answer2"
          />

          <van-cell title="保障内容" class="blod" />
          <div class="bznr">
            <p class="p2">1.因新冠肺炎导致的身故，给付10万保险金；</p>
            <p class="p2">2.因新冠肺炎导致的住院，按（实际住院天数-4）*100元/天标准给新冠付住院津贴；</p>
            <p class="p2">3.因驾驶、乘坐私家车导致的身故或者高残，给付10万保险金；</p>
            <p class="p2">4.因乘坐运营汽车（含网约车）导致的身故或者高残，给付10万保险金；</p>
            <p class="p2">5.因乘坐轨道交通工具（火车、地铁、高铁）导致的身故或者高残，给付10万保险金；</p>
            <p class="p2">6.因意外事故导致的住院，按实际住院天数*100元/天标准给付意外住院津贴。</p>
            <br />
            <p class="p2">保障期间为一年。</p>
            <br />
            <p class="p2">单个被保险人累计赔付以10万为限。</p>
          </div>
          <van-cell title="说明" class="blod" />
          <p class="p3">泰康养老服务人员将联系您做好信息确认及服务工作，谢谢！</p>

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
      votecode: "PSZJG20200824",
      customername: "", //姓名
      customercomp: "", //单位
      customertel: "", //手机号
      answer1: "", //部门
      answer2: false, //是否领取
      familyNums: ["1", "2", "3", "4"], //最多四个家属
      answer3: "请选择", //家属个数
      answer4: "请选择", //亲属1关系
      answer5: "", //姓名
      answer6: "", //身份证号
      answer7: "请选择", //亲属2关系
      answer8: "", //姓名
      answer9: "", //身份证号
      answer10: "请选择", //亲属3关系
      answer11: "", //姓名
      answer12: "", //身份证号
      answer13: "请选择", //亲属4关系
      answer14: "", //姓名
      answer15: "", //身份证号
      popupShow: false,
      popupShow1: false,
      popupShow2: false,
      popupShow3: false,
      popupShow4: false,
      relationship: ["配偶", "父母", "子女"], //亲属关系
      subText: "提交",
      isDisabledSub: false,
    };
  },
  methods: {
    onSubmit() {
      //防止取消领取后提交家属数据
      if (!this.answer2) {
        this.answer3 = "";
        this.answer4 = "";
        this.answer5 = "";
        this.answer6 = "";
        this.answer7 = "";
        this.answer7 = "";
        this.answer8 = "";
        this.answer9 = "";
        this.answer10 = "";
        this.answer11 = "";
        this.answer12 = "";
        this.answer13 = "";
        this.answer14 = "";
        this.answer15 = "";
      }
      //个人基本信息校验
      if (this.customername == "") {
        this.$toast.fail("请填写您的姓名");
        return;
      } else if (this.customertel == "") {
        this.$toast.fail("请填写您的手机号");
        return;
      } else if (/^1[34578]\d{9}$/.test(this.customertel) == false) {
        this.$toast.fail("请输入正确的手机号");
        return;
      } else if (this.customercomp == "") {
        this.$toast.fail("请填写您所在的单位");
        return;
      } else if (this.answer1 == "") {
        this.$toast.fail("请填写您所在的部门");
        return;
      }
      //选择为家属领取
      if (this.answer2) {
        if (this.answer3 == "请选择" || this.answer3 == "") {
          this.$toast.fail("请选择家属个数");
          return;
        }
        let err = this.checkFamily();
        console.log(err);
        if (err) {
          this.$toast.fail(err);
          return;
        }
      }

      //清空家属关系默认值
      if (this.answer4 == "请选择") {
        this.answer4 = "";
      }
      if (this.answer7 == "请选择") {
        this.answer7 = "";
      }
      if (this.answer10 == "请选择") {
        this.answer10 = "";
      }
      if (this.answer13 == "请选择") {
        this.answer13 = "";
      }

      this.$toast.loading({
        forbidClick: true,
        message: "正在提交...",
      });

      //请求提交
      this.$axios({
        method: "post",
        url: "/pingshan/",
        data: {
          votecode: this.votecode,
          customername: this.customername,
          customertel: this.customertel,
          customercomp: this.customercomp,
          answer1: this.answer1,
          answer2: this.answer2,
          answer3: this.answer3,
          answer4: this.answer4,
          answer5: this.answer5,
          answer6: this.answer6,
          answer7: this.answer7,
          answer8: this.answer8,
          answer9: this.answer9,
          answer10: this.answer10,
          answer11: this.answer11,
          answer12: this.answer12,
          answer13: this.answer13,
          answer14: this.answer14,
          answer15: this.answer15,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            setTimeout(() => {
              this.$toast.clear();
              this.isDisabledSub = true;
              this.subText = "已提交";
              this.$dialog.alert({
                message: "提交成功！",
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
          this.$toast.fail("提交异常");
        });
    },
    checkFamily() {
      let res;
      //家属1判断
      if (this.answer3 >= 1) {
        if (this.answer4 == "请选择" || this.answer4 == "") {
          return "请选择与家属1的关系";
        } else if (this.answer5 == "") {
          return "请填写家属1姓名";
        } else if (this.answer6 == "") {
          return "请填写家属1的身份证号";
        }
        res = Rules.testId(this.answer6);
        if (res.status == 0) {
          //0:身份证有误，1:正确
          return "家属1" + res.msg;
        }
      }
      //家属2判断
      if (this.answer3 >= 2) {
        if (this.answer7 == "请选择" || this.answer7 == "") {
          return "请选择与家属2的关系";
        } else if (this.answer8 == "") {
          return "请填写家属2的姓名";
        } else if (this.answer9 == "") {
          return "请填写家属2的身份证号";
        }
        res = Rules.testId(this.answer9);
        if (res.status == 0) {
          //0:身份证有误，1:正确
          return "家属2" + res.msg;
        }
      }
      //家属3判断
      if (this.answer3 >= 3) {
        if (this.answer10 == "请选择" || this.answer10 == "") {
          return "请选择与家属3的关系";
        } else if (this.answer11 == "") {
          return "请填写家属3的姓名";
        } else if (this.answer12 == "") {
          return "请填写家属3的身份证号";
        }
        res = Rules.testId(this.answer12);
        if (res.status == 0) {
          //0:身份证有误，1:正确
          return "家属3" + res.msg;
        }
      }
      //家属4判断
      if (this.answer3 >= 4) {
        if (this.answer13 == "请选择" || this.answer13 == "") {
          return "请选择与家属4的关系";
        } else if (this.answer14 == "") {
          return "请填写家属4的姓名";
        } else if (this.answer15 == "") {
          return "请填写家属4的身份证号";
        }
        res = Rules.testId(this.answer15);
        if (res.status == 0) {
          //0:身份证有误，1:正确
          return "家属4" + res.msg;
        }
      }
      return "";
    },
    pop() {
      this.popupShow = true;
    },
    hiden() {
      this.popupShow = false;
    },
    confirm(val) {
      this.answer3 = val;
      this.popupShow = false;
    },
    pop1() {
      this.popupShow1 = true;
    },
    hiden1() {
      this.popupShow1 = false;
    },
    confirm1(val) {
      this.answer4 = val;
      this.popupShow1 = false;
    },
    pop2() {
      this.popupShow2 = true;
    },
    hiden2() {
      this.popupShow2 = false;
    },
    confirm2(val) {
      this.answer7 = val;
      this.popupShow2 = false;
    },
    pop3() {
      this.popupShow3 = true;
    },
    hiden3() {
      this.popupShow3 = false;
    },
    confirm3(val) {
      this.answer10 = val;
      this.popupShow3 = false;
    },
    pop4() {
      this.popupShow4 = true;
    },
    hiden4() {
      this.popupShow4 = false;
    },
    confirm4(val) {
      this.answer13 = val;
      this.popupShow4 = false;
    },
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