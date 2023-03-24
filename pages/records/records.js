// pages/home/home.js

import Toast from '@vant/weapp/toast/toast';
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //心情标签，按下为1，未按下为0
        Happy: 0,
        excited: 0,
        sad: 0,
        angry: 0,
        miserable: 0,
        afraid: 0,
        worried: 0,
        depressed: 0,
        frustrated: 0,
        satisfied: 0,
        ecstatic: 0,
        hinttext: "请输入或选出最符合心情的标签"
    },

    //点击心情标签按钮事件函数  *10
    mood_happy: function() {
        if (!this.data.happy) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "快乐",
                    happy: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",快乐",
                    happy: 1
                })
            }
        }
    },
    mood_excited: function() {
        if (!this.data.excited) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "激动",
                    excited: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",激动",
                    excited: 1
                })
            }
        }
    },
    mood_sad: function() {
        if (!this.data.sad) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "难过",
                    sad: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",难过",
                    sad: 1
                })
            }
        }
    },
    mood_angry: function() {
        if (!this.data.angry) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "愤怒",
                    angry: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",愤怒",
                    angry: 1
                })
            }
        }
    },
    mood_miserable: function() {
        if (!this.data.miserable) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "痛苦",
                    miserable: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",痛苦",
                    miserable: 1
                })
            }
        }
    },
    mood_afraid: function() {
        if (!this.data.afraid) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "害怕",
                    afraid: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",害怕",
                    afraid: 1
                })
            }
        }
    },
    mood_worried: function() {
        if (!this.data.worried) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "忧愁",
                    worried: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",忧愁",
                    worried: 1
                })
            }
        }
    },
    mood_depressed: function() {
        if (!this.data.depressed) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "郁闷",
                    depressed: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",郁闷",
                    depressed: 1
                })
            }
        }
    },
    mood_frustrated: function() {
        if (!this.data.frustrated) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "失意",
                    frustrated: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",失意",
                    frustrated: 1
                })
            }
        }
    },
    mood_satisfied: function() {
        if (!this.data.satisfied) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "满足",
                    satisfied: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",满足",
                    satisfied: 1
                })
            }
        }
    },
    mood_ecstatic: function() {
        if (!this.data.ecstatic) {
            if (this.data.hinttext[0] == "请")
                this.setData({
                    hinttext: "狂喜",
                    ecstatic: 1
                })
            else {
                this.setData({
                    hinttext: this.data.hinttext + ",狂喜",
                    ecstatic: 1
                })
            }
        }
    },

    //点击提交按钮时间函数,若10个心情标签数据都为0，则提示用户提交失败
    savetag: function(res) {
       if(this.data.hinttext[0]=="请")  
       {
          Toast.fail("请至少选择一个心情")
       }   
       else{
        wx.request({
            url: app.globalData.oldurl+'add_record',
            data: {
              "user_id": app.globalData.user_id,
              "record_data": this.data.hinttext
            },
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                console.log(result.data)
                if(result.data.msg=="打卡信息上传成功")
                {
                  Toast.success("打卡成功，恭喜您已获得2积分");
                }
                else if(result.data.msg=="打卡信息更新成功"){
                  Toast.fail("更新成功，今日打卡积分已达上限");
                }
                else{
                  Toast.fail("打卡失败");
                }
            },
            fail: () => { },
            complete: () => { }
          });

       } 

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    haha: function() {
        console.log("11111111111")
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})