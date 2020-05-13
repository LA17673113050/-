// pages/title/home/home.js
const Http = require('./../../../utils/request')
const WXAPI = require('./../../../utils/apifm')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:[], //轮播图数据
    category:[], //九宫格数据
    shoplist:[], //商品数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '天使童装',
    })
    Http('/banner/list')
    .then((res) => {
      // console.log(res)
      var list = res.data.data
      var swp =  [];
      list.map((item,index) => {
        if(index == 3 || index == 4 || index== 5){
          swp.push(item)
        }
      })
      // console.log(swp)
      this.setData({
        swiper:swp
      })
    })
    Http('/shop/goods/category/all')
    .then((res) => {
      this.setData({
        category:res.data.data
      })
      // console.log(this.data.category)
    })
    WXAPI.banner({}).then((res) => {
      // console.log(res)
    })
    WXAPI.shoplist({}).then((res) => {
      this.setData({
        shoplist:res.data.reverse()
      })
      // console.log(this.data.shoplist)
    })
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