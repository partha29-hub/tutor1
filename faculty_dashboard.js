// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            
            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Mock course data
    const mockCourses = [
        {
            id: 1,
            title: 'Introduction to Computer Science',
            description: 'Fundamental concepts of programming and computer science',
            schedule: 'Mon, Wed 10:00 AM',
            students: 45,
            progress: 35
        },
        {
            id: 2,
            title: 'Advanced Data Structures',
            description: 'Implementation and analysis of complex data structures',
            schedule: 'Tue, Thu 2:00 PM',
            students: 32,
            progress: 60
        }
    ];

    // Populate course grid
    const courseGrid = document.getElementById('courseGrid');
    if (courseGrid) {
        mockCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-header">
                    <h3>${course.title}</h3>
                    <p>${course.schedule}</p>
                </div>
                <div class="course-content">
                    <p>${course.description}</p>
                    <div class="course-stats">
                        <p>Students: ${course.students}</p>
                        <p>Progress: ${course.progress}%</p>
                    </div>
                    <div class="course-actions">
                        <button class="btn secondary">Edit</button>
                        <button class="btn secondary">View Details</button>
                    </div>
                </div>
            `;
            courseGrid.appendChild(courseCard);
        });
    }

    // Mock assignment data
    const mockAssignments = [
        {
            title: 'Programming Basics Quiz',
            course: 'Introduction to Computer Science',
            dueDate: '2024-03-20',
            submissions: '32/45',
            status: 'Active'
        },
        {
            title: 'Data Structures Project',
            course: 'Advanced Data Structures',
            dueDate: '2024-03-25',
            submissions: '28/32',
            status: 'Active'
        }
    ];

    // Populate assignment table
    const assignmentTableBody = document.getElementById('assignmentTableBody');
    if (assignmentTableBody) {
        mockAssignments.forEach(assignment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${assignment.title}</td>
                <td>${assignment.course}</td>
                <td>${assignment.dueDate}</td>
                <td>${assignment.submissions}</td>
                <td><span class="status">${assignment.status}</span></td>
                <td>
                    <button class="btn secondary">Edit</button>
                    <button class="btn secondary">Grade</button>
                </td>
            `;
            assignmentTableBody.appendChild(row);
        });
    }

    // Mock student data
    const mockStudents = [
        {
            name: 'John Doe',
            course: 'Introduction to Computer Science',
            attendance: '90%',
            assignments: '8/10',
            grade: 'A'
        },
        {
            name: 'Jane Smith',
            course: 'Advanced Data Structures',
            attendance: '85%',
            assignments: '7/10',
            grade: 'B+'
        }
    ];

    // Populate student table
    const studentTableBody = document.getElementById('studentTableBody');
    if (studentTableBody) {
        mockStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.attendance}</td>
                <td>${student.assignments}</td>
                <td>${student.grade}</td>
                <td>
                    <button class="btn secondary">View Details</button>
                    <button class="btn secondary">Message</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    // Modal handling
    const createCourseBtn = document.getElementById('createCourseBtn');
    const createAssignmentBtn = document.getElementById('createAssignmentBtn');
    const courseModal = document.getElementById('courseModal');
    const assignmentModal = document.getElementById('assignmentModal');

    createCourseBtn.addEventListener('click', () => {
        courseModal.classList.add('active');
    });

    createAssignmentBtn.addEventListener('click', () => {
        assignmentModal.classList.add('active');
    });

    // Close modal function
    window.closeModal = function(modalId) {
        document.getElementById(modalId).classList.remove('active');
    };

    // Form submissions
    const courseForm = document.getElementById('courseForm');
    const assignmentForm = document.getElementById('assignmentForm');

    courseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle course creation
        closeModal('courseModal');
    });

    assignmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle assignment creation
        closeModal('assignmentModal');
    });

    // Populate course select in assignment modal
    const assignmentCourse = document.getElementById('assignmentCourse');
    if (assignmentCourse) {
        mockCourses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.title;
            assignmentCourse.appendChild(option);
        });
    }
});
// CLASS PERFORMANCE CHART (Line Chart)
const classPerformanceCtx = document.getElementById('classPerformanceChart').getContext('2d');
new Chart(classPerformanceCtx, {
  type: 'line',
  data: {
    labels: ['Test 1', 'Test 2', 'Midterm', 'Test 3', 'Final'],
    datasets: [{
      label: 'Average Score',
      data: [78, 82, 74, 88, 91],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Class Performance Over Time'
      }
    }
  }
});

// ASSIGNMENT COMPLETION CHART (Doughnut Chart)
const assignmentCtx = document.getElementById('assignmentCompletionChart').getContext('2d');
new Chart(assignmentCtx, {
  type: 'doughnut',
  data: {
    labels: ['Completed', 'Pending', 'Overdue'],
    datasets: [{
      label: 'Assignment Status',
      data: [65, 20, 15],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ],
      borderColor: '#fff',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Assignment Completion Status'
      }
    }
  }
});
