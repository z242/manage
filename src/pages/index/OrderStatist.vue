<template>
  <div>
    <div class="block">
      <span>时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
      ></el-date-picker>
      <el-button type="primary" @click="clicksearch">查询</el-button>
    </div>
    <div class="echartBox">
      <div id="echart"></div>
    </div>
  </div>
</template>

<script>
import { orderlist } from "@/api/apis";
import { gettime } from "@/utils/utils";
export default {
  data() {
    return {
      date: [new Date(), new Date()],
    };
  },
  methods: {
    clicksearch() {
      let timearr = JSON.stringify([
        gettime(this.date[0]),
        gettime(this.date[1]),
      ]);
      this.refresh(timearr);
    },
    refresh(abc) {
      this.myChart = this.$echarts.init(document.getElementById("echart"));
      orderlist(abc).then((res) => {
        console.log(res);
        let arr = res.data.data;
        for (const obj of arr) {
          obj.orderTime = gettime(obj.orderTime);
        }
        let option = {
          legend: {
            data: ["下单时间", "订单金额"],
          },
          xAxis: [
            {
              type: "category",
              data: arr.map((obj) => obj.orderTime),
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "蒸发量",
              type: "bar",
              data: arr.map((obj) => obj.orderAmount),
            },
          ],
        };
        this.myChart.setOption(option);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  span {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    color: #666;
  }
  button {
    margin-left: 10px;
  }
}
// 图表
.echartBox {
  width: 100%;
  background: #fff;
  #echart {
    width: 75%;
    height: 450px;
    margin-top: 30px;
    padding-top: 15px;
    canvas {
      width: 100%;
    }
  }
}
</style>