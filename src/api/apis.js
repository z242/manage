import axios from 'axios'

//请求基本路径
const ip='http://127.0.0.1:5000';

axios.defaults.baseURL=ip;

export var sendaddress=ip+'/goods/goods_img_upload';
export var uploadimg=ip+'/upload/imgs/goods_img/';
export var userimgsend=ip+'/users/avatar_upload';//个人信息
export var userimg=ip+'/upload/imgs/acc_img/';//个人信息


// es5
// export function login(account,password){
//     return axios.post('/users/checkLogin',{account,password})
//  }

// es6
//1.验证登录
export var login=(account,password)=>axios.post('/users/checkLogin',{account,password});

// 2.添加账号
export var addUser=(account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})

// 3.获取账号列表
export var userList=(currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})

// 4.删除账号
export var delUser=(id)=>axios.get('/users/del',{params:{id}})

// 5.批量删除账号
export var delMore=(ids)=>axios.get('/users/batchdel',{params:{ids}})

// 6.修改账号
export var updateAcc=(id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup});

// 7.检测旧密码是否正确
export var checkOldpwd=(oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}})

// 8.修改密码
export var updatePwd=(newPwd,id)=>axios.post('/users/editpwd',{newPwd,id});

// 9.获取用户信息
export var userinfo=(id)=>axios.get('/users/accountinfo',{params:{id}})

// 10.头像上传
export var headupload=(id)=>axios.post('/avatar_upload',{id});

// 11.验证token是否失效
export var checktoken=(token)=>axios.get('/users/checktoken',{params:{token}});

// 12.添加分类
export var addlist=(cateName,state)=>axios.post('/goods/addcate',{cateName,state});

// 13.获取分类
export var getcatelist=(currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}});

// 14.删除分类
export var delcatelist=(id)=>axios.get('/goods/delcate',{params:{id}});

// 15.修改分类
export var editcate=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state});

// 16.查询所有分类名称
export var checklist=()=>axios.get('/goods/categories',{params:{}});

// 17.商品图片上传
// export var goodupload=()=>axios.post('/goods/goods_img_upload',{});

// 18.添加商品
export var addpro=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc});

// 19.获取商品列表
export var getPlist=(currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}});

// 20.删除商品
export var delpro=(id)=>axios.get('/goods/del',{params:{id}});

// 21.修改商品
export var editpro=(params)=>axios.post('/goods/edit',params);

// 22.获取订单列表
// export var getorderlist=(currentPage,pageSize)=>axios.get('/order/list',{params:{currentPage,pageSize}});

// 23.查询
export var getorderlist=(params)=>axios.get('/order/search',{params});

// 24.获取订单详情
export var getorderdetail=(id)=>axios.get('/order/detail',{params:{id}});

// 25.修改订单
// export var editorder=(id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState});
export var editorder=(params)=>axios.post('/order/edit',params);

// 26.获取店铺详情
export var getstore=()=>axios.get('/shop/info');

// 27.店铺图片上传接口
// export var picupload=()=>axios.post('/shop/upload');

// 28.店铺内容修改
export var editstore=(params)=>axios.post('/shop/edit',params);

// 29.首页报表接口
export var homelist=()=>axios.get('/order/totaldata');

// 30.订单报表接口
export var orderlist=(date)=>axios.get('/order/ordertotal',{params:{date}});
