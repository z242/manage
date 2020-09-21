<template>
  <el-container>
    <!-- 左边 -->
    <el-aside width="200px">
      <el-menu
        :default-active="curhash"
        class="el-menu-vertical-demo"
        background-color="#E9E7EC"
        text-color="#666666"
        active-text-color="#fff"
        router
        unique-opened
      >
        <div v-for="(item,index) in userpower" :key="index">
          <el-menu-item :index="item.url" v-if="!item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              {{item.name}}
            </template>
          </el-menu-item>

          <el-submenu :index="item.url" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              {{item.name}}
            </template>
            <el-menu-item-group active-background-color="red">
              <el-menu-item
                :index="child.url"
                v-for="(child,index) in item.children"
                :key="index"
              >{{child.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>

    <!-- 右边 -->
    <el-container>
      <el-header >
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户 -->
        <div class="user">
          <p>{{user}}</p>
          <div>
            <a href="/#/index/userinfo">
              <el-avatar :src="headimg"></el-avatar>
            </a>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, userinfo } from "../api/apis";
export default {
  data() {
    return {
      breadlist: [],

      curhash: "",
      user: "",
      headimg: "",
      list: [
        {
          url: "/index/home",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/index/orderManage",
          icon: "el-icon-s-order",
          name: "订单管理",
          roles: ["super"],
        },
        {
          url: "/index/productManage",
          icon: "el-icon-s-cooperation",
          name: "商品管理",
          roles: ["super", "normal"],
          children: [
            {
              url: "/index/productList",
              name: "商品列表",
            },
            {
              url: "/index/productAdd",
              name: "商品添加",
            },
            {
              url: "/index/categories",
              name: "商品分类",
            },
          ],
        },
        {
          url: "/index/storeManage",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super", "normal"],
        },
        {
          url: "/index/userManage",
          icon: "el-icon-s-custom",
          name: "账号管理",
          roles: ["super"],
          children: [
            {
              url: "/index/userList",
              name: "账号列表",
            },
            {
              url: "/index/AddUser",
              name: "添加账号",
            },
            {
              url: "/index/UpdatePwd",
              name: "修改密码",
            },
          ],
        },
        {
          url: "/index/saleTotal",
          icon: "el-icon-timer",
          name: "销售统计",
          roles: ["super", "normal"],
          children: [
            {
              url: "/index/StoreStatist",
              name: "商品统计",
            },
            {
              url: "/index/OrderStatist",
              name: "订单统计",
            },
          ],
        },
      ],
    };
  },
  created() {
    //刷新hash
    this.curhash = this.$route.path;
    //验证token有没有失效
    checktoken(localStorage.token).then((res) => {
      // console.log(res)
      if (res.data.code == 0) {
        this.user = "欢迎你," + localStorage.acc;
      } else {
        this.user = "请登录";
      }
    });
    userinfo(localStorage.id).then((res) => {
      this.headimg = res.data.accountInfo.imgUrl;
    });

    this.$bus.$on("uploadhead", () => {
      userinfo(localStorage.id).then((res) => {
        this.headimg = res.data.accountInfo.imgUrl;
      });
    });

    this.breadlist = this.$route.meta.breadlist;
  },
  computed: {
    //权限
    userpower() {
      let newarr = this.list.filter((item) => {
        return item.roles.includes(localStorage.role);
      });
      return newarr; //不需要this.list=newarr
    },
  },
  watch: {
    $route() {
      // console.log(to)
      // console.log(this.$route)
      // this.breadlist=to.meta.breadlist
      this.breadlist = this.$route.meta.breadlist;
    },
  },
};
</script>

<style lang="less" scoped>
@theme: #E9E7EC;
@content: #f0f2f5;
.el-container {
  height: 100%;
  .el-aside {
    background-color: @theme;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user {
      font-size: 12px;
      display: flex;
      align-items: center;
      p {
        margin-right: 10px;
      }
    }
  }
  .el-main {
    background-color: @content;
    padding: 15px;
  }
  .el-menu {
    border: none;
  }
  i{
    color: #666666;
  }
  .el-menu-item.is-active i{
    color:#fff;
  }
}
</style>