// pages/title/classify/search/search.js
const WXAPI = require('./../../../../utils/apifm')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_list:[],
    check:0,
    xuanze:['综合','新品','销量','价格']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.index)
    WXAPI.shoplist({nameLike:options.index}).then((res) => {
      console.log(res.data)
      this.setData({
        search_list:res.data
      })
    })
  },
  checked(e){
    this.setData({
      check:e.currentTarget.dataset.i
    })
  }
})