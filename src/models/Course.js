const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, '课程名称不能为空'], // 必须填写
    trim: true // 去除首尾空格
  },
  classTime: {
    type: String,
    required: [true, '上课时间不能为空'],
    match: [/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, '请输入正确格式：YYYY-MM-DD HH:MM'] // 时间格式验证
  },
  location: {
    type: String,
    required: [true, '上课地点不能为空'],
    trim: true
  },
  credit: {
    type: Number,
    required: [true, '学分不能为空'],
    min: [1, '学分至少1分'], // 最低1学分
    max: [6, '学分最多6分'] // 最高6学分
  },
  createdAt: {
    type: Date,
    default: Date.now // 自动记录创建时间
  }
});

// 导出模型（供路由使用）
module.exports = mongoose.model('Course', courseSchema);