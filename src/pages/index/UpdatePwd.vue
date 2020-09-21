<template>
  <div class="formBox">
    <div class="title">
      <h4>修改密码</h4>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="age">
        <el-input type="password" v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checkOldpwd, updatePwd } from "@/api/apis";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {//正则验证成功

          //检测原密码是否正确
          checkOldpwd(this.ruleForm.age, localStorage.id).then((res) => {
            if (res.data.code == 0) {//原密码正确
              console.log(res);
              
              //修改密码
              updatePwd(this.ruleForm.checkPass, localStorage.id).then(
                (res) => {
                  window.setTimeout(() => {
                    this.$router.push("/");
                  }, 3000);
                  alert("密码修改成功,请重新登录!3秒后为您跳转到登录~");
                  console.log(res);
                }
              );
            } else {//原密码输入错误
              alert("原密码错误!!");
              return;
            }
          });
        } else {//正则验证失败
          alert("修改失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    .el-input {
      width: 200px;
    }
  }
}
</style>