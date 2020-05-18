// pages/title/shopcar/shopcar.js
var apifm = require('./../../../utils/apifm')
const WXAPI = require('apifm-wxapi')
var app = getApp()
WXAPI.init('wula')

import Toast from './../../../miniprogram_npm/@vant/weapp/toast/toast.js'

Page({
  data: {
    user:null,
    token:wx.getStorageSync('token'),
    list:[],
    sum:0
  },
  
  onLoad: function (options) {
    // console.log(options)
    
    //判断是否登录并存储登录信息
    let User = wx.getStorageSync('token')
    if(User){
      this.setData({
        user:true
      })
      this.getlist()
      
    }else{
      this.setData({
        user:false
      })
    }
  },
  onShow:function(){
    this.getlist()
  },
  onReady:function(){
    this.getlist()
  },
  //登录授权弹框
  loginClick:function(e){
    // console.log(e)
    if(!e.detail.userInfo){
      console.log('取消')
    }else{
      var that = this;
      wx.login({
        fail(nores){
          console.log(nores)
        },
        //返回code值
        success(res){
          // console.log(res)
          //autoReg:true加参数会注册
          // WXAPI.login_wx(res.code).then((res) => {
          //   console.log(res)
          // })
          apifm.user_login({code:res.code,autoReg:true}).then((res) => {
            console.log(res)
            wx.setStorage({
                data: res.data.token,
                key:'token',
            })
            wx.setStorage({
              data: res.data.uid,
              key:'uid',
            })
            that.setData({
              user:true
            })
            that.getlist()
          })
        }
      })
    }
  },
  getlist(){
    var tk = wx.getStorageSync('token')
    apifm.shoplist({token:tk}).then((res) => {
      console.log(res.data)
      if(res.data){
        var sum = 0;
        var s = 0;
        res.data.items.forEach((item) => {
          sum += item.price*item.number
          s += item.number
        })
        this.setData({
          list:res.data.items,
          sum:sum
        })
        wx.setTabBarBadge({
          index: 2,
          text:""+s+"",
        })
      }else{
        this.setData({
          list:[],
          sum:0
        })
      }
      
    })
  },
  //删除
  del(e){
    // console.log(e.currentTarget.dataset.key)
    apifm.del_shop({key:e.currentTarget.dataset.key,token:this.data.token})
    .then((res) => {
      console.log(res)
      if(res.code == 0){
        var sum = 0;
        res.data.items.forEach((item) => {
          sum += item.price*item.number
        })
        this.setData({
          list:res.data.items,
          sum:sum
        })
      }else
      if(res.code == 700){
        this.setData({
          list:[]
        })
        wx.removeTabBarBadge({
          index: 2,
        })
      }
    })
  },
  set_sum(e){
    // console.log(e.currentTarget.dataset.key)
    var s = e.currentTarget.dataset.s
    if(e.currentTarget.dataset.i == 'jia'){
      s+=1
    }else{
      if(s <= 1){
        Toast('不能再减了')
      }else{
        s-=1
      }
    }
    // console.log(s)
    apifm.set_shopsum({
      key:e.currentTarget.dataset.k,
      number:s,
      token:this.data.token
    }).then((res) => {
      // console.log(res)
      var sum = 0;
      var s = 0;
      res.data.items.forEach((item) => {
        sum += item.price*item.number;
        s += item.number
      })
      this.setData({
        list:res.data.items,
        sum:sum
      })
      wx.setTabBarBadge({
        index: 2,
        text:""+s+"",
      })
    })
  },
  //提交订单
  onClickButton(){
    wx.navigateTo({
      url: './ding/ding',
    })
  }
})