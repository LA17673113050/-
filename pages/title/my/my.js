// pages/title/my/my.js
const WXAPI = require('./../../../utils/apifm')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    token:wx.getStorageSync('token'),
    user_price:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '会员中心',
    })
    //获取用户头像和用户名
    wx.getUserInfo({
      success: (res) => {
        // console.log(res)
        this.setData({
          userInfo:res.userInfo
        })
      },
    })
    if(!this.data.token){
      alert('您还未登录')
    }else{
      WXAPI.user_price({token:this.data.token}).then((res) => {
        console.log(res)
        this.setData({
          user_price:res.data
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})