// pages/recording/recording.js
const db = wx.cloud.database();
const infos = db.collection('info');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    //弹出层
    showDate:false,
    minDate: new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
    maxDate: new Date().getTime(),
    infoObject:{}
  },

  selectInfo(date){
    console.log(date)
    infos.where({
      date:date
    }).get().then(res => {
      console.log(res);
      this.setData({
        infoObject : res.data,
      })
    })
  },


  onDisplay() {
    this.setData({ showDate: true });
  },

  onCloseDate() {
    this.setData({ showDate: false });
  },

  formatDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  onConfirm(event) {
    this.setData({
      date: this.formatDate(event.detail),
    });
    console.log(this.formatDate(event.detail))
    this.selectInfo(this.formatDate(event.detail))

  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },


  jiacan(){
    wx.navigateTo({
      url:'/pages/addRecording/addRecording?type=snack&id='+this.date
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   console.log(options)
    this.setData({
      date: this.formatDate(new Date()),
    });
   this.selectInfo(this.formatDate(new Date()))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('生命周期函数--监听页面初次渲染完成')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})