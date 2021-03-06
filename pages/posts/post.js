var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postKey: postsData.postList
    })
  },
  // 内容列表点击
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },

  // 轮播点击
  onSwiperTap: function (event){
      var postId = event.target.dataset.postid;
      wx.navigateTo({
        url: 'post-detail/post-detail?id=' + postId
      })
   }
})