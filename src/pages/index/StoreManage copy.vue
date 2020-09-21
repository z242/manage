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
      <div>
        <span>店铺头像</span>
        <div class="demo-image">
          <div class="block">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://127.0.0.1:5000/upload/shop/'+avatar"
            ></el-image>
          </div>
        </div>
      </div>
      <div>
        <span>店铺图片</span>
        <div class="demo-image">
          <div class="block" style="display:flex">
            <div style="margin-right:10px">
              <el-image
              style="margin-right:10px"
                :src="'http://127.0.0.1:5000/upload/shop/'+pic"
                v-for="(pic,index) in lists"
                :key="index"
              ></el-image>
            </div>
          </div>
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <!-- <img :src="'http://127.0.0.1:5000/upload/shop/'+uploadimg" alt=""> -->
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" style="width: 100px; height: 100px">
            <img  :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
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
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动"  name="type"></el-checkbox>
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
      lists: [],
      date: [],
      id:'',

      form: {
        type: [],
      },

      // uploadimg:'',
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file)
      // this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    editsure(){
      editstore({id:this.id,
      bulletin:this.con,
      deliveryPrice:this.price,
      deliveryTime:this.con,
      name:this.name,
      description:this.style,
      sellCount:this.sale,
      avatar:this.lists,
      pics:this.con,
      supports:this.form.type,
      score:this.score,}).then(res=>{
        console.log(res)
      })
    }
  },
  created() {
    getstore().then((res) => {
      console.log(res)
      this.con = res.data.data.bulletin;
      this.price = res.data.data.deliveryPrice;
      this.time = res.data.data.deliveryTime;
      this.name = res.data.data.name;
      this.style = res.data.data.description;
      this.score = res.data.data.score;
      this.sale = res.data.data.sellCount;
      this.avatar = res.data.data.avatar;
      this.lists = res.data.data.pics;
      this.date = res.data.data.date;
      this.form.type = res.data.data.supports;
      this.id=res.data.data.id;
    });
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
      .demo-image {
        .el-image {
          width: 100px;
          height: 100px;
          border-radius: 5px;
        }
        p {
          width: 100px;
          border-radius: 5px;
          border: 1px dashed #ccc;
          margin-top: 15px;
          font-size: 30px;
          text-align: center;
          line-height: 100px;
          background-color: #fbfdff;
          color: #959fab;
        }
      }
    }
  }
  .el-form {
    margin: 20px 0 0 45px;
    display: block;
  }
}
</style>