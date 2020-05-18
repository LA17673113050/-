// pages/title/shopcar/ding/ding.js
let WXAPI = require('./../../../../utils/apifm')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
  },
  getlist(){
    WXAPI.shoplist({token:wx.getStorageSync('token')}).then((res) => {
      console.log(res.data.items)
      this.setData({
        list:res.data.items
      })
    })
  }
})