<template>
  <div class="content">
    <div class="title">
      <h4>商品分类</h4>
      <div class="addCate">
        <el-button type="primary" @click="addc">添加分类</el-button>
        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%">
          <p>
            <span>分类名称</span>
            <input type="text" placeholder="分类名称" v-model="newadd" />
          </p>
          <p>
            <span>是否启用</span>
            <el-switch v-model="stadus" inactive-color="#ff4949" active-color="#13ce66"></el-switch>
          </p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="chickfalse">取 消</el-button>
            <el-button type="primary" @click="clickture">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" style="min-height:350px">
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="分类名称" width="300">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="300">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="scope.row.state"
            :disabled="!scope.row.isedit"
          >></el-switch>
        </template>3
      </el-table-column>
      <el-table-column label="操作" width="385">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">{{scope.row.isedit?'完成':'编辑'}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      :current-page.sync="currentPage1"
      :page-size="size"
      layout="total, sizes,prev, pager, next,jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
import { getcatelist, delcatelist, editcate, addlist } from "@/api/apis";
export default {
  data() {
    return {
      currentPage1: 1,
      size: 5,
      tableData: [],
      dialogVisible: false,

      stadus: true,
      newadd: "",
      loading: false,
    };
  },
  methods: {
    handleEdit(scope) {
      // console.log(index, row);
      if (scope.row.isedit) {
        editcate(scope.row.id, scope.row.cateName, scope.row.state).then(
          (res) => {
            console.log(res.data.code);
            if (res.data.code == 0) {
              this.$message({
                message: "店铺分类修改成功",
                type: "success",
              });
              scope.row.isedit = false;
            }
          }
        );
      } else {
        //开启编辑状态
        scope.row.isedit = true;
      }
    },
    //添加新的商品分类
    addc() {
      this.dialogVisible = true;
    },
    clickture() {
      addlist(this.newadd, this.stadus).then((res) => {
        if (res.data.code == 0) {
          this.newadd = "";
          this.$message({
            type: "success",
            message: "创建成功!",
          });
          this.dialogVisible = false;
          this.getcates();
        }
      });
    },
    chickfalse() {
      this.newadd = "";
      this.dialogVisible = false;
    },

    //删除单个商品
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcatelist(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getcates();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //改变显示数量
    handleSizeChange(size) {
      this.size = size;
      this.getcates();
    },

    // 切换当前的页面
    handleCurrentChange(currentpage) {
      this.currentpage = currentpage;
      this.getcates();
    },

    //封装一个获取商品列表的方法
    getcates() {
      this.loading = true;
      // window.setTimeout(() => {
        getcatelist(this.currentPage1, this.size).then((res) => {
          let arr = res.data.data;
          for (let i = 0; i < arr.length; i++) {
            arr[i].state = arr[i].state == 1;
            arr[i].isedit = false;
          }
          this.tableData = arr;
          this.tableData.length = res.data.total;
          this.loading = false;
        });
      // }, 3000);
    },
  },
  created() {
    this.getcates();
  },
};
</script>

<style lang="less" scoped>
.content {
  color: #666;
  background-color: #fff;
  font-size: 14px;
  padding-bottom: 30px;
  overflow: hidden;
  .title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    align-items: center;
    padding: 0 15px;
    h4 {
      line-height: 60px;
      font-weight: normal;
      font-size: 16px;
    }
    .addCate {
      p {
        margin-bottom: 15px;
        span {
          margin-right: 15px;
        }
        input {
          line-height: 30px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          text-indent: 10px;
          width: 80%;
        }
      }
    }
  }
  .el-table {
    padding: 15px;
    width: 100%;
  }
  .el-pagination {
    margin: 30px 0 0 15px;
  }
}
</style>