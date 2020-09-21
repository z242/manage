<template>
  <div class="asideBox">
    <!-- 表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="orderState" placeholder="订单状态">
          <el-option :label="item" :value="item" v-for="(item,index) in options" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%;min-height:350px"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column prop="orderNo" label="订单号" width="100"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="100"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="200"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="100"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="80"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-dialog title="查看商品信息" :visible.sync="dialog">
            <el-form class="demo-table-expand" :data="newobj">
              <el-form-item label="订单号">
                <span>{{ newobj.orderNo }}</span>
              </el-form-item>
              <el-form-item label="下单时间">
                <span>{{ newobj.orderTime }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ newobj.phone }}</span>
              </el-form-item>
              <el-form-item label="收货人">
                <span>{{ newobj.consignee }}</span>
              </el-form-item>
              <el-form-item label="送货地址">
                <span>{{ newobj.deliverAddress }}</span>
              </el-form-item>
              <el-form-item label="送达时间">
                <span>{{ newobj.deliveryTime }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ newobj.remarks }}</span>
              </el-form-item>
              <el-form-item label="订单金额">
                <span>{{ newobj.orderAmount }}</span>
              </el-form-item>
              <el-form-item label="订单状态">
                <span>{{ newobj.orderState }}</span>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialog=false" type="primary">关 闭</el-button>
            </div>
          </el-dialog>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-dialog title="查看商品信息" :visible.sync="dialog2">
            <el-form class="demo-table-expand" :data="newobj2">
              <el-form-item label="id">
                <el-input v-model="newobj2.id"></el-input>
              </el-form-item>
              <el-form-item label="订单号">
                <el-input v-model="newobj2.orderNo"></el-input>
              </el-form-item>
              <el-form-item label="下单时间">
                <el-input v-model="newobj2.orderTime"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="newobj2.phone"></el-input>
              </el-form-item>
              <el-form-item label="收货人">
                <el-input v-model="newobj2.consignee"></el-input>
              </el-form-item>
              <el-form-item label="送货地址">
                <el-input v-model="newobj2.deliverAddress"></el-input>
              </el-form-item>
              <el-form-item label="送达时间">
                <el-input v-model="newobj2.deliveryTime"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="newobj2.remarks"></el-input>
              </el-form-item>
              <el-form-item label="订单金额">
                <el-input v-model="newobj2.orderAmount"></el-input>
              </el-form-item>
              <el-form-item label="订单状态">
                <el-select v-model="newobj.orderState" placeholder="订单状态">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item,index) in options"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialog2=false">取 消</el-button>
              <el-button @click="clicksure" type="primary">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-sizes="[5,10,20,50]"
      :page-size="size"
      layout="total,sizes, prev, pager, next,jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
import { getorderlist, getorderdetail, editorder } from "@/api/apis";
import { gettime } from "@/utils/utils";
export default {
  data() {
    return {
      loading: false,

      tableData: [],
      options: ["已完成", "派送中", "已受理", "全部"],

      // 模态框
      dialog: false,
      dialog2: false,
      newobj: {},
      newobj2: {},

      // 订单列表
      currentPage1: 1,
      size: 5,

      // 搜索
      consignee: "",
      orderNo: "",
      phone: "",
      orderState: "",
      date: null,
    };
  },
  methods: {
    // 点击搜索
    check() {
      let { orderNo, consignee, phone, orderState } = this;

      // //额外参数对象
      let elseobj = {};
      if (orderNo != "") elseobj.orderNo = orderNo;
      if (consignee != "") elseobj.consignee = consignee;
      if (phone != "") elseobj.phone = phone;
      if (orderState != "" && orderState != "全部")
        elseobj.orderState = orderState;
      if (this.date)
        elseobj.date = JSON.stringify([
          gettime(this.date[0]),
          gettime(this.date[1]),
        ]);
      this.elseobj = elseobj;
      this.getorder(this.elseobj);
    },

    //点击查看
    handleClick(row) {
      console.log(row);
      this.dialog = true;
      getorderdetail(row.id).then((res) => {
        console.log(res);
        this.newobj = row;
      });
    },

    // 点击编辑
    edit(row) {
      this.dialog2 = true;
      getorderdetail(row.id).then((res) => {
        console.log(res);
        // this.newobj =res.data.data ;
        // console.log(this.newobj)
        this.newobj2 = { ...row };
      });
    },

    // 确认编辑
    clicksure() {
      editorder(this.newobj2).then((res) => {
        this.dialog2 = false;
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功~",
            type: "success",
          });
          this.getorder();
        } else {
          this.$message.error("修改失败,请稍后再试~");
        }
      });
    },

    //点击切换每页显示条数
    handleSizeChange(size) {
      this.size = size;
      this.getorder();
    },

    //点击改变当前页
    handleCurrentChange(currentPage) {
      this.currentPage1 = currentPage;
      this.getorder(this.elseobj);
    },

    // 获取订单列表
    getorder(elseobj) {
      this.loading=true;
      // setTimeout(() => {
        getorderlist({
          currentPage: this.currentPage1,
          pageSize: this.size,
          ...elseobj,
        }).then((res) => {
          let arr = res.data.data;
          // console.log(arr);
          for (const item of arr) {
            item.orderTime = gettime(item.orderTime);
            item.deliveryTime = gettime(item.deliveryTime);
          }
          this.tableData = arr;
          this.tableData.length = res.data.total;
          this.loading=false;
        });
      // }, 3000);
    },
  },

  // 进来渲染订单列表
  created() {
    this.getorder();
  },
};
</script>

<style lang="less" scoped>
.asideBox {
  background-color: #fff;
  padding: 15px 0 100px;
  .el-form {
    margin: 0 0 30px 15px;
  }
  .el-pagination {
    margin: 30px 0 0 15px;
  }
}
</style>