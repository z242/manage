<template>
  <div class="content">
    <!-- 标题 -->
    <div class="title">
      <h4>商品添加</h4>
    </div>
    <!-- 表单 -->
    <el-form :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="formInline.region" placeholder="商品分类">
          <el-option :label="item" :value="item" v-for="(item,index) in optionlist" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number
          v-model="formInline.num"
          @change="handleChange"
          :min="0"
          :max="100"
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
          <img v-if="formInline.imageUrl" :src="uploadimg+formInline.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formInline.textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checklist, addpro,sendaddress,uploadimg } from "@/api/apis";
export default {
  data() {
    return {
      formInline: {
        textarea: "",
        num: 0,
        imageUrl: "",
        name: "",
        region: "",
      },
      optionlist: [],

      sendaddress:'',
      uploadimg:''
    };
  },
  methods: {
    handleChange(value) {
      this.formInline.num = value;
    },
    handleAvatarSuccess(res) {
      //图片上传成功
      this.formInline.imageUrl = res.imgUrl;
    },
    onSubmit() {
      addpro(
        this.formInline.name,
        this.formInline.region,
        this.formInline.num,
        this.formInline.imageUrl,
        this.formInline.textarea
      ).then((res) => {
        if (res.data.code == 0) {
            this.formInline.name='',
            this.formInline.region='',
            this.formInline.num='',
            this.formInline.imageUrl='',
            this.formInline.textarea='';
          this.$router.push("/index/productList");
          this.$message({
            type: "success",
            message: "商品添加成功!",
          });
        } else {
          this.$message.error("商品添加失败,请重试!");
        }
      });
    },
  },
  created() {
    checklist().then((res) => {
      var arr = res.data.categories.map((item) => {
        return item.cateName;
      });
      //获取所有分类名称
      this.optionlist = arr;
      this.formInline.region=this.optionlist[0];
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
  .el-form {
    padding: 0 30px;
    .el-form-item {
      margin-top: 20px;
    }
    .el-input,
    .el-textarea {
      width: 400px;
    }
    .el-button {
      margin-left: 70px;
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
}
</style>