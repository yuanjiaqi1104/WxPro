var postsData = require("../../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false,
    postDatas:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.setData({
      currentPostId: postId
    })
    var postData = postsData.postList[postId];
    this.setData(postData);
    this.setData({
      postDatas: postData
    })


    // 获取收藏缓存
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected) {
      // 读取相应文章缓存状态
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }

    }
    else {

      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);

    }

  },

  onColletionTap: function (event) {
    this.getPostCollectedAsy();
  },
  //异步
  getPostCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        // 点击触发文章状态取反
        postCollected = !postCollected;
        // 重新修改当前文章状态
        postsCollected[that.data.currentPostId] = postCollected;
        // 重新修改所有文章收藏状态
        that.showToast(postsCollected, postCollected);
      }

    })
  },

  // 同步
  getPostCollectedSyc: function () {
    var that = this;
    // 获取所有文章收藏状态
    var postsCollected = wx.getStorageSync("posts_collected");
    // 获取当前文章的状态
    var postCollected = postsCollected[that.data.currentPostId];
    // 点击触发文章状态取反
    postCollected = !postCollected;
    // 重新修改当前文章状态
    postsCollected[that.data.currentPostId] = postCollected;
    // 重新修改所有文章收藏状态
    that.showToast(postsCollected, postCollected);
  },


  showToast: function (postsCollected, postCollected) {
    var that = this;
    wx.setStorageSync("posts_collected", postsCollected);
    // 更新数据绑定变量改变收藏状态
    that.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  // showModal: function (postsCollected, postCollected) {
  //   var that = this;
  //   wx.showModal({
  //     title: "收藏",
  //     content: postCollected ? "添加收藏吗?":"取消收藏吗?",
  //     showCancel: "true",
  //     cancelText: "取消",
  //     cancelColor: "#333",
  //     confirmText: "确定",
  //     confirmColor: "#405f80",
  //     success: function (res) {
  //       if (res.confirm) {
  //         wx.setStorageSync("posts_collected", postsCollected);
  //         // 更新数据绑定变量改变收藏状态
  //         that.setData({
  //           collected: postCollected
  //         });
  //       }
  //     }
  //   })
  // }

  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405F80",
      success: function (res) {
        // res.cancel  用户是否点击取消
        //res.tapIndex 数组元素序号,从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '现在还无法实现分享功能',
        })
      }
    })
  },
  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic){
        wx.pauseBackgroundAudio();
        this.setData({
          isPlayingMusic:false
        });
    }else{
      wx.playBackgroundAudio({
        dataUrl: this.data.postDatas.music.dataUrl,
        title: this.data.postDatas.music.title,
        coverImgUrl: this.data.postDatas.music.coverImgUrl
      
      });
      this.setData({
        isPlayingMusic: true
      })
    }
   
  }
})