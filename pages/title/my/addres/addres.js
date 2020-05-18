// pages/title/my/addres/addres.js
let WXAPI = require('./../../../../utils/apifm')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  onLoad:function(){
    this.getlist()
  },
  getlist(){
    WXAPI.get_dizhi({token:wx.getStorageSync('token')}).then((res) => {
      console.log(res)
      this.setData({
        list:res.data
      })
    })
  },
  xiugai(e){
    // console.log(e.currentTarget.dataset.val)
    wx.navigateTo({
      url: './set_addres/set_addres?id='+e.currentTarget.dataset.val,
    })
  }
})