// 页面加载时加载所有课程
window.onload = loadCourses;

// 加载所有课程
async function loadCourses() {
  try {
    const response = await fetch('/api/courses'); // 调用后端API
    if (!response.ok) throw new Error('加载课程失败');
    const courses = await response.json();
    renderCourses(courses); // 渲染课程列表
  } catch (err) {
    alert(err.message);
  }
}

// 渲染课程列表
function renderCourses(courses) {
  const listContainer = document.getElementById('courseList');
  listContainer.innerHTML = ''; // 清空列表

  if (courses.length === 0) {
    listContainer.innerHTML = '<p>暂无课程记录，请添加第一条课程！</p>';
    return;
  }

  // 遍历课程数据，生成列表项
  courses.forEach(course => {
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
      <p><strong>课程名：</strong>${course.courseName}</p>
      <p><strong>上课时间：</strong>${course.classTime}</p>
      <p><strong>上课地点：</strong>${course.location}</p>
      <p><strong>学分：</strong>${course.credit}</p>
      <button onclick="deleteCourse('${course._id}')">删除</button>
    `;
    listContainer.appendChild(courseItem);
  });
}

// 添加课程
async function addCourse() {
  // 获取表单数据
  const courseData = {
    courseName: document.getElementById('courseName').value.trim(),
    classTime: document.getElementById('classTime').value.trim(),
    location: document.getElementById('location').value.trim(),
    credit: parseInt(document.getElementById('credit').value)
  };

  // 简单验证
  if (!courseData.courseName || !courseData.classTime || !courseData.location || !courseData.credit) {
    alert('请填写完整的课程信息！');
    return;
  }

  try {
    // 调用后端API添加课程
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });

    if (!response.ok) throw new Error('添加课程失败');
    loadCourses(); // 重新加载列表

    // 清空表单
    document.getElementById('courseName').value = '';
    document.getElementById('classTime').value = '';
    document.getElementById('location').value = '';
    document.getElementById('credit').value = '';
  } catch (err) {
    alert(err.message);
  }
}

// 删除课程
async function deleteCourse(courseId) {
  if (!confirm('确定要删除这门课程吗？')) return;

  try {
    const response = await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('删除课程失败');
    loadCourses(); // 重新加载列表
  } catch (err) {
    alert(err.message);
  }
}

// 按学分筛选课程
async function filterCourses() {
  const selectedCredit = document.getElementById('filterCredit').value;
  try {
    const response = await fetch('/api/courses');
    const allCourses = await response.json();
    // 筛选逻辑：如果选"所有学分"则展示全部，否则按学分匹配
    const filteredCourses = selectedCredit === 'all' 
      ? allCourses 
      : allCourses.filter(course => course.credit === parseInt(selectedCredit));
    renderCourses(filteredCourses);
  } catch (err) {
    alert(err.message);
  }
}