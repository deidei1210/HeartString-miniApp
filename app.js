// app.js
App({

  data:{
    login_code: "",
    session_key: "",
    encryptedData: "",
    iv: "",
    openid: ""
  },
  onLaunch() {
    // 展示本地存储能力
    var that = this
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // var users = {
    //   "user_id": "501215605"
    // }
    // var user = JSON.stringify(users)
    //登录获得logincode
    wx.login({
      timeout: 1000,
      success: (result) => {
        //console.log('logincode       ' + result.code),
          that.data.login_code = result.code,
          //session id
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9d880530b072f0fa&secret=1ba3e28a7b644031482688fcc3c27a5e&js_code=' + that.data.login_code + '&grant_type=authorization_code',
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              //console.log('session_key     ' + result.data.session_key)
              that.data.session_key = result.data.session_key,
              this.globalData.session_key=result.data.session_key,
              //get unionid
              wx.getUserInfo({
                withCredentials: 'false',
                lang: 'zh_CN',
                timeout: 1000,
                success: (result) => {
                  //var d = JSON.stringify(result.encryptedData)
                  that.data.encryptedData = result.encryptedData,
                    that.data.iv = result.iv,
                   // console.log("encryptedData         " + that.data.encryptedData),
                    //console.log("iv         " + that.data.iv)
                  //解密
                  wx.request({
                    url: this.globalData.oldurl+'wx',
                    data: {
                      'content': that.data.encryptedData,
                      'aesKey': that.data.session_key,
                      'iv': that.data.iv
                    },
                    header: { 'content-type': 'application/json' },
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: (result) => {
                      //var d = JSON.stringify(result.data)
                      //jiu  nm lipu 
                      that.data.openid = result.data.openId,
                      this.globalData.openid=result.data.openId,
                       // console.log(result.data.openId),
                        wx.request({
                          url: this.globalData.oldurl+'login',
                          data: {
                            user_id: that.data.openid
                          },
                          header: { 'content-type': 'application/json' },
                          method: 'POST',
                          dataType: 'json',
                          responseType: 'text',
                          success: (result) => {
                           console.log(result.data)
                           this.globalData.user_id=result.data.data.user_id,
                           this.globalData.point=result.data.data.point
                          },
                          fail: () => { console.log("后端登录  error") },
                          complete: () => { }
                        });

                    },
                    fail: () => { console.log("解密  error") },
                    complete: () => { }
                  });

                },
                fail: () => { console.log("getuserinfo  error") },
                complete: () => { }
              });


            },
            fail: () => { console.log("sessionid  error") },
            complete: () => { }
          });
      },
      fail: () => { console.log("login_code  error") },
      complete: () => { }
    });
  },
  globalData: {
    global: "hello",
    is_register: false,
    user_id:"",
    session_key:"",
    openid:"",
    point:0,
    oldurl1:"http://127.0.0.1:4863/",
    oldurl:"http://3007h50y18.qicp.vip/",
    }
})
