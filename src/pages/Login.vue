<template>
  <div class="loginbox">
    <div class="login">
      <p>系统登录</p>
      <el-input
        v-model="acc"
        clearable
        placeholder="请输入内容"
        prefix-icon="el-icon-user-solid"
        background-color="transparent"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        prefix-icon="el-icon-lock"
        v-model="pwd"
        show-password
        background-color="transparent"
      ></el-input>
      <div class="err">{{errp}}</div>
      <el-button type="primary" @click="clickLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "../api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      errp: "",
    };
  },
  methods: {
    clickLogin() {
      // console.log(login(this.acc, this.pwd));
      // console.log(this.$router)

      login(this.acc, this.pwd).then((res) => {
        // console.log(res);

        //  console.log(res.data.id)
        localStorage.token = res.data.token; //token
        localStorage.role = res.data.role; //权限
        localStorage.acc = this.acc; //用户名
        localStorage.id = res.data.id; //用户id
        localStorage.pwd = this.pwd; //用户原密码
        if (res.data.code == 0) {
          // location.href = "#/index/home";
          this.$router.push("/index/home"); //改变hash地址
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
        }
        if (res.data.code == 1) {
          this.errp = res.data.msg;
        }
      });
    },
  },
};
</script>

<style lang="less" >
.loginbox {
  height: 100%;
  width: 100%;
  // background-color: #669999;
  background:url('../assets/imgs/fff.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    width: 300px;
    height: 300px;
    p {
      // color: #fff;
      font-size: 20px;
      text-align: center;
      margin-bottom: 25px;
    }
    .err {
      width: 100%;
      line-height: 36px;
      height: 36px;
      color: red;
      font-size: 12px;
    }
    // .el-input__inner {
    //   // background: transparent;
    //   color: #fff;
    // }
    .el-button {
      width: 100%;
    }
  }
  .login > .el-input:nth-child(2) {
    margin-bottom: 20px;
  }
}
</style>