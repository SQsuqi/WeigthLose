// pages/recordings/recordings.js
const db = wx.cloud.database();
const infos = db.collection('info');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  addInfo(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const time = `${year}-${month}-${day}`;
    console.log(time)
    infos.where({
      date:time
    }).get().then(res => {
      console.log(res.data.length);
      if(res.data.length == 0){
        const docData = {
          date: time,
          meals: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: []
          },
          exercise: [],
          username: ""
        };
      
        // 使用 add() 方法向集合中添加文档
        infos.add({
          data: docData
        }).then(res => {
          console.log('文档添加成功', res);
        }).catch(err => {
          console.error('文档添加失败', err);
        });
      }
    })
  },

  canshi(){
    this.addInfo();
    wx.navigateTo({
      url:'/pages/recording/recording'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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