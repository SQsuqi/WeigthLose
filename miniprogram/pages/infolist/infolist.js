// pages/infolist/infolist.js
const db = wx.cloud.database();
const infos = db.collection('info');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoObject : ""
  },

  selectInfo(){
    infos.get().then(res => {
      console.log(res);
      this.setData({
        infoObject : res.data,
      })
    })
  },
  handleButtonClick(event) {
    const id = event.currentTarget.dataset.index;

    // 在这里可以根据索引执行相应的操作
    console.log("点击了第", id, "行的按钮");
    infos.doc(id).remove({
      success: function(res) {
        console.log(res.data)
        const infoObject = this.data.infoObject;
        const index = infoObject.findIndex(item => item.id === id); // 查找要删除数据的索引
        console.log("点击了第", index, "行的按钮");
        if (index !== -1) {
          infoObject.splice(index, 1); // 删除对应索引的数据
          this.setData({
            infoObject: infoObject
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.selectInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.selectInfo()
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