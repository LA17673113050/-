// pages/title/classify/classify.js
const WXAPI = require('./../../../utils/apifm')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left_list:[],
    right_list:[],
    check:0,
    isshow:true,
    inp:''
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分类',
    })
    WXAPI.classify({}).then((res) => {
      // console.log(res)
      this.setData({
        left_list:res.data
      })
      // console.log(this.data.left_list)
    })
    WXAPI.shoplist_c({categoryId:122739}).then((res) => {
      console.log(res.data)
      this.setData({
        right_list:res.data
      })
    })
  },
  active(e){
    this.setData({
      check:e.currentTarget.dataset.i
    })
    // console.log(e.currentTarget.dataset.id)
    WXAPI.shoplist_c({categoryId:e.currentTarget.dataset.id}).then((res) => {
      console.log(res)
      this.setData({
        right_list:res.data
      })
      if(res.code == 700){
        this.setData({
          isshow:false
        })
      }else{
        this.setData({
          isshow:true
        })
      }
    })
  },
  sousuo(e){
    // console.log(e.detail.value)
    this.setData({
      inp:e.detail.value
    })
  },
  // 用来监听手机键盘上的搜索按钮---bindconfirm
  search(){
    wx.navigateTo({
      url: './search/search?index='+this.data.inp,
    })
  } ,
  xiangqing(e){
    // console.log(e.currentTarget.dataset.val)
    wx.navigateTo({
      url: './xiang/xiang?id='+e.currentTarget.dataset.val.id,
    })
  }
})