<template>
  <div class="content">
    <!-- 标题 -->
    <div class="title">
      <h4>商品列表</h4>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%;min-height:450px" v-loading="isloading" element-loading-text="拼命加载中">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ scope.row.id }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ scope.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span>
                <img :src="uploadimg+scope.row.imgUrl" alt style="width: 150px;" />
              </span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ scope.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ scope.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ scope.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ scope.row.price }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ scope.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ scope.row.sellCount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="uploadimg+scope.row.imgUrl" alt style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" type="primary">编辑</el-button>
          <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
            <el-form :model="formInline" class="demo-form-inline">
              <el-form-item label="商品名称">
                <el-input v-model="formInline.name" placeholder="商品名称" class="inputW"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-select v-model="formInline.category" placeholder="商品分类">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item,index) in optionlist"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品价格">
                <el-input-number
                  v-model="formInline.price"
                  :min="0"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="商品图片">
                <el-upload
                  class="avatar-uploader"
                  :action="sendaddress"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="formInline.imgUrl" :src="uploadimg+formInline.imgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="商品描述">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="formInline.goodsDesc"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible=false">取 消</el-button>
              <el-button type="primary" @click="clicktrue ">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" class="delbtn" @click="handleDelete(scope)">删除</el-button>
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
      layout="total, sizes,prev, pager, next,jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
import { getPlist, delpro, editpro, checklist,sendaddress,uploadimg } from "@/api/apis";
import {gettime} from '@/utils/utils'
export default {
  data() {
    return {
      sendaddress:'',
      uploadimg:'',

      isloading: false,

      currentPage1: 1,
      size: 5,
      tableData: [],

      optionlist: [],
      dialogFormVisible: false,
      formInline: {},
      formLabelWidth: "120px",

    };
  },
  methods: {
    handleAvatarSuccess(res) {
      //图片上传成功
      // console.log(res)
      this.formInline.imgUrl=res.imgUrl;
    },
    handleEdit(row) {
      // console.log(row);
      this.formInline={...row};
      this.dialogFormVisible = true;
    },
    clicktrue() {
      editpro(this.formInline).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功~",
            type: "success",
          });
        } else {
          this.$message.error("修改失败,请稍后再试~");
        }
       
        this.getProductlist();
        this.dialogFormVisible = false;
      });
    },
    handleSizeChange(size) {
      this.size = size;
      this.getProductlist();
    },
    handleCurrentChange(currentPage1) {
      this.currentPage1 = currentPage1;
      this.getProductlist();
    },
    handleDelete(scope) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delpro(scope.row.id).then((res) => {
            if (res.data.code == 0) {
              this.getProductlist();
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

    //获取商品列表
    getProductlist() {
      this.isloading = true;
      getPlist(this.currentPage1, this.size).then((res) => {
        for (const item of res.data.data) {
          item.ctime=gettime(item.ctime);
        }
        this.tableData = res.data.data;
        this.tableData.length = res.data.total;
        this.isloading = false;
      });
    },
  },
  created() {
    this.getProductlist();

    checklist().then((res) => {
      var arr = res.data.categories.map((item) => {
        return item.cateName;
      });
      //获取所有分类名称
      this.optionlist = arr;
    });

    this.sendaddress=sendaddress;
    this.uploadimg=uploadimg;
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
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-pagination {
    margin: 30px 0 0 15px;
  }
  .el-table {
    padding: 15px;
  }
  .delbtn {
    margin-left: 10px;
  }
  .inputW {
    width: 217px;
  }
  .avatar-uploader {
    .avatar-uploader-icon {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader-icon:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>