

export default {
    testName(name) {
        var reg =  /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
        if(reg.test(name)) {
            return {'status':1,'msg':'姓名格式正确'};
        } else {
            return {'status':0,'msg':'姓名格式不正确'};
        }
    },
    testId(id) {
        // 1 "验证通过!", 0 //校验不通过 // id为身份证号码
        var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
        //号码规则校验
        if(!format.test(id)){
            return {'status':0,'msg':'身份证号码输入有误'};
        }
        //区位码校验
        //出生年月日校验  前正则限制起始年份为1900;
        var year = id.substr(6,4),//身份证年
        month = id.substr(10,2),//身份证月
        date = id.substr(12,2),//身份证日
        time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
        now_time = Date.parse(new Date()),//当前时间戳
        dates = (new Date(year,month,0)).getDate();//身份证当月天数
        if(time>now_time||date>dates){
            return {'status':0,'msg':'出生日期不合规'}
        }
        //校验码判断
        var c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);  //系数
        var b = new Array('1','0','X','9','8','7','6','5','4','3','2'); //校验码对照表
        var id_array = id.split("");
        var sum = 0;
        for(var k=0;k<17;k++){
            sum+=parseInt(id_array[k])*parseInt(c[k]);
        }
        if(id_array[17].toUpperCase() != b[sum%11].toUpperCase()){
            return {'status':0,'msg':'身份证号码输入有误'}
        }
        return {'status':1,'msg':'身份证校验通过'}
    },
    getIdData(UUserCard, num) {
        if (num == 1) {
            //获取出生日期
            var birth = UUserCard.substring(6, 10) + UUserCard.substring(10, 12) + UUserCard.substring(12, 14);
            return birth;
        }
        if (num == 2) {
            //获取性别
            if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                //男
                return "男";
            } else {
                //女
                return "女";
            }
        }
        if (num == 3) {
            //获取年龄
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
            if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                age++;
            }
            return age;
        }
    },

    testPhone(phone) {
        var reg= /^1(3|4|5|6|7|8|9)\d{9}$/;
        if(reg.test(phone)) {
            return {'status':1,'msg':'手机号码正确'};
        } else {
            return {'status':0,'msg':'手机号码错误'};
        }
    },

    /*
    * smsObj: Object 
    */
    testSms(smsObj) {   
        console.log("test sms:", smsObj);
        if(smsObj.val == smsObj.receive) {
            return {'status':1,'msg':'短信验证码正确'};
        } else {
            return {'status':0,'msg':'短信验证码错误'};
        }
    },

}