// pages/owner.js
import Dialog from '@vant/weapp/dialog/dialog';
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: "",
    name: "",
    introduction: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.oldurl + 'login',
      data: {
        user_id: app.globalData.openid
      },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        // console.log(result.data),
        this.setData({
          point: result.data.data.point,
          name: result.data.data.user_name,
          introduction: result.data.data.introduction,
        })

      },
      fail: () => { console.log("后端登录  error") },
      complete: () => { }
    });

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

  },
  registerBtn: function () {
    wx.navigateTo({
      url: '/pages/register/register',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  pointsBtn: function () {
    Dialog.alert({
      title: '恭喜您',
      message: '您现在的积分为  ' + this.data.point,
      theme: 'round-button',
    }).then(() => {
      // on close
    });

  },
  giftBtn: function () {
    wx.navigateTo({
      url: '/pages/show_gift/show_gift',
    })
  },
  aboutBtn: function () {
    console.log("aboutBtn")
  },
  helpBtn: function () {
      wx.navigateTo({
        url: '/pages/my/feedback/feedback',
      })
  },
  protocolBtn: function () {
    console.log("protocolBtn")
  },
  changeInfoBtn: function () {
    console.log("changeInfoBtn")
  },
})