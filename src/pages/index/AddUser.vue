<template>
  <div class="formBox">
    <div class="title">
      <h4>添加账号</h4>
    </div>
    <el-form label-width="100px" :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="账号" prop="user">
        <el-input type="text" v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="用户组" prop="grup">
        <el-select placeholder="请添加用户组" value v-model="ruleForm.grup">
          <el-option value="超级管理员">超级管理员</el-option>
          <el-option value="普通管理员">普通管理员</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickAdd">添加</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from "@/api/apis";
export default {
  data() {
    return {
      ruleForm: {
        user: "",
        pwd: "",
        grup: "",
      },
    };
  },
  methods: {
    clickAdd() {
      addUser(this.ruleForm.user, this.ruleForm.pwd, this.ruleForm.grup).then(
        (res) => {
          if(res.data.code==0){
            this.ruleForm.user='';
            this.ruleForm.pwd='';
            this.ruleForm.grup='';
            this.$message({
            message: '恭喜你，添加成功~',
            type: 'success'
          });
          }else{
            this.$message.error('添加失败,请重试!');
          }
        }
      );
      // for (var i = 60; i < 100; i++) {
        
      //    this.ruleForm.user = "陈伟霆" + i;
      //       this.ruleForm.pwd = "123";
      //       this.ruleForm.grup = i % 2 == 0 ? "普通管理员" : "超级管理员";

      //       addUser(this.ruleForm.user, this.ruleForm.pwd, this.ruleForm.grup).then(
      //     () => {
           
      //     }
      //   );
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.formBox {
  background-color: #fff;
  .title {
    h4 {
      line-height: 50px;
      text-indent: 15px;
      font-weight: normal;
      border-bottom: 1px solid #f3f3f3;
    }
  }
  .el-form {
    padding: 20px 0;
    .el-input,
    .el-select {
      width: 200px;
    }
  }
}
</style>