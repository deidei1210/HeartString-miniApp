// pages/learn.js
import Toast from '@vant/weapp/toast/toast';
let app = getApp();
Page({
  data: {
    user_id: "",
    user_name: "",
    phone_Number: "",
    open_id: "",
    username:"",
    studentnumber:"",
    radio:'0',
    registerBtn:'1'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  personal:function()
  {
    wx.navigateTo({
      url: '/pages/protocol/protocol',
      success: (result) => {},
      fail: (res) => {console.log(res)},
      complete: (res) => {},
    })
  },
  onChange(event) {
    var that=this
    if(this.data.radio==1){
      this.setData({
      radio: '0',
      registerBtn:1
    });
    }
    else {
      that.setData({
      radio: '1', 
      registerBtn:0
    });
    }
  }, goStatement() {
    wx.navigateTo({
      url: '/pages/statement/statement',
    })
  },
  getPhoneData: function (e) {
    if(this.data.radio!=1)
    {
       Toast("请阅读并同意下方的协议，然后完成注册")
    }
    else{

    //获取电话号码的密文   iv
    //console.log("===================register"),
    // console.log(e)
    //console.log(app.globalData.session_key),
    wx.request({
      url: app.globalData.oldurl+'wx',
      data: {
        'content': e.detail.encryptedData,
        'aesKey': app.globalData.session_key,
        'iv': e.detail.iv
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {

        this.setData({
          phone_Number: result.data.phoneNumber
        })
        //console.log(result.data.phoneNumber)
      },
      fail: () => { console.log("get phone error") },
      complete: () => { }
    });
    //获取unionid
    wx.getUserInfo({
      withCredentials: 'false',
      lang: 'zh_CN',
      timeout: 10000,
      success: (result) => {
        wx.request({
          url: app.globalData.oldurl+'wx',
          data: {
            'content': result.encryptedData,
            'aesKey': app.globalData.session_key,
            'iv': result.iv
          },
          header: { 'content-type': 'application/json' },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            //var d = JSON.stringify(result)
            this.setData({
              open_id: result.data.openId
            })
            console.log(this.data.open_id)
            //后端注册
            wx.request({
              //url: 'http://3007h50y18.qicp.vip/register',
              url: app.globalData.oldurl+'register',
              data: {
                user_number: this.data.user_id,
                user_name: this.data.user_name,
                open_id: this.data.open_id,
                user_id:this.data.phone_Number
              },
              header: { 'content-type': 'application/json' },
              method: 'POST',
              dataType: 'json',
              responseType: 'text',
              success: (result) => {
                console.log(result.data)
                if(result.data.state)
                {
                  Toast.success(result.data.msg);
                }
                else{
                  Toast.fail(result.data.msg);
                }
              },
              fail: () => {
                console.log("error")
              },
              complete: () => {
                console.log("complete")
              }
            });
          },
          fail: () => { console.log("get phone error") },
          complete: () => { }
        });
      },
      fail: () => { },
      complete: () => { }
    });


  
    }
  
  },
  // register: function () {
  //   console.log("globalData.is_register==========="+app.globalData.is_register)
  //   console.log("click register"),
  //     wx.request({
  //       //url: 'http://3007h50y18.qicp.vip/register',
  //       url:'http://127.0.0.1:4863/register',
  //       data: {
  //         user_id: this.data.user_id,
  //         user_name: this.data.user_name,
  //         user_introduction: this.data.user_introduction
  //       },
  //       header: { 'content-type': 'application/json' },
  //       method: 'POST',
  //       dataType: 'json',
  //       responseType: 'text',
  //       success: (result) => {
  //         console.log(result.data),
  //           this.setData({
  //             return_msg: result.data.msg
  //           })

  //         if (result.data.state) {
  //           wx.showToast({
  //             title: this.data.return_msg,
  //           })
  //         } else {
  //           wx.showToast({
  //             title: this.data.return_msg,
  //           })
  //         }
  //       },
  //       fail: () => {
  //         console.log("error")
  //       },
  //       complete: () => {
  //         console.log("complete")
  //       }
  //     });
  // },
  // getphone:function(e)
  // {
  //    console.log('iv'+e.detail.iv),
  //    console.log('encryptedData'+e.detail.encryptedData) ,
  //    wx.login({
  //      timeout:10000,
  //      success: (result) => {
  //       // console.log('logincode111111111'+result.code),
  //        this.setData({
  //          login_code:result.code
  //        }),
  //        wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9d880530b072f0fa&secret=1ba3e28a7b644031482688fcc3c27a5e&js_code='+this.data.login_code+'&grant_type=authorization_code',
  //         header: {'content-type':'application/json'},
  //         method: 'GET',
  //         dataType: 'json',
  //         responseType: 'text',
  //         success: (result) => {
  //           console.log('session_key'+result.data.session_key)
  //           var d=JSON.stringify(result.data)
  //           //console.log(d)
  //         },
  //         fail: () => {},
  //         complete: () => {}
  //       });
  //      },
  //      fail: () => {},
  //      complete: () => {}
  //    });

  // }
})