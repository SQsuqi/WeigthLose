// pages/addRecording.js
const db = wx.cloud.database();
const infos = db.collection('info');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    type:'',
    id: ''
  },

  formSubmit: function (e) {
    var formData = e.detail.value;
    // 这里可以对表单数据进行处理或提交到服务器
    console.log(formData);
    infos.doc(this.id).update({
      data: {
        snack:"11"
      }
    }).then(res => {
      console.log('数据更新成功', res);
    }).catch(err => {
      console.error('数据更新失败', err);
    });
  },


  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type : options.type
    })
    console.log(options.id); // 输出 jiacan
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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