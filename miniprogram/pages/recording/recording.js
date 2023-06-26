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
    infoObject:{},
    isDateNull:"44"
  },

  onClose(event) {
    console.log(this.data)
    const time = this.data.date;
    const { instance,name } = event.detail;
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          infos.where({
            date: time
          }).get().then(res => {
            const docData = res.data[0];
            console.log(docData)
            const arr = name.split(",");
            console.log(arr[0],arr[1]);
            const meals = arr[0];
            const valueToRemove = arr[1];
            const index = docData.meals[meals].indexOf(valueToRemove);

            if (index > -1) {
              docData.meals[meals].splice(index, 1);
            }

            console.log(docData._id,docData.meals);
            const docId = docData._id;
            // 使用 update() 方法更新文档数据
            infos.doc(docId).update({
              data: {
                meals: docData.meals
              }
            }).then(updateRes => {
              console.log('文档更新成功', updateRes);
              that.selectInfo(time)
            }).catch(updateErr => {
              console.error('文档更新失败', updateErr);
            });
          }).catch(err => {
            console.error('获取文档数据失败', err);
          });
          instance.close();
        } else if (res.cancel) {
          console.log('用户点击取消',name,time)
          instance.close();
        }
      }
    })
  },
  


  addInfo(){
    const time = this.data.date;
    const docData = {
      date: time,
      meals: {
        breakfast: ["燕麦粥", "水果沙拉"],
        lunch: ["烤鸡肉", "蒸蔬菜", "糙米饭"],
        dinner: ["三文鱼", "藜麦", "烤西兰花"],
        snack: ["希腊酸奶", "混合坚果"]
      },
      exercise: ["跑步", "瑜伽"],
      username: "john_doe"
    };
    
    // 使用 add() 方法向集合中添加文档
    infos.add({
      data: docData
    }).then(res => {
      console.log('文档添加成功', res);
    }).catch(err => {
      console.error('文档添加失败', err);
    });
  },

  selectInfo(date){
    console.log(date)
    infos.where({
      date:date
    }).get().then(res => {
      console.log(res);
      console.log(res.data.length);
      this.setData({
        infoObject : res.data,
        isDateNull : res.data.length
      });
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


  addIsNullInfo(time){
    const that = this;
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
        const infoObject = {
          infoData: [
            {
              meals: {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
              },
              exercise: [],
              username: ""
            }
          ]
        };


        that.setData({
          infoObject : infoObject
        });

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

  onConfirm(event) {
    const that = this;
    this.setData({
      date: this.formatDate(event.detail),
      showDate: false
    });
    console.log(this.formatDate(event.detail))
    this.addIsNullInfo(this.formatDate(event.detail))
    this.selectInfo(this.formatDate(event.detail))
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },


  jiacan(){
    wx.navigateTo({
      url:'/pages/addRecording/addRecording?type=snack&id='+this.data.infoObject[0]._id
    })
  },

  wancan(){
    wx.navigateTo({
      url:'/pages/addRecording/addRecording?type=lunch&id='+this.data.infoObject[0]._id
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      date: this.formatDate(new Date()),
    });
    this.selectInfo(this.formatDate(new Date()));
    console.log('生命周期函数--监听页面加载')
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
    this.setData({
      date: this.formatDate(new Date()),
    });
    this.selectInfo(this.formatDate(new Date()));
    console.log('监听页面显示');
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