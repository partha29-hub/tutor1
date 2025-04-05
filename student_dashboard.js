const mockData = {
    courses: [
        { id: 1, name: 'Mathematics 101', instructor: 'Dr. Smith', status: 'Available' },
        { id: 2, name: 'Physics 101', instructor: 'Dr. Johnson', status: 'Available' },
        { id: 3, name: 'Computer Science 101', instructor: 'Prof. Davis', status: 'Enrolled' }
    ],
    lectures: [
        { id: 1, title: 'Introduction to Calculus', course: 'Mathematics 101', date: '2024-02-20', type: 'Recorded' },
        { id: 2, title: 'Newton\'s Laws', course: 'Physics 101', date: '2024-02-21', type: 'Live' }
    ],
    assignments: [
        { id: 1, title: 'Calculus Assignment 1', course: 'Mathematics 101', deadline: '2024-02-25', status: 'Pending' },
        { id: 2, title: 'Physics Lab Report', course: 'Physics 101', deadline: '2024-02-23', status: 'Submitted' }
    ],
    quizzes: [
        { id: 1, title: 'Mid-term Quiz', course: 'Mathematics 101', date: '2024-02-28', status: 'Upcoming' },
        { id: 2, title: 'Physics Test 1', course: 'Physics 101', date: '2024-02-24', status: 'Completed' }
    ],
    grades: [
        { id: 1, course: 'Mathematics 101', assignment: 'Quiz 1', grade: 'A', feedback: 'Excellent work!' },
        { id: 2, course: 'Physics 101', assignment: 'Lab Report', grade: 'B+', feedback: 'Good analysis' }
    ]
};

// Authentication
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock authentication
    if (username && password) {
        document.getElementById('loginSection').classList.remove('active');
        document.getElementById('dashboardSection').classList.add('active');
        showSection('courses');
        loadData();
        setupNotifications();
    }
});

function logout() {
    document.getElementById('dashboardSection').classList.remove('active');
    document.getElementById('loginSection').classList.add('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.subsection').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Load Data
function loadData() {
    // Load Courses
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = mockData.courses.map(course => `
        <div class="grid-item">
            <h4>${course.name}</h4>
            <p>Instructor: ${course.instructor}</p>
            <p>Status: ${course.status}</p>
            ${course.status === 'Available' ? 
                '<button onclick="enrollCourse(' + course.id + ')">Enroll</button>' : 
                '<button disabled>Enrolled</button>'}
        </div>
    `).join('');
// Load Lectures
const lectureList = document.getElementById('lectureList');
lectureList.innerHTML = mockData.lectures.map(lecture => `
    <div class="list-item">
        <h4>${lecture.title}</h4>
        <p>Course: ${lecture.course}</p>
        <p>Date: ${lecture.date}</p>
        <p>Type: ${lecture.type}</p>
        <button onclick="accessLecture(${lecture.id})">${lecture.type === 'Live' ? 'Join' : 'Watch'}</button>
    </div>
`).join('');

// Load Assignments
const assignmentList = document.getElementById('assignmentList');
assignmentList.innerHTML = mockData.assignments.map(assignment => `
    <div class="list-item">
        <h4>${assignment.title}</h4>
        <p>Course: ${assignment.course}</p>
        <p>Deadline: ${assignment.deadline}</p>
        <p>Status: ${assignment.status}</p>
        ${assignment.status === 'Pending' ? 
            '<button onclick="submitAssignment(' + assignment.id + ')">Submit</button>' : 
            '<button disabled>Submitted</button>'}
    </div>
`).join('');

// Load Quizzes
const quizList = document.getElementById('quizList');
quizList.innerHTML = mockData.quizzes.map(quiz => `
    <div class="list-item">
        <h4>${quiz.title}</h4>
        <p>Course: ${quiz.course}</p>
        <p>Date: ${quiz.date}</p>
        <p>Status: ${quiz.status}</p>
        ${quiz.status === 'Upcoming' ? 
            '<button onclick="startQuiz(' + quiz.id + ')">Start</button>' : 
            '<button disabled>Completed</button>'}
    </div>
`).join('');

// Load Grades
const gradeList = document.getElementById('gradeList');
gradeList.innerHTML = mockData.grades.map(grade => `
    <div class="list-item">
        <h4>${grade.course}</h4>
        <p>Assignment: ${grade.assignment}</p>
        <p>Grade: ${grade.grade}</p>
        <p>Feedback: ${grade.feedback}</p>
    </div>
`).join('');
}

// Actions
function enrollCourse(courseId) {
    showNotification(`Successfully enrolled in course ${courseId}`);
    loadData();
  }
  
  function accessLecture(lectureId) {
    showNotification(`Accessing lecture ${lectureId}`);
  }
  
  function submitAssignment(assignmentId) {
    showNotification(`Assignment ${assignmentId} submitted successfully`);
    loadData();
  }
  
  function startQuiz(quizId) {
    showNotification(`Starting quiz ${quizId}`);
  }
  
// Notifications
function showNotification(message) {
const notifications = document.getElementById('notifications');
const notification = document.createElement('div');
notification.className = 'notification';
notification.textContent = message;
notifications.appendChild(notification);

setTimeout(() => {
    notification.remove();
}, 3000);
}

function setupNotifications() {
// Mock push notifications
setInterval(() => {
    const notifications = [
        'Upcoming lecture in 30 minutes',
        'New assignment posted',
        'Quiz deadline approaching',
        'Grades updated'
    ];
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    showNotification(randomNotification);
}, 15000);
}