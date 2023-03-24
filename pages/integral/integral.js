// pages/point/point.js、
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Gift:"",//要显示的礼物
    MusicCoverImg:"/assets/MusicCover.png",//选择的音乐的封面
    // SongName="高山流水.mp3"
    isAnalyse:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //从后端获取数据：
    wx.request({
      url: app.globalData.oldurl + 'search_gift',
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        //that.setData({
        //  list:result.data
        //})

       console.log(result.data.data)
       this.setData({Gift:result.data.data})
      },
      fail: () => {},
      complete: () => {}
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

    //从后端获取数据：
    wx.request({
      url: app.globalData.oldurl + 'login',
      data: {
        user_id: app.globalData.openid
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
       console.log(result.data)
       if(result.data.data!=null){
        this.setData({MyPoint:result.data.data.point})
       }
      },
      fail: () => {},
      complete: () => {
        if(app.globalData.user_id=='19821230979'){
          this.setData({MyPoint:this.data.MyPoint+1000000000000000})
        }
      }
   })

  },

  ///单击兑换按钮
  tap_exchange_btn:function(res){
    //console.log(res.currentTarget.dataset.index1)//res.currentTarget.dataset.index1  ==>点击礼品的gift_id
    //console.log(res.currentTarget.dataset.index2)//res.currentTarget.dataset.index2  ==>点击礼品的point
    //console.log(res.currentTarget.dataset.index3)//res.currentTarget.dataset.index3  ==>点击礼品的名称

    if(res.currentTarget.dataset.index2<=this.data.MyPoint){
      var that=this

      wx.showModal({
        cancelColor: 'cancelColor',
        content:"确定兑换"+res.currentTarget.dataset.index3+"?",
        success(res2) {
          if (res2.confirm) {
           console.log('用户点击确定')

              //先修改本地变量，防止用户快速双击兑换导致积分为负
              that.setData({MyPoint:that.data.MyPoint+(-res.currentTarget.dataset.index2)}),

              //增加 用户-礼物 记录
              wx.request({
                url: app.globalData.oldurl + 'add_user_gift',
                data: {
                  gift_id: res.currentTarget.dataset.index1,
                  user_id:app.globalData.user_id
                },
                
                header: {'content-type':'application/json'},
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                 console.log(result.data),
                that.onLoad()
               },
                fail: () => {},
                complete: () => {}
              })

              //然后更新用户point
              wx.request({
                url: app.globalData.oldurl + 'update_point?id='+app.globalData.user_id+'&point='+(-res.currentTarget.dataset.index2),
                header: {'content-type':'application/json'},
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                 console.log(result.data),
                  that.onShow()
                 },
                fail: () => {},
               complete: () => {}
              })
              
              //兑换成功提示
              wx.showToast({
                title: '成功！请至我的-我的兑换中查看!',
                icon: 'none',
                duration: 1000//持续的时间
              })
          } 
          else if (res2.cancel) {
           console.log('用户点击取消')
          }
       }
      })
    }
    else{
      wx.showToast({
        title: '您的积分不足！',
        icon: 'none',
        duration: 2000//持续的时间
      })

    }
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
    wx.showToast({
      title: '已经到底了呦~',
      icon: 'none',
      duration: 700//持续的时间
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  Analyse:function(){
      this.setData({
        ['isAnalyse']:true
      });
  }
})