const app = getApp()
module.exports = (url,data,method='get',header={}) => {
  //加载前的loading
  wx.showLoading({
    title: 'loading...',
    mask:true
  })

  return new Promise((resolve,reject)=>{
    wx.request({
      url: app.globalData.apiBase + url,
      data,
      header,
      method,
      dataType:'json',
      success:resolve,
      fail:reject,
      complete:wx.hideLoading
    })
  })
}

