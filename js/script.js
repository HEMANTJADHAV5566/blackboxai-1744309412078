// Student Management System JavaScript

// Store students in localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const studentTable = document.getElementById('studentTable');
const searchInput = document.getElementById('search');

// Handle Registration Form
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const student = {
            id: Date.now(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            age: document.getElementById('age').value,
            course: document.getElementById('course').value,
            registrationDate: new Date().toISOString()
        };

        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        
        alert('Student registered successfully!');
        registrationForm.reset();
    });
}

// Handle Login Form
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Demo login (admin/admin)
        if (username === 'admin' && password === 'admin') {
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials!');
        }
    });
}

// Handle Student List
if (studentTable) {
    function displayStudents(studentsToDisplay) {
        studentTable.innerHTML = studentsToDisplay.map(student => `
            <tr>
                <td class="border px-4 py-2">${student.name}</td>
                <td class="border px-4 py-2">${student.email}</td>
                <td class="border px-4 py-2">${student.phone}</td>
                <td class="border px-4 py-2">${student.course}</td>
                <td class="border px-4 py-2">
                    <button onclick="viewStudent(${student.id})" class="text-blue-600">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="deleteStudent(${student.id})" class="text-red-600 ml-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredStudents = students.filter(student => 
                student.name.toLowerCase().includes(searchTerm) ||
                student.email.toLowerCase().includes(searchTerm)
            );
            displayStudents(filteredStudents);
        });
    }

    // Initial display
    displayStudents(students);
}

// Handle Dashboard
const totalStudentsElement = document.getElementById('totalStudents');
const newRegistrationsElement = document.getElementById('newRegistrations');
const pendingApprovalsElement = document.getElementById('pendingApprovals');
const recentActivities = document.getElementById('recentActivities');

if (totalStudentsElement) {
    // Update dashboard statistics
    totalStudentsElement.textContent = students.length;
    
    // Calculate new registrations (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newRegs = students.filter(student => 
        new Date(student.registrationDate) > oneWeekAgo
    ).length;
    newRegistrationsElement.textContent = newRegs;
    
    // Demo pending approvals
    pendingApprovalsElement.textContent = Math.min(students.length, 3);

    // Display recent activities
    if (recentActivities) {
        const recentStudents = students.slice(-5).reverse();
        recentActivities.innerHTML = recentStudents.map(student => `
            <tr>
                <td class="py-2">New student registration: ${student.name}</td>
                <td class="py-2">${new Date(student.registrationDate).toLocaleDateString()}</td>
                <td class="py-2"><span class="text-green-600">Completed</span></td>
            </tr>
        `).join('');
    }
}

// Utility Functions
function viewStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        alert(`Student Details:\nName: ${student.name}\nEmail: ${student.email}\nPhone: ${student.phone}\nAge: ${student.age}\nCourse: ${student.course}`);
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents(students);
        alert('Student deleted successfully!');
    }
}
