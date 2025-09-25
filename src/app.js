const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // 用于加载环境变量
const courseRoutes = require('./routes/courseRoutes'); // 导入课程路由
const path = require('path'); // 用于处理文件路径

// 加载.env文件中的环境变量（如数据库连接字符串）
dotenv.config();

// 创建Express应用
const app = express();

// 解析JSON请求（用于处理前端提交的JSON数据）
app.use(express.json());

// 挂载课程路由（所有以/api/courses开头的请求由courseRoutes处理）
app.use('/api/courses', courseRoutes);

// 提供静态文件服务（让前端页面可以被访问）
app.use(express.static(path.join(__dirname, '../public')));

// 连接MongoDB数据库（从环境变量获取连接字符串）
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB数据库连接成功'))
  .catch(err => {
    console.error('数据库连接失败：', err.message);
    process.exit(1); // 连接失败时退出程序
  });

// 启动服务器（端口从环境变量获取，本地默认5000）
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器已启动，运行在端口 ${PORT}（本地访问：http://localhost:${PORT}）`);
});