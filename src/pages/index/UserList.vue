<template>
  <div class="content">
    <!-- 标题 -->
    <div class="title">
      <h4>账号列表</h4>
    </div>

    <div class="main">
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-text="拼命加载中"
       min-height="330px"
      >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="账号" width="140">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="160"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off" class="inputW"></el-input>
                </el-form-item>
                <el-form-item label="用户权限" :label-width="formLabelWidth">
                  <el-select v-model="form.power">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="clickfalse">取 消</el-button>
                <el-button type="primary" @click="clicktrue ">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
              class="delbtn"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
        layout="total,sizes, prev, pager, next,jumper"
        :total="tableData.length"
      ></el-pagination>

      <!-- 按钮 -->
      <el-button type="danger" @click="clickdelmore">批量删除</el-button>
      <el-button type="primary">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { userList, delUser, delMore, updateAcc } from "@/api/apis";
import { gettime } from "@/utils/utils";
export default {
  data() {
    return {
      loading: false,
      currentPage1: 1,
      size: 5,
      tableData: [],
      multipleSelection: [],

      dialogFormVisible: false,
      form: {
        name: "",
        power: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      localStorage.delid = row.id;
    },
    clickfalse() {
      this.form.name = "";
      this.form.power = "";
      this.dialogFormVisible = false;
    },
    clicktrue() {
      updateAcc(localStorage.delid, this.form.name, this.form.power).then(
        (res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功~",
              type: "success",
            });
          } else {
            this.$message.error("修改失败,请稍后再试~");
          }
          this.form.name = "";
          this.form.power = "";
          this.getuserlist();
          this.dialogFormVisible = false;
        }
      );
    },

    //删除单条数据
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getuserlist();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(size) {
      this.size = size;
      this.getuserlist();
    },
    handleCurrentChange(currentPage1) {
      this.currentPage1 = currentPage1;
      this.getuserlist();
    },

    //批量删除
    handleSelectionChange(val) {
      val.forEach((item) => {
        this.multipleSelection.push(item.id);
      });
    },
    clickdelmore() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMore(JSON.stringify(this.multipleSelection)).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getuserlist();
            } else {
              this.$message.error("删除失败");
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

    // 封装获取用户列表函数
    getuserlist() {
      this.loading = true;
      // window.setTimeout(() => {
        userList(this.currentPage1, this.size).then((res) => {
          let arr = res.data.data;
          // 遍历数组里面的时间;
          for (let item of arr) {
            item.ctime = gettime(item.ctime);
          }
          console.log(arr);
          this.tableData = arr;
          this.tableData.length = res.data.total;
          this.loading = false;
        });
      // }, 2000);
    },
  },
  created() {
    this.getuserlist();
  },
};
</script>

<style lang="less" scoped>
.content {
  color: #666;
  background-color: #fff;
  font-size: 14px;
  padding-bottom: 10px;
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
  }
  .main {
    padding: 15px;
    .el-pagination {
      margin: 15px 0;
    }
  }
  .inputW {
    width: 217px;
  }
  .delbtn {
    margin-left: 10px;
  }
}
</style>