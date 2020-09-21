<template>
  <div class="addUser">
    <!-- 订单 -->
    <ul class="order">
      <li>
        <span class="el-icon-document-checked"></span>
        <p>
          <span>总订单</span>
          <span>{{todayOrder}}</span>
        </p>
      </li>
      <li>
        <span class="el-icon-s-promotion"></span>
        <p>
          <span>总销售额</span>
          <span>{{totalAmount}}</span>
        </p>
      </li>
      <li>
        <span class="el-icon-s-order"></span>
        <p>
          <span>今日订单数</span>
          <span>{{totalOrder}}</span>
        </p>
      </li>
      <li>
        <span class="el-icon-date"></span>
        <p>
          <span>今日销售额</span>
          <span>{{totayAmount}}</span>
        </p>
      </li>
    </ul>
    <!-- 图表 -->
    <div id="echart"></div>
  </div>
</template>

<script>
import { homelist } from "@/api/apis";
export default {
  data() {
    return {
      todayOrder: "",
      totalAmount: "",
      totalOrder: "",
      totayAmount: "",
    };
  },
  mounted() {
    var myChart = this.$echarts.init(document.getElementById("echart"));
    homelist().then((res) => {
      console.log(res);
      this.todayOrder = res.data.todayOrder;
      this.totalAmount = res.data.totalAmount;
      this.totalOrder = res.data.totalOrder;
      this.totayAmount = res.data.totayAmount;
      let option = {
        title: {
          text: "数据统计",
          top: "3%",
          left: "1%",
          bottom: "5%",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["金额数据", "订单数据"],
          top: "3%",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
        ],
      };
      myChart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
.addUser {
  // 订单
  .order {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    li {
      width: 18.5%;
      height: 50px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      padding: 15px 30px;
      align-items: center;
      > span {
        font-size: 60px;
        color: #1296db;
      }
      &:nth-child(2) > span {
        color: #d4237a;
      }
      &:last-child > span {
        color: #1afa29;
      }
      p {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          color: #ccc;
          &:last-child {
            color: #000;
            font-weight: bold;
            font-size: 14px;
          }
        }
      }
    }
  }
  // 图表
  #echart {
    width: 100%;
    height: 450px;
    background: #fff;
    canvas {
      width: 100%;
    }
  }
}
</style>