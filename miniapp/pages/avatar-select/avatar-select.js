Page({
  data: {
    coachId: null,
    coachName: '',
    selectedAvatar: '',
    avatarList: [
      {
        id: 1,
        name: '专业教练',
        url: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=教练'
      },
      {
        id: 2,
        name: '健身达人',
        url: 'https://via.placeholder.com/120x120/FF9800/FFFFFF?text=健身'
      },
      {
        id: 3,
        name: '运动专家',
        url: 'https://via.placeholder.com/120x120/2196F3/FFFFFF?text=运动'
      },
      {
        id: 4,
        name: '训练师',
        url: 'https://via.placeholder.com/120x120/9C27B0/FFFFFF?text=训练'
      },
      {
        id: 5,
        name: '瑜伽教练',
        url: 'https://via.placeholder.com/120x120/FF5722/FFFFFF?text=瑜伽'
      },
      {
        id: 6,
        name: '跑步教练',
        url: 'https://via.placeholder.com/120x120/795548/FFFFFF?text=跑步'
      },
      {
        id: 7,
        name: '力量教练',
        url: 'https://via.placeholder.com/120x120/607D8B/FFFFFF?text=力量'
      },
      {
        id: 8,
        name: '体能教练',
        url: 'https://via.placeholder.com/120x120/3F51B5/FFFFFF?text=体能'
      },
      {
        id: 9,
        name: '康复教练',
        url: 'https://via.placeholder.com/120x120/E91E63/FFFFFF?text=康复'
      }
    ]
  },

  onLoad(options) {
    const coachId = options.id;
    const coachName = options.name || '教练';

    this.setData({
      coachId: coachId,
      coachName: coachName
    });
  },

  onSelectAvatar(e) {
    const avatarUrl = e.currentTarget.dataset.url;
    this.setData({
      selectedAvatar: avatarUrl
    });
  },

  onCustomUpload() {
    wx.showActionSheet({
      itemList: ['拍照上传', '从相册选择'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.uploadFromCamera();
        } else if (res.tapIndex === 1) {
          this.uploadFromAlbum();
        }
      }
    });
  },

  uploadFromCamera() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.processCustomAvatar(tempFilePath);
      }
    });
  },

  uploadFromAlbum() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.processCustomAvatar(tempFilePath);
      }
    });
  },

  processCustomAvatar(tempFilePath) {
    wx.showLoading({
      title: '处理中...'
    });

    // 模拟头像处理
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        selectedAvatar: tempFilePath
      });
      wx.showToast({
        title: '头像已选择',
        icon: 'success'
      });
    }, 1500);
  },

  onConfirm() {
    if (!this.data.selectedAvatar) {
      wx.showToast({
        title: '请先选择头像',
        icon: 'none'
      });
      return;
    }

    // 返回上一页并传递选择的头像
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];

    if (prevPage) {
      // 调用上一页的头像更新方法
      prevPage.updateCoachAvatar(this.data.selectedAvatar);

      wx.navigateBack({
        delta: 1
      });
    }
  },

  onCancel() {
    wx.navigateBack({
      delta: 1
    });
  }
});