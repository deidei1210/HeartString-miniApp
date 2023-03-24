// pages/barometer/barometer.js
var wxCharts = require('../../utils/wxcharts.js')
var app = getApp()
var lineChart = null;
// 加载音乐对象
var srcurl="/music/YuZhouChangWan.mp3"
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textcolor1: '#014f8e',
    textcolor2: '#bfbfbf',
    max:100,
    SongCover:[{path:"/assets/SongCover_1.png",
                 name:"快乐，从仰望星空开始！"},
               {path:"/assets/SongCover_2.png",
                name:"那些一听就上瘾的快乐旋律......"},
               {path:"/assets/SongCover_3.png",
                name:"谢谢你成为我路上的指路明灯！"},
               {path:"/assets/SongCover_4.png",
                name:"生活不止眼前的苟且，还有诗和远方......"},
               {path:"/assets/SongCover_5.png",
                name:"夜空中最亮的星，你是否知道......"}],
    SoloCover:[
      {path:"/assets/SongCover_7.png",
       name:"渔舟唱晚",
       actor:"上海音乐学院",
       IsPlay:false},
       {path:"/assets/SongCover_6.png",
       name:"喜洋洋",
       actor:"上海交响乐团",
       IsPlay:false},
       {path:"/assets/SongCover_5.png",
       name:"紫竹调",
       actor:"上海音乐学院",
       IsPlay:false},
       {path:"/assets/SongCover_4.png",
       name:"明天会更好",
       actor:"上海音乐学院",
       IsPlay:false},
       {path:"/assets/SongCover_3.png",
       name:"昭君出塞",
       actor:"上海音乐学院",
       IsPlay:false},
       {path:"/assets/SongCover_2.png",
       name:"窦娥冤",
       actor:"上海音乐学院",
       IsPlay:false},
       {path:"/assets/SongCover_1.png",
       name:"水调歌头",
       actor:"上海音乐学院",
       IsPlay:false}
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var x_data = ["6.1","6.2","6.3","6.4","6.5","6.6","6.7"]
    var y_data = ["0","0","5","0","0","0","30"]
    this.data.max=Math.max.apply(null, y_data)+10
    //绘制折线图
    this.OnWxChart(x_data, y_data, '图表一')

    // 创建音乐播放对象
    innerAudioContext.autoplay = false
    innerAudioContext.src = srcurl
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
  OnWxChart: function (x_data, y_data, name) {
    var windowWidth = '',
      windowHeight = ''; //定义宽高
    try {
      var res = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690; //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 350 //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!'); //如果获取失败
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas', //输入wxml中canvas的id
      type: 'line',
      legend:false,
      categories: x_data, //模拟的x轴横坐标参数
      animation: true, //是否开启动画
      series: [{
        name: name,
        data: y_data,
        format: function (val, name) {
          return val + '分';
        }
      }],
      xAxis: { //是否隐藏x轴分割线
        disableGrid: true,
        fontColor:'#898c97'
      },
      yAxis: { //y轴数据
        title: '', //标题
        fontColor:'#ffffff',
        format: function (val) { //返回数值
          return val;
        },
        min: 0, //最小值
        max:this.data.max,
        gridColor: '#ffffff',
      },
      width: windowWidth, //图表展示内容宽度
      height: windowHeight, //图表展示内容高度
      dataLabel: true, //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'Broken' //曲线
      },
    });
  },
  playmp3: function(event) {
    // 播放路径
    this.IsPlay=this.IsPlay?false:true;
    console.log(this.IsPlay)
 
    if(this.IsPlay){
      console.log(1)
      innerAudioContext.onPlay(() => {
      console.log('开始播放')
      })
      innerAudioContext.play()
    }
    else{
      console.log(2)
      innerAudioContext.onStop(() => {
        console.log('暂停')
        })  
        innerAudioContext.pause()
    }
    },
    //播放
  play: function (e) {
    innerAudioContext.play();
    console.log(innerAudioContext.duration);
    console.log(e);
    console.log(e.currentTarget.dataset.num);
    var index=e.currentTarget.dataset.num
    // this.SoloCover[0].IsPlay=true
    let change="SoloCover["+index+"].IsPlay"
    this.setData({
      [change]:true
    });
  },
  // 停止
  stop: function (e) {
    innerAudioContext.pause();
    var index=e.currentTarget.dataset.num
    // this.SoloCover[0].IsPlay=false
    let change="SoloCover["+index+"].IsPlay"
    this.setData({
      [change]:false
    });
  },
  SearchSong:function(e){
    console.log("1")
    wx.navigateTo({
      url: '/pages/barometer/search/search'
    })
  }
})