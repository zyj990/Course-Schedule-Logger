const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // 加载环境变量（保护敏感信息）
const courseRoutes = require('./routes/courseRoutes'); // 导入课程路由
const path = require('path'); // 处理文件路径，用于访问前端静态文件

// 加载.env文件中的环境变量（如MongoDB连接字符串）
dotenv.config();

// 创建Express应用
const app = express();

// 解析JSON请求（前端提交的表单数据为JSON格式）
app.use(express.json());

// 挂载课程路由（所有以/api/courses开头的请求，由courseRoutes处理）
app.use('/api/courses', courseRoutes);

// 提供前端静态文件服务（让GitHub Pages或Heroku能访问HTML/CSS/JS）
app.use(express.static(path.join(__dirname, '../public')));

// 连接MongoDB数据库（《概要》要求“使用云数据库，避免本地部署”）
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB数据库连接成功'))
  .catch(err => {
    console.error('数据库连接失败：', err.message);
    process.exit(1); // 连接失败时退出程序，避免后续错误
  });

// 启动服务器（端口从环境变量获取，本地默认5000，Heroku会自动分配端口）
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}（本地访问：http://localhost:${PORT}）`);
});