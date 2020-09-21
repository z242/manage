<template>
  <div class="content">
    <div class="title">
      <h4>店铺管理</h4>
      <div>
        <el-button type="primary" @click="editsure">保存</el-button>
      </div>
    </div>
    <div class="msg">
      <div>
        <span>店铺名称</span>
        <input type="text" v-model="name" />
      </div>
      <div>
        <span>店铺公告</span>
        <textarea name id cols="30" rows="10" v-model="con"></textarea>
      </div>
      <div >
        <span>店铺头像</span>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="avatar"
            :src="avatar=='' ? '':'http://127.0.0.1:5000/upload/shop/'+avatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div >
        <span>店铺图片</span>
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-success="shopimgsUploadSuccess"
          :on-remove="handleRemove"
          :file-list="uploadimg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div>
        <span>配送费</span>
        <input type="text" v-model="price" />
      </div>
      <div>
        <span>配送时间</span>
        <input type="text" v-model="time" />
      </div>
      <div>
        <span>配送描述</span>
        <input type="text" v-model="style" />
      </div>
      <div>
        <span>店铺评分</span>
        <input type="text" v-model="score" />
      </div>
      <div>
        <span>销量</span>
        <input type="text" v-model="sale" />
      </div>
    </div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <br />
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
          <br />
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          arrow-control
          v-model="date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getstore ,editstore} from "@/api/apis";
import { gettime } from "@/utils/utils";
export default {
  data() {
    return {
      name: "",
      price: "",
      time: "",
      style: "",
      score: "",
      sale: "",
      con: "",
      avatar: "",
      date: [],
      id: "",
      type: [],

      pics: [],
      uploadimg: [], //照片回填
    };
  },
  methods: {
    //店铺头像上传
    handleAvatarSuccess(res) {
      // console.log(res);
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        this.$message({
          type: "success",
          message: "店铺头像上传成功",
        });
      }
    },
    //删除上传图片
    handleRemove(res) {
      this.uploadimg.splice(this.uploadimg.indexOf(res.name), 1);
      // console.log(res,file)
      // this.uploadimg.splice(this.uploadimg.indexOf(res.uid), 1);
    },
    //店铺图片上传
    shopimgsUploadSuccess(res) {
      if (res.code == 0) {

        this.uploadimg.push({
          name: res.imgUrl,
          url: "http://127.0.0.1:5000/upload/shop/" + res.imgUrl,
        });
      }
    },
    //确认修改
    editsure() {
      var newobj = {
        id: this.id,
        bulletin: this.con,
        deliveryPrice: this.price,
        deliveryTime: this.time,
        name: this.name,
        description: this.style,
        sellCount: this.sale,
        avatar: this.avatar,
        score: this.score,

        supports: JSON.stringify(this.type),
        // pics: JSON.stringify(this.uploadimg),
        pics: JSON.stringify(this.uploadimg.map((item) => item.name)),
        date: JSON.stringify([gettime(this.date[0]), gettime(this.date[1])]),
      };
      // console.log(newobj);
      editstore(newobj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "店铺信息修改成功！",
          });
          this.refresh();
        }
      });
    },
    refresh() {
      getstore().then((res) => {
        this.con = res.data.data.bulletin;
        this.price = res.data.data.deliveryPrice;
        this.time = res.data.data.deliveryTime;
        this.name = res.data.data.name;
        this.style = res.data.data.description;
        this.score = res.data.data.score;
        this.sale = res.data.data.sellCount;
        this.avatar = res.data.data.avatar;
        this.date = res.data.data.date;
        this.type = res.data.data.supports;
        this.id = res.data.data.id;
        this.pics = res.data.data.pics;
        this.uploadimg = res.data.data.pics.map((item) => {
          return {
            name: item, //名字
            url: "http://127.0.0.1:5000/upload/shop/" + item,
          };
        });
      });
    },
  },
  //获取店铺信息
  created() {
    this.refresh();
  },
};
</script>

<style lang="less" scoped>
.content {
  color: #666;
  background-color: #fff;
  font-size: 14px;
  padding-bottom: 30px;
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
  .msg {
    > div {
      display: flex;
      margin-top: 20px;
      span {
        display: inline-block;
        text-align: right;
        width: 10%;
        margin-right: 10px;
        line-height: 30px;
      }
      input {
        line-height: 30px;
        width: 300px;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-indent: 10px;
        color: #666;
      }
      textarea {
        outline: none;
        border: 1px solid #ccc;
        padding: 5px 10px;
        border-radius: 5px;
        height: 100px;
        width: 280px;
        color: #666;
        font-family: "微雅软黑";
      }
    }
  }
  .el-form {
    margin: 20px 0 0 45px;
    display: block;
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