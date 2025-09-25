const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // 导入课程数据模型

// 1. 查询所有课程（GET请求，用于前端加载列表）
router.get('/', async (req, res) => {
  try {
    // 从数据库查询所有课程，按创建时间倒序（最新的课程在前面）
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses); // 返回200状态码与课程数据
  } catch (err) {
    res.status(500).json({ message: '服务器错误：' + err.message }); // 错误处理
  }
});

// 2. 添加课程（POST请求，处理前端表单提交）
router.post('/', async (req, res) => {
  try {
    // 创建新课程实例并保存到数据库
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse); // 返回201状态码（创建成功）与新增课程数据
  } catch (err) {
    res.status(400).json({ message: '提交失败：' + err.message }); // 验证失败（如字段缺失）
  }
});

module.exports = router; // 导出路由，供后端入口文件使用