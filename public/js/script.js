// 页面加载时加载已添加的课程
window.onload = loadCourses;

// 加载课程列表
async function loadCourses() {
  try {
    const response = await fetch('/api/courses');
    if (!response.ok) throw new Error('加载课程失败');
    const courses = await response.json();
    renderCourses(courses);
  } catch (err) {
    alert(err.message);
  }
}

// 渲染课程到页面
function renderCourses(courses) {
  const listContainer = document.getElementById('courseList');
  listContainer.innerHTML = '';
  if (courses.length === 0) {
    listContainer.innerHTML = '<p>暂无课程，请添加第一条课程！</p>';
    return;
  }
  courses.forEach(course => {
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
      <p><strong>课程名：</strong>${course.courseName}</p>
      <p><strong>上课时间：</strong>${course.classTime}</p>
      <p><strong>上课地点：</strong>${course.location}</p>
      <p><strong>学分：</strong>${course.credit}</p>
    `;
    listContainer.appendChild(courseItem);
  });
}

// 添加课程（核心功能：提交表单到后端）
async function addCourse() {
  const courseData = {
    courseName: document.getElementById('courseName').value.trim(),
    classTime: document.getElementById('classTime').value.trim(),
    location: document.getElementById('location').value.trim(),
    credit: parseInt(document.getElementById('credit').value)
  };

  // 前端验证（避免无效数据提交）
  if (!courseData.courseName || !courseData.classTime || !courseData.location || !courseData.credit) {
    alert('请填写完整的课程信息！');
    return;
  }

  try {
    // 调用后端API提交课程数据
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });

    if (!response.ok) throw new Error('添加课程失败');
    loadCourses(); // 重新加载列表，展示新增课程
    // 清空表单
    document.getElementById('courseName').value = '';
    document.getElementById('classTime').value = '';
    document.getElementById('location').value = '';
    document.getElementById('credit').value = '';
  } catch (err) {
    alert(err.message);
  }
}