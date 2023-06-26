// pages/addRecording.js
import Toast from '@vant/weapp/toast/toast';


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
    // infos.doc(this.id).update
    // 获取要更新的文档的 _id（假设为 docId）
    const docId = this.data.id;
    if(formData.name){
      // 使用 get() 方法获取文档数据
      infos.doc(docId).get().then(res => {
        const docData = res.data;
        console.log(docData)
        const meals = this.data.type;
        docData.meals[meals].push(formData.name);
        // 使用 update() 方法更新文档数据
        infos.doc(docId).update({
          data: {
            meals: docData.meals
          }
        }).then(updateRes => {
          console.log('文档更新成功', updateRes);
          Toast('添加成功~可继续添加');
          this.setData({
            value : ""
          })
        }).catch(updateErr => {
          console.error('文档更新失败', updateErr);
        });
      }).catch(err => {
        console.error('获取文档数据失败', err);
      });
    }else{
      Toast('输入食品名字的为空~');
    }
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
      type : options.type,
      id : options.id
    })
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