var API_BASE_URL = 'https://api.it120.cc'
var subDomain = 'wula'

const request = (url, needSubDomain, method, data) => {
  const _url = API_BASE_URL + (needSubDomain ? '/' + subDomain : '') + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  banner:(data) => {
    return request('/banner/list',true,'get',data)
  },
  shoplist_c:(data) => {
    return request('/shop/goods/list','true','post',data)
  },
  classify:(data) => {
    return request('/shop/goods/category/all',data)
  },
  shop_xiang:(data) => {
    return request('/shop/goods/detail','true','post',{id:data.id})
  },
  user_login:(data) => {
    return request('/user/wxapp/login','true','post',{code:data.code,type:2})
  },
  //查看是否收藏
  SC_if:(data) => {
    return request('/shop/goods/fav/check','true','get',data)
  },
  //收藏
  SC_yes:(data) => {
    return request('/shop/goods/fav/add','true','post',data)
  },
  //取消收藏
  SC_no:(data) => {
    return request('/shop/goods/fav/delete','true','post',data)
  },
  //加入购物车
  add_shop:(data) => {
    return request('/shopping-cart/add','true','post',data)
  },
  //生成小程序码
  unlimit:(data) => {
    return request('/qrcode/wxa/unlimit','true','post',data)
  },
  //获取购物车数据
  shoplist:(data) => {
    return request('/shopping-cart/info','true','get',data)
  },
  //删除购物车中某条数据
  del_shop:(data) => {
    return request('/shopping-cart/remove','true','post',data)
  },
  //修改购物车中商品数量
  set_shopsum:(data) => {
    return request('/shopping-cart/modifyNumber','true','post',data)
  },

}