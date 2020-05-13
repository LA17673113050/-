// pages/title/classify/xiang/xiang.js
var WXAIP = require('./../../../../utils/apifm')
import Toast from './../../../../miniprogram_npm/@vant/weapp/toast/toast.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    cont:null,
    shop_sum:null, //购物车数量
    id:null,
    Token:wx.getStorageSync('token'),
    check:0,
    show: false,//底部弹出层,
    show1:false, //小程序码遮罩层
    sum:1, //商品数量,
    unlimit_img:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    WXAIP.shop_xiang({id:options.id}).then((res) => {
      console.log(res.data)
      var str = res.data.content
      str.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ');
      this.setData({
        list:res.data,
        cont:str,
      })
    })
    WXAIP.SC_if({goodsId:this.data.id,token:this.data.Token}).then((res) => {
      // console.log(res)
      if(res.code == -1){
        this.setData({
          check:0
        })
      }else
      if(res.code == 0){
        this.setData({
          check:1
        })
      }
    })
  },
  go_shoplist(){
    wx.switchTab({
      url: './../../shopcar/shopcar',
    })
  },
  SC_wula(){
    WXAIP.SC_if({goodsId:this.data.id,token:this.data.Token}).then((res) => {
      console.log(res)
      if(res.code == -1){
        //收藏
        WXAIP.SC_yes({goodsId:this.data.id,token:this.data.Token}).then((res) => {
          // console.log(res)
          this.setData({
            check:1
          })
        })
        // Toast('收藏成功');
        Toast.success('收藏成功');
      }else
      if(res.code == 0){
        //取消收藏
        WXAIP.SC_no({goodsId:this.data.id,token:this.data.Token}).then((res) => {
          // console.log(res)
          this.setData({
            check:0
          })
        })
        // Toast('已取消收藏');
        Toast.success('已取消收藏');
      }else{
        console.log('未知')
      }
      // console.log(this.data.check)
    })
  },
  //底部弹出层
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  jia(){
    this.setData({sum:this.data.sum+1})
  },
  jian(){
    if(this.data.sum <= 1){
      Toast('不能再减了~')
    }else{
      this.setData({sum:this.data.sum-1})
    }
  },
  add_shop(){
    var tok = wx.getStorageSync('token')
    WXAIP.add_shop({
      goodsId:this.data.id,
      number:this.data.sum,
      sku:'',
      token:tok
    }).then((res) => {
      // console.log(res)
      if(res.code == 0){
        this.setData({ show: false });
        Toast.success('添加至购物车')
      }else{
        this.setData({ show: false });
        Toast.file(res.msg)
      }
    })
  },
  onClickHide() {
    this.setData({ show1: false });
  },
  // 分享小程序码
  fenxiang2(){
    this.setData({ show1: true });

    var uid = wx.getStorageSync('uid')
    if(!uid){
      Toast.file('您还未登录')
    }else{
      WXAIP.unlimit({
        token:wx.getStorageSync('token'),
        scene:wx.getStorageSync('uid'),
        expireHours:1
      }).then((res) => {
        console.log(res)
        this.setData({
          unlimit_img:res.data
        })
      })
    }
  }
})