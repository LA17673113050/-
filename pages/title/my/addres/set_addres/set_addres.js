// pages/title/my/addres/add_addres/add_addres.js
let WXAPI = require('./../../../../../utils/apifm')
// import Dialog from 'path/to/@vant/weapp/dist/dialog/dialog';
import Dialog from './../../../../../miniprogram_npm/@vant/weapp/dialog/dialog.js'
Page({
  data: {
    sheng_list:[],
    shi_list:[],
    qu_list:[],

    sheng_id:null,
    shi_id:null,
    qu_id:null,

    arr1: [],
    index1: 0,
    arr2: [],
    index2: 0,
    arr3: [],
    index3: 0,

    show1:false,
    show2:false,
    show3:false,

    check_shi:false,
    check_qu:false,

    name:'',
    tel:'',
    xiangxi:'',

    tel_if:false, 
    tel_msg:'',

    set_moren:false
  },
  
  onLoad:function(options){
    // console.log(options.id)
    // this.get_sheng()
    WXAPI.get_dizhi_xiang({id:options.id,token:wx.getStorageSync('token')}).then((res) =>{
      // console.log(res)
      var val = res.data.info
      this.setData({
        list:val,
        arr1:[val.provinceStr],
        arr2:[val.cityStr],
        arr3:[val.districtId],
        name:val.linkMan,
        tel:val.mobile,
        xiangxi:val.address,
        sheng_id:val.provinceId,
        shi_id:val.cityId,
        qu_id:val.districtId
      })
      console.log(this.data.list)
      console.log(this.data.arr1,this.data.arr2,this.data.arr3)
    })
  },

  get_sheng(){
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/common/region/v2/province',
      data: {
        token:wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // console.log(res)
        var arr = res.data.data,are=[];
        arr.forEach((item) => {
          are.push(item.name)
        })
        that.setData({
          arr1:are,
          sheng_list:res.data.data
        })
      }
    })
  },
  get_shi(pop){
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/common/region/v2/child',
      data: {
        pid:pop,
        token:wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        var arr = res.data.data,are=[];
        arr.forEach((item) => {
          are.push(item.name)
        })
        that.setData({
          arr2:are,
          shi_list:res.data.data
        })
        // console.log(that.data.arr2)
        // console.log(that.data.shi_list)
      }
    })
  },
  get_qu(pop){
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/common/region/v2/child',
      data: {
        pid:pop,
        token:wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        var arr = res.data.data,are=[];
        arr.forEach((item) => {
          are.push(item.name)
        })
        that.setData({
          arr3:are,
          qu_list:res.data.data
        })
        // console.log(that.data.arr3)
        // console.log(that.data.qu_list)
      }
    })
  },
  //省级选择
  showPopup1() {
    this.get_sheng()
    setTimeout(() => {
      this.setData({ show1: true });
    }, 10);
    
  },  
  bindPickerChange1: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var pop = null;
    this.data.sheng_list.forEach((item,index) => {
      if(index == e.detail.value){
        pop = item.id
        // console.log(item.id)
        this.setData({
          check_shi:true,
          sheng_id:item.id
        })
        console.log(this.data.sheng_id)
      }
    })
    this.setData({
      index1: e.detail.value
    })
    this.get_shi(pop)
  },
  //市级选择
  showPopup2() {
    this.setData({ show2: true });
  },  
  bindPickerChange2: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var pop = null;
    this.data.shi_list.forEach((item,index) => {
      if(index == e.detail.value){
        pop = item.id
        this.setData({
          check_qu:true,
          shi_id:item.id
        })
        console.log(this.data.shi_id)
      }
    })
    this.setData({
      index2: e.detail.value
    })
    this.get_qu(pop)
  },
  //区级选择
  showPopup3() {
    this.setData({ show3: true });
  },  
  bindPickerChange3: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var pop = null;
    this.data.shi_list.forEach((item,index) => {
      if(index == e.detail.value){
        pop = item.id
        this.setData({
          qu_id:item.id
        })
        console.log(this.data.qu_id)
      }
    })
    this.setData({
      index3: e.detail.value
    })
  },

  onClose1() {
    this.setData({ show1: false });
  },

  //收件人框失焦
  blur_1(e){
    // console.log(e.detail.value)
    this.setData({
      name:e.detail.value
    })
  },
  //电话框失焦
  blur_2(e){
    // console.log(e.detail.value)
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if(!myreg.test(e.detail.value)){
      this.setData({
        tel_if:true,
        tel_msg:'手机号码格式不正确'
      })
      // console.log('no')
    }else{
      this.setData({
        tel_if:!true,
        tel_msg:null,
        tel:e.detail.value
      })
      // console.log('yes')
    }
  },
  blur_3(e){
    this.setData({
      xiangxi:e.detail.value
    })
    // console.log(e.detail.value)
  },
  set_moren({ detail }){
    this.setData({set_moren:detail})
  },
  btn_ok(){
    WXAPI.set_dizhi({
      provinceId:this.data.sheng_id,
      cityId:this.data.shi_id,
      districtId:this.data.qu_id,
      linkMan:this.data.name,
      mobile:this.data.tel,
      address:this.data.xiangxi,
      isDefault:this.data.set_moren,
      token:wx.getStorageSync('token')
    }).then((res) => {
      console.log(res)
      if(res.code == 0){
        wx.navigateTo({
          url: './../addres',
        })
      }else{
        Dialog.alert({
          message: res.msg,
        }).then(() => {
          // on close
        });
      }
    })
  },
  del(){
    WXAPI.del_dizhi({
      id:this.data.list.id,
      token:wx.getStorageSync('token')
    }).then((res) => {
      console.log(res)
      if(res.code == 0){
        Dialog.alert({
          message: '删除成功',
        }).then(() => {
          // on close
        });
        setTimeout(() => {
          wx.navigateTo({
            url: './../addres',
          })
        }, 1000);
      }else{
        Dialog.alert({
          message: res.msg,
        }).then(() => {
          // on close
        });
      }
    })
  }
})