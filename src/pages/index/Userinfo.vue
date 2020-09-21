<template>
  <div class="manData">
    <h4>管理员信息</h4>
    <div class="msg">
      <p>
        管理员id:
        <span>{{id}}</span>
      </p>
      <p>
        账号:
        <span>{{name}}</span>
      </p>
      <p>
        用户组:
        <span>{{grup}}</span>
      </p>
      <p>
        创建时间:
        <span>{{creatTime}}</span>
      </p>
      <p class="spe">
        <span>管理员头像:</span> &emsp; &emsp;
        <el-upload
          class="avatar-uploader"
          :action="userimgsend"
          :data="obj"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img  :src="imageUrl" class="avatar" />
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </p>
    </div>
  </div>
</template>

<script>
import { userinfo ,userimgsend,userimg} from "@/api/apis";
import {gettime} from '@/utils/utils'
export default {
  data() {
    return {
      imageUrl:'',
      headimg:'',

      userimgsend:'',//图片发送地址
      userimg:'',//图片

      id: "",
      name: "",
      grup: "",
      creatTime: "",

      obj: {},
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(res)
      if (res.code == 0) {
        this.$bus.$emit('uploadhead');
        this.imageUrl =userimg+res.imgUrl;
        // console.log(this.imageUrl)
        this.$message({
          type: "success",
          message: "头像上传成功!",
        });
      }else{
        this.$message.error('头像上传失败!');
      }
    },
  },
  created() {
    // this.$bus.$on("head",(res)=>{
    //   console.log(res);
    // })
    this.obj = { id: localStorage.id };
    console.log(this.obj);

    userinfo(localStorage.id).then((res) => {
      console.log(res)
      this.id = localStorage.id;
      this.name = localStorage.acc;
      this.grup = res.data.accountInfo.userGroup;
      this.creatTime = gettime(res.data.accountInfo.ctime);
      this.imageUrl = res.data.accountInfo.imgUrl;
      // this.imageUrl=headimg;
    });

    this.userimgsend=userimgsend;
    this.userimg=userimg;
  },
};
</script>

<style lang="less" scoped>
.manData {
  color: #666;
  background-color: #fff;
  h4 {
    line-height: 50px;
    text-indent: 15px;
    font-weight: normal;
    border-bottom: 1px solid #f3f3f3;
  }
  .msg {
    padding: 0 15px;
    p {
      line-height: 50px;
      span {
        margin-left: 10px;
      }
      &:not(:last-child) {
        border-bottom: 2px solid #f3f3f3;
      }
      &:last-child {
        display: flex;
        align-items: center;
        padding: 30px 0 5px;
        height: 80px;
        img {
          height: 70px;
          width: 60px;
          margin-left: 10px;
        }
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
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
</style>