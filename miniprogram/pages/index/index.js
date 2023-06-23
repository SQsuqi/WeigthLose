const db = wx.cloud.database();
const infos = db.collection('info');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoObject : ""
  },

  
  formSubmit: function (e) {
    var formData = e.detail.value;
    // 这里可以对表单数据进行处理或提交到服务器
    console.log(formData);
    if(formData.date != ""){
      infos.add({
        data:formData
      }).then(res => {
        console.log(res);
        this.getInfo();
      })
    }
    
  },
  selectInfo(){
    infos.get().then(res => {
      console.log(res);
      this.setData({
        infoObject : res.data,
      })
    })
  },
  
  getInfo() {
    wx.navigateTo({
      url:'/pages/infolist/infolist'
    })
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
    
  }
})