const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // 导入课程模型

// 1. 获取所有课程（GET请求）
router.get('/', async (req, res) => {
  try {
    // 从数据库查询所有课程，按创建时间倒序（最新的在前面）
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses); // 返回课程数据
  } catch (err) {
    res.status(500).json({ message: '服务器错误：' + err.message });
  }
});

// 2. 添加课程（POST请求）
router.post('/', async (req, res) => {
  try {
    // 创建新课程并保存到数据库
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse); // 返回新增的课程数据
  } catch (err) {
    res.status(400).json({ message: '提交失败：' + err.message }); // 验证失败提示
  }
});

// 3. 删除课程（DELETE请求，按ID删除）
router.delete('/:id', async (req, res) => {
  try {
    // 按ID查询并删除课程
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: '课程不存在' });
    }
    res.status(200).json({ message: '课程已删除' });
  } catch (err) {
    res.status(500).json({ message: '服务器错误：' + err.message });
  }
});

module.exports = router; // 导出路由