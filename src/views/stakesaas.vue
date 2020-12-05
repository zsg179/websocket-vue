<template>
  <div class="container" >
    <el-row>
      <!-- <el-col :span="8">
        <div id="dept" style="height:400px;"></div>
      </el-col> -->
      <el-col :span="24">
        <div class="num-tip" style="height:50px;">总参与人数 ：</div>
        <div class="total" style="height:150px;">
              <div id="time" class="total-num"></div>
        </div>
        <span class="qr-tip">扫一扫，参与押注</span>
          <img class="qr-image" src="../assets/qr-product.png">
      </el-col>
      <!-- <el-col :span="8">
        <div id="emp" style="height:400px;"></div>
      </el-col> -->
    </el-row>
    <div id="product" style="width: 1600px;height:700px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      votecode: "KAIMENHONG2020_PRODUCT",
      product: null,
      dept: null,
      emp: null,
      totalNum: 0,
      bodyHeight: 0,
      isEnd: true,
      ws: null
    };
  },
  methods: {
    getData(){
        if(typeof WebSocket == "undefined") {
        console.log("您的浏览器不支持WebSocket");
        } else {
          this.ws = new WebSocket("ws://pensionlife.95522.cn/szyl_vote/kmh/getData/"+this.votecode);
        }
        //打开webSokcet连接时，回调该函数
        this.ws.onopen = function (data) {
            console.info("onpen=>",data);
        }
        this.ws.onclose = function(){
          console.log("连接断开")
        }
        this.ws.onmessage = function(res){
          console.log("data="+JSON.parse(JSON.parse(res.data).data).totalNum)
          console.log("data="+JSON.parse(res.data).data)
          this.totalNum = JSON.parse(JSON.parse(res.data).data).totalNum
          document.getElementById('time').innerHTML = this.totalNum;
          // 基于准备好的dom，初始化echarts实例
          this.product = echarts.init(document.getElementById('product'),'dark');
          var option = null,
          option = {
          title: {
              text: '开门红各项目押注情况',
              top: "20px"
          },
          tooltip:{
            confine: true
          },
          legend: {
              data:['押注人数'],
              top:'3%'
          },
          visualMap: {
              orient: 'horizontal',
              left: '3%',
              bottom: '3%',
              min: 1,
              max: 100,
              text: ['高','低'],
              dimension: 0,
              inRange: {
                  color: ['#D7DA8B', '#E15457']
              }
          },
          grid: {  
            left: '10%',  
            top:'10%',
            bottom: "15%"  
            }, 
          dataset:{
            source:JSON.parse(JSON.parse(res.data).data).productList
          },
          xAxis: {
              type: "category",
              // data: [],
              axisLabel: {  
                interval: 0,  
                formatter:function(value){  
                  var ret = "";//拼接加\n返回的类目项  
                  var maxLength = 10;//每项显示文字个数  
                  var valLength = value.length;//X轴类目项的文字个数  
                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                  if (rowN > 1){//如果类目项的文字大于3,  
                      for (var i = 0; i < rowN; i++) {  
                          var temp = "";//每次截取的字符串  
                          var start = i * maxLength;//开始截取的位置  
                          var end = start + maxLength;//结束截取的位置  
                          //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                          temp = value.substring(start, end) + "\n";  
                          ret += temp; //凭借最终的字符串  
                      }  
                    return ret;  
                  }  
                  else {  
                    return value;  
                  }  
                }    
              }
          },
          yAxis: {},
          series: [{
              name: '押注人数',
              type: 'bar',
              label: {
                show: true,
                position: "top"
              },
              encode:{
                x: [1],
                y: [0]
              }
          }]
          };
      	    if (option && typeof option === "object") {
	          this.product.setOption(option, true);
	        }
          
        }
      //const chatTimer = setInterval(()=>{
        //clearInterval(timer)
      //   this.$axios({
      //   method: "post",
      //   url: "/kmh/getData/",
      //   data:{
      //     "voteCode": this.votecode
      //   }
      // }).then(res=>{
      //   if(res.data.code == 0){
      //     // 填入数据
      //     this.product.setOption({
      //         dataset: {
      //             source: JSON.parse(res.data.data).productList
      //         }
      //     });
          // this.dept.setOption({
          //     dataset: {
          //         source: JSON.parse(res.data.data).deptList
          //     }
          // });
          // this.emp.setOption({
          //     dataset: {
          //         source: JSON.parse(res.data.data).empList
          //     }
          // });

          //this.totalNum = JSON.parse(res.data.data).totalNum
        //}
      //});
      //},1000);
      //防止定时器加速
      //this.$once('hook:beforeDestroy', () => {
      //  clearInterval(chatTimer);
      //})
      
    },
    	//关闭连接
    closeWebSocket(){
      if(this.ws != null) {
          this.ws.close();
      }
    },
    initProduct(){
      // 基于准备好的dom，初始化echarts实例
      this.product = echarts.init(document.getElementById('product'),'dark');
      // 显示标题，图例和空的坐标轴
      this.product.setOption({
          title: {
              text: '开门红各项目押注情况',
              top: "20px"
          },
          tooltip:{
            confine: true
          },
          legend: {
              data:['押注人数'],
              top:'3%'
          },
          visualMap: {
              orient: 'horizontal',
              left: '3%',
              bottom: '3%',
              min: 1,
              max: 100,
              text: ['高','低'],
              dimension: 0,
              inRange: {
                  color: ['#D7DA8B', '#E15457']
              }
          },
          grid: {  
            left: '10%',  
            top:'10%',
            bottom: "15%"  
            }, 
          dataset:{
            source:[]
          },
          xAxis: {
              type: "category",
              // data: [],
              axisLabel: {  
                interval: 0,  
                formatter:function(value){  
                  var ret = "";//拼接加\n返回的类目项  
                  var maxLength = 10;//每项显示文字个数  
                  var valLength = value.length;//X轴类目项的文字个数  
                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                  if (rowN > 1){//如果类目项的文字大于3,  
                      for (var i = 0; i < rowN; i++) {  
                          var temp = "";//每次截取的字符串  
                          var start = i * maxLength;//开始截取的位置  
                          var end = start + maxLength;//结束截取的位置  
                          //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                          temp = value.substring(start, end) + "\n";  
                          ret += temp; //凭借最终的字符串  
                      }  
                    return ret;  
                  }  
                  else {  
                    return value;  
                  }  
                }    
              }
          },
          yAxis: {},
          series: [{
              name: '押注人数',
              type: 'bar',
              label: {
                show: true,
                position: "top"
              },
              encode:{
                x: [1],
                y: [0]
              }
          }]
      });
    },
    // initDept(){
    //   this.dept = echarts.init(document.getElementById('dept'),'dark');
    //   this.dept.setOption({
    //       title: {
    //             text: '各部门押注情况',
    //             top: "20px"
    //         },
    //       dataset: {
    //           source: []
    //       },
    //       tooltip:{
    //         confine: true
    //       },
    //       legend: {
    //           data:['押注金额'],
    //           left: "20%"
    //       },
    //       grid: {containLabel: true,left:"3%",right:"10%"},
    //       xAxis: {},
    //       yAxis: {type: 'category',inverse: true},//inverse：坐标轴反向
    //       visualMap: {
    //           orient: 'horizontal',
    //           left: '3%',
    //           min: 100,
    //           max: 20000,
    //           text: ['高','低'],
    //           dimension: 1,
    //           inRange: {
    //               color: ['#D7DA8B', '#E15457']
    //           }
    //       },
    //       series: [
    //           {
    //               type: 'bar',
    //               name: "押注金额",
    //               label: {
    //                 show: true,
    //                 position: "right"
    //               },
    //               encode: {
    //                   x: [1],
    //                   y: [0]
    //               }
    //           }
    //       ]
    //   })      
    // },
    // initEmp(){
    //   this.emp = echarts.init(document.getElementById('emp'),'dark');
    //   this.emp.setOption({
    //       title: {
    //             text: '员工押注情况前十',
    //             top: "20px",
    //             left: '10%'
    //         },
    //       dataset: {
    //           source: []
    //       },
    //       tooltip:{
    //         confine: true
    //       },
    //       legend: {
    //           data:['押注金额'],
    //           left: "60%"
    //       },
    //       grid: {containLabel: true,left:"5%",right:"10%"},
    //       xAxis: {},
    //       yAxis: {
    //         type: 'category',
    //         inverse: true,//inverse：坐标轴反向
    //       },
    //       visualMap: {
    //           orient: 'horizontal',
    //           left: '50%',
    //           min: 100,
    //           max: 20000,
    //           text: ['高','低'],
    //           dimension: 1,
    //           inRange: {
    //               color: ['#D7DA8B', '#E15457']
    //           }
    //       },
    //       series: [
    //           {
    //               type: 'bar',
    //               name: "押注金额",
    //               label: {
    //                 show: true,
    //                 position: "right"
    //               },
    //               encode: {
    //                   x: [1],
    //                   y: [2]
    //               }
    //           }
    //       ]
    //   })      
    // },
    			//数字自增到某一值动画参数（目标元素,自定义配置）
		NumAutoPlusAnimation(targetEle, options) {
 
				/*可以自己改造下传入的参数，按照自己的需求和喜好封装该函数*/
				//不传配置就把它绑定在相应html元素的data-xxxx属性上吧
				options = options || {};
 
				var $this = document.getElementById(targetEle),
					time = options.time || $this.data('time'), //总时间--毫秒为单位
					end = options.end || $this.data('value'), //要显示的真实数值
					regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度
          start = options.start,
					step = end / (time / regulator),/*每30ms增加的数值--*/
					count = 0, //计数器
					initial = 0;
 
				var timer = setInterval(function() {
 
					start = start + step;
 
					if(start >= end) {
						clearInterval(timer);
						start = end;
					}
					//t未发生改变的话就直接返回
					//避免调用text函数，提高DOM性能
					var t = Math.floor(start);
					if(t == initial) return;
 
          initial = t;
          $this.innerHTML = initial;
				}, 30);
      },
    numAc(targetEle, start,end,steep,index) {
        var $this = document.getElementById(targetEle);
        var s = parseInt(start);
        var e = parseInt(end);

				var timer = setInterval(function() {
 
					s = s + parseInt(steep);
 
					if(s >= e) {
						clearInterval(timer);
            s = e;
					}
          $this.innerHTML = s;
				}, index);
      }
  },
  mounted(){
    //this.bodyHeight = window.screen.availHeight  //获取页面全文高度
    //this.initProduct();
    this.getData();
    //this.initDept();
    //this.initEmp();

    // var timer = setInterval(() => {
    //   var end = this.totalNum;
    //   var start = sessionStorage.getItem("TOTALNUM");
    //   if(start == null){
    //     start = 0;
    //   }
    //   if(this.isEnd){
    //     this.isEnd = false
    //     this.numAc('time',start,end,1,300)
    //     sessionStorage.setItem("TOTALNUM",end);
    //     this.isEnd = true;
    //   }
      
    // }, 1500);


    //this.NumAutoPlusAnimation("time",{time:5000,start:start,end:end,regulator:10})
    //this.NumAutoPlusAnimation("time",{time:1500,num:12000,regulator:20})
    
  },
  destroyed(){
    this.closeWebSocket();
  }
  // activated () {
  //     // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
  //     if (this.dept) {
  //       this.dept.resize()
  //     }
  //     if (this.emp) {
  //       this.emp.resize()
  //     }
  //     if (this.product) {
  //       this.product.resize()
  //     }
  //   }
};
</script>

<style scoped>
.container{
  height: 100%;
  background-color: #333333;
  text-align: center;
}
.total{
  position: relative;
  -moz-user-select:none;		/* 火狐 */
	-webkit-user-select:none;	/* 谷歌 */
	-ms-user-select:none;		/* IE */
	user-select:none;
}
.num-tip{
  font-size: 20px;
  color: rgb(250, 195, 14);
  line-height: 50px;
  font-weight: bold;
}
.total-num{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 90px;
  color: rgb(250, 195, 14);
}
.qr-image{
    width: 170px;
    float: right;
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 80%;
}
.qr-tip{
  font-size: 18px;
  color: rgb(250, 195, 14);
  font-weight: bold;
  position: absolute;
  top: 45%;
  left: 69%;
}
</style>