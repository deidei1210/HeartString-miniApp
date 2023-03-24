// pages/personal/personal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        profilePhoto:"/assets/Personalicon.png",//头像
        Nico:"Jack",       //昵称
        Record:"187",      //打卡天数
        Moodavg:"20.5",    //心情平均值
        GuestView:"201",    //浏览量
        BarIcon:[{path:"/assets/freindIcon.png",
                  name:"我的好友"},
                  {path:"/assets/ChatIcon.png",
                  name:"好友关心"},
                {path:"/assets/musicIcon.png",
                 name:"收藏音乐"}],
        Diary:[
            {
                path:"/assets/SongCover_1.png",
                name:"花开了，花落了......"

            },
            {
                path:"/assets/SongCover_4.png",
                name:"如果未来有阳光......"
            },
            {
                path:"/assets/SongCover_7.png",
                name:"有些人一错过就是一辈子......"
            },
            {
                path:"/assets/SongCover_6.png",
                name:"谢谢每一个在我的生命中出现的人"
            }
        ]
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
    // 页面跳转
    PageToMy:function(e){
        wx.navigateTo({
          url: '/pages/my/my'
        })
    }
})