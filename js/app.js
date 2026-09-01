/* =====================================================
   CAMPUSCORE
   COLLEGE MANAGEMENT SYSTEM
   Application JavaScript
===================================================== */

/* =====================================================
   1. APPLICATION STATE
===================================================== */
const API_BASE_URL = "http://localhost:8080/api";


const appState = {
    selectedRole: "admin",
    currentUser: null,
    isLoggedIn: false,
    currentPage: "dashboard"
};

/* =====================================================
   2. DEMO USERS
===================================================== */

const users = {
    admin: {
        userId: "ADM001",
        password: "admin123",
        name: "Aarav Menon",
        role: "Administrator",
        email: "admin@campuscore.edu",
        initials: "AM"
    },
    faculty: {
        userId: "FAC101",
        password: "faculty123",
        name: "Dr. Anjali Rao",
        role: "Faculty Member",
        email: "anjali.rao@campuscore.edu",
        initials: "AR"
    },
    student: {
        userId: "STU202402",
        password: "student123",
        name: "Meera Nair",
        role: "Student",
        email: "meera.nair@campuscore.edu",
        initials: "MN"
    }
};

/* =====================================================
   3. DOM ELEMENTS
===================================================== */

const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const loginForm = document.getElementById("loginForm");
const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const forgotPassword = document.getElementById("forgotPassword");
const registerButton = document.getElementById("registerButton");
const roleButtons = document.querySelectorAll(".role-button");

/* =====================================================
   4. APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializeRoleSelector();
    initializePasswordToggle();
    initializeLogin();
    initializeForgotPassword();
    initializeRegister();
    selectRole("admin");
});

/* =====================================================
   5. REGISTER BUTTON & PAGE
===================================================== */

function initializeRegister() {
    if (!registerButton) return;
    registerButton.addEventListener("click", () => {
        showRegistrationPage();
    });
}

function showRegistrationPage() {
    if (!loginPage || !dashboardPage) return;

    loginPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");

    dashboardPage.innerHTML = `
        <div class="registration-page">
            <div class="registration-card">
                <button type="button" class="back-button" id="backToLogin">← Back to Login</button>
                <div class="registration-heading">
                    <span class="section-label">ACCOUNT REGISTRATION</span>
                    <h1>Create your account</h1>
                    <p>Register your details to access the college management portal.</p>
                </div>

                <form id="registrationForm">
                    <div class="registration-role">
                        <label>Register as</label>
                        <select id="registerRole">
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>

                    <div class="registration-grid">
                        <div class="form-group">
                            <label for="registerName">Full Name</label>
                            <input type="text" id="registerName" placeholder="Enter full name" required>
                        </div>
                        <div class="form-group">
                            <label for="registerId">Student / Faculty ID</label>
                            <input type="text" id="registerId" placeholder="Enter ID" required>
                        </div>
                        <div class="form-group">
                            <label for="registerEmail">Email Address</label>
                            <input type="email" id="registerEmail" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="registerPhone">Phone Number</label>
                            <input type="tel" id="registerPhone" placeholder="Enter phone number" required>
                        </div>
                        <div class="form-group">
                            <label for="registerDepartment">Department</label>
                            <select id="registerDepartment">
                                <option>Computer Science</option>
                                <option>Electronics</option>
                                <option>Commerce</option>
                                <option>Mathematics</option>
                                <option>Physics</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="registerSemester">Semester</label>
                            <select id="registerSemester">
                                <option>Semester 1</option>
                                <option>Semester 2</option>
                                <option>Semester 3</option>
                                <option>Semester 4</option>
                                <option>Semester 5</option>
                                <option>Semester 6</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="registerPassword">Password</label>
                            <input type="password" id="registerPassword" placeholder="Create password" required>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" placeholder="Confirm password" required>
                        </div>
                    </div>

                    <label class="terms-option">
                        <input type="checkbox" id="terms" required>
                        <span>I agree to the college portal terms and conditions.</span>
                    </label>

                    <button type="submit" class="registration-submit">Create Account →</button>
                </form>
            </div>
        </div>
    `;

    initializeRegistrationForm();
    const backButton = document.getElementById("backToLogin");
    if (backButton) {
        backButton.addEventListener("click", backToLogin);
    }
}

function initializeRegistrationForm() {
    const form = document.getElementById("registrationForm");
    if (!form) return;
    form.addEventListener("submit", event => {
        event.preventDefault();
        registerNewUser();
    });
}

function registerNewUser() {
    const name = document.getElementById("registerName")?.value.trim();
    const id = document.getElementById("registerId")?.value.trim();
    const email = document.getElementById("registerEmail")?.value.trim();
    const phone = document.getElementById("registerPhone")?.value.trim();
    const password = document.getElementById("registerPassword")?.value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;
    const role = document.getElementById("registerRole")?.value;
    const department = document.getElementById("registerDepartment")?.value;
    const semester = document.getElementById("registerSemester")?.value;

    if (!name || !id || !email || !phone || !password || !confirmPassword) {
        showMessage("Please complete all required fields.", "error");
        return;
    }
    if (password.length < 6) {
        showMessage("Password must contain at least 6 characters.", "error");
        return;
    }
    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "error");
        return;
    }

    if (role === "student") {
        students.push({ id, name, email, department, semester, phone, attendance: 0 });
    } else {
        facultyMembers.push({ id, name, email, department, designation: "Assistant Professor", phone, courses: 0 });
    }

    showMessage("Registration completed successfully!", "success");
    setTimeout(backToLogin, 1000);
}

function backToLogin() {
    if (!dashboardPage || !loginPage) return;
    dashboardPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
    appState.currentUser = null;
    appState.isLoggedIn = false;
    selectRole(appState.selectedRole || "admin");
}

/* =====================================================
   6. AUTHENTICATION & LOGIN
===================================================== */

function initializeRoleSelector() {
    roleButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectRole(button.dataset.role);
        });
    });
}

function selectRole(role) {
    if (!users[role]) return;
    appState.selectedRole = role;

    roleButtons.forEach(button => button.classList.remove("active"));
    const selectedButton = document.querySelector(`.role-button[data-role="${role}"]`);
    if (selectedButton) selectedButton.classList.add("active");

    if (userIdInput) userIdInput.value = users[role].userId;
    if (passwordInput) passwordInput.value = users[role].password;
}

function initializePasswordToggle() {
    if (!togglePassword || !passwordInput) return;
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Show";
        }
    });
}

function initializeLogin() {
    if (!loginForm) return;
    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        loginUser();
    });
}

async function loginUser() {
    const userId = userIdInput.value.trim();
    const password = passwordInput.value;
    const role = appState.selectedRole;

    if (!userId || !password) {
        showMessage("Please enter your login details.", "error");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, password, role })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            appState.currentUser = {
                userId: data.userId,
                name: data.name,
                role: data.role,
                email: data.email,
                initials: data.name.split(" ").map(w => w[0]).join("").toUpperCase()
            };
            appState.isLoggedIn = true;
            showMessage("Login successful.", "success");
            setTimeout(openDashboard, 400);
        } else {
            showMessage(data.message || "Invalid credentials.", "error");
        }
    } catch (error) {
        showMessage("Backend server is not running!", "error");
    }
}
function openDashboard() {
    if (!loginPage || !dashboardPage) return;
    loginPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");
    renderDashboard();
}

function initializeForgotPassword() {
    if (!forgotPassword) return;
    forgotPassword.addEventListener("click", event => {
        event.preventDefault();
        showMessage("Please contact the college administrator to reset your password.", "info");
    });
}

function logoutUser() {
    appState.currentUser = null;
    appState.isLoggedIn = false;
    appState.currentPage = "dashboard";

    if (dashboardPage) dashboardPage.classList.add("hidden");
    if (loginPage) loginPage.classList.remove("hidden");

    showMessage("You have been logged out.", "success");
    selectRole("admin");
}

/* =====================================================
   7. TOAST MESSAGES
===================================================== */

function showMessage(message, type = "info") {
    const oldMessage = document.querySelector(".system-message");
    if (oldMessage) oldMessage.remove();

    const messageElement = document.createElement("div");
    messageElement.className = `system-message ${type}`;
    messageElement.textContent = message;

    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.classList.add("message-hide");
        setTimeout(() => messageElement.remove(), 300);
    }, 2500);
}

/* =====================================================
   8. DASHBOARD CORE & NAVIGATION
===================================================== */

function renderDashboard() {
    if (!dashboardPage) return;
    const user = appState.currentUser || users[appState.selectedRole];

    dashboardPage.innerHTML = `
        <aside class="dashboard-sidebar">
            <div class="dashboard-brand">
                <div class="brand-logo">C</div>
                <div class="brand-text">
                    <h2>CampusCore</h2>
                    <span>College Management</span>
                </div>
            </div>

            <nav class="dashboard-navigation">
                ${createNavigation()}
            </nav>

            <div class="sidebar-bottom">
                <div class="system-status">
                    <span class="system-status-dot"></span>
                    <div>
                        <strong>System secure</strong>
                        <span>Database connected</span>
                    </div>
                </div>

                <button type="button" class="sidebar-logout" id="logoutButton">
                    <span>↪</span> Logout
                </button>
            </div>
        </aside>

        <main class="dashboard-main">
            <header class="dashboard-topbar">
                <div class="dashboard-heading">
                    <span class="section-label">${getRoleLabel()}</span>
                    <h2 id="dashboardPageTitle">${getPageTitle(appState.currentPage)}</h2>
                </div>

                <div class="topbar-user">
                    <button type="button" class="notification-button" id="notificationButton">
                        ♧
                        <span class="notification-dot"></span>
                    </button>

                    <div class="user-profile">
                        <div class="user-avatar">${user.initials || "U"}</div>
                        <div class="user-details">
                            <strong>${user.name || "User"}</strong>
                            <span>${user.role || "User"}</span>
                        </div>
                    </div>
                </div>
            </header>

            <section class="dashboard-content" id="dashboardContent"></section>
        </main>
    `;

    initializeDashboardEvents();
}

function getPageTitle(page) {
    const titles = {
        dashboard: "Dashboard",
        students: "Students",
        faculty: "Faculty",
        courses: "Courses",
        attendance: "Attendance",
        marks: "Internal Marks",
        fees: "Fees & Payments",
        reports: "Reports",
        announcements: "Announcements",
        profile: "My Profile",
        settings: "Settings"
    };
    return titles[page] || "Dashboard";
}

function getRoleLabel() {
    const labels = {
        admin: "ADMINISTRATOR",
        faculty: "FACULTY MEMBER",
        student: "STUDENT"
    };
    return labels[appState.selectedRole] || "COLLEGE PORTAL";
}

function createNavigation() {
    const commonMain = `
        <div class="navigation-title">MAIN</div>
        ${navigationItem("dashboard", "▦", "Dashboard")}
        ${navigationItem("students", "♙", "Students")}
    `;

    if (appState.selectedRole === "admin") {
        return `
            ${commonMain}
            ${navigationItem("faculty", "◈", "Faculty")}
            <div class="navigation-title">ACADEMICS</div>
            ${navigationItem("courses", "▤", "Courses")}
            ${navigationItem("attendance", "◷", "Attendance")}
            ${navigationItem("marks", "▣", "Internal Marks")}
            <div class="navigation-title">FINANCE</div>
            ${navigationItem("fees", "₹", "Fees & Payments")}
            <div class="navigation-title">REPORTS</div>
            ${navigationItem("reports", "⌁", "Reports")}
            ${navigationItem("announcements", "◉", "Announcements")}
            <div class="navigation-title">ACCOUNT</div>
            ${navigationItem("profile", "👤", "My Profile")}
            ${navigationItem("settings", "⚙", "Settings")}
        `;
    }

    if (appState.selectedRole === "faculty") {
        return `
            ${commonMain}
            <div class="navigation-title">ACADEMICS</div>
            ${navigationItem("courses", "▤", "Courses")}
            ${navigationItem("attendance", "◷", "Attendance")}
            ${navigationItem("marks", "▣", "Internal Marks")}
            <div class="navigation-title">COMMUNICATION</div>
            ${navigationItem("announcements", "◉", "Announcements")}
            <div class="navigation-title">ACCOUNT</div>
            ${navigationItem("profile", "👤", "My Profile")}
        `;
    }

    return `
        ${commonMain}
        <div class="navigation-title">ACADEMICS</div>
        ${navigationItem("courses", "▤", "Courses")}
        ${navigationItem("attendance", "◷", "Attendance")}
        ${navigationItem("marks", "▣", "Internal Marks")}
        <div class="navigation-title">FINANCE</div>
        ${navigationItem("fees", "₹", "Fees & Payments")}
        <div class="navigation-title">COMMUNICATION</div>
        ${navigationItem("announcements", "◉", "Announcements")}
        <div class="navigation-title">ACCOUNT</div>
        ${navigationItem("profile", "👤", "My Profile")}
    `;
}

function navigationItem(page, icon, label) {
    const active = appState.currentPage === page ? "active" : "";
    return `
        <button type="button" class="navigation-item ${active}" data-page="${page}">
            <span class="navigation-icon">${icon}</span>
            <span>${label}</span>
        </button>
    `;
}

function initializeDashboardEvents() {
    document.querySelectorAll(".navigation-item").forEach(button => {
        button.addEventListener("click", () => navigateTo(button.dataset.page));
    });

    const logoutBtn = document.getElementById("logoutButton");
    if (logoutBtn) logoutBtn.addEventListener("click", logoutUser);

    const notificationBtn = document.getElementById("notificationButton");
    if (notificationBtn) notificationBtn.addEventListener("click", showNotifications);

    renderCurrentPage();
}

function navigateTo(page) {
    appState.currentPage = page;
    updateActiveNavigation();

    if (page === "dashboard") {
        renderRoleDashboard();
        return;
    }
    if (page === "students") return showStudentsPage();
    if (page === "faculty") return showFacultyPage();
    if (page === "courses") return showCoursesPage();
    if (page === "attendance") return showAttendancePage();
    if (page === "marks") return showMarksPage();
    if (page === "fees") return showFeesPage();
    if (page === "announcements") return showAnnouncementsPage();
    if (page === "reports") return showReportsPage();
    if (page === "profile") return showProfilePage();
    if (page === "settings") return showSettingsPage();
}

function renderCurrentPage() {
    navigateTo(appState.currentPage || "dashboard");
}

function updateActiveNavigation() {
    document.querySelectorAll(".navigation-item").forEach(button => {
        button.classList.toggle("active", button.dataset.page === appState.currentPage);
    });
    const pageTitle = document.getElementById("dashboardPageTitle");
    if (pageTitle) pageTitle.textContent = getPageTitle(appState.currentPage);
}

/* =====================================================
   9. ROLE-SPECIFIC DASHBOARD RENDERERS
===================================================== */

function renderRoleDashboard() {
    if (appState.selectedRole === "student") return showStudentDashboard();
    if (appState.selectedRole === "faculty") return showFacultyDashboard();
    renderDashboardContent();
}

function renderDashboardContent() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;
    const user = appState.currentUser || users.admin;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <h1>Welcome back, ${user.name}</h1>
                <p>Here's what's happening across your college portal today.</p>
            </div>
        </div>

        <div class="dashboard-statistics">
            <div class="dashboard-stat-card">
                <span class="stat-label">TOTAL STUDENTS</span>
                <div class="stat-value">${students.length}</div>
                <small class="stat-description">Active students</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">FACULTY MEMBERS</span>
                <div class="stat-value">${facultyMembers.length}</div>
                <small class="stat-description">Teaching staff</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">ACTIVE COURSES</span>
                <div class="stat-value">${courses.length}</div>
                <small class="stat-description">Current semester</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">AVG ATTENDANCE</span>
                <div class="stat-value">${getAverageAttendance()}%</div>
                <small class="stat-description">Overall average</small>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h3>Recent Activity</h3>
                    <span>Updated just now</span>
                </div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-avatar">+</div>
                        <div class="activity-info">
                            <strong>New Student Registered</strong>
                            <p>STU202405 was added to Computer Science</p>
                        </div>
                        <span class="activity-time">10m ago</span>
                    </div>
                    <div class="activity-item">
                        <div class="activity-avatar">✓</div>
                        <div class="activity-info">
                            <strong>Attendance Recorded</strong>
                            <p>CS301 attendance recorded for today</p>
                        </div>
                        <span class="activity-time">1h ago</span>
                    </div>
                    <div class="activity-item">
                        <div class="activity-avatar">₹</div>
                        <div class="activity-info">
                            <strong>Fee Installment Paid</strong>
                            <p>Payment received from STU202401</p>
                        </div>
                        <span class="activity-time">2h ago</span>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h3>Quick Shortcuts</h3>
                </div>
                <div class="quick-actions">
                    <button type="button" class="quick-action" data-quick-page="students">
                        <span class="quick-action-icon">♙</span>
                        <strong>Students</strong>
                    </button>
                    <button type="button" class="quick-action" data-quick-page="courses">
                        <span class="quick-action-icon">▤</span>
                        <strong>Courses</strong>
                    </button>
                    <button type="button" class="quick-action" data-quick-page="attendance">
                        <span class="quick-action-icon">◷</span>
                        <strong>Attendance</strong>
                    </button>
                    <button type="button" class="quick-action" data-quick-page="reports">
                        <span class="quick-action-icon">⌁</span>
                        <strong>Reports</strong>
                    </button>
                </div>
            </div>
        </div>
    `;

    initializeQuickActions();
}

function showStudentDashboard() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;
    const user = appState.currentUser || users.student;
    const studentData = students.find(s => s.id === user.userId) || students[0];
    const marksData = getStudentMarks(studentData.id);

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <h1>Welcome back, ${studentData.name}</h1>
                <p>View your academic information, attendance, marks and fee status.</p>
            </div>
        </div>

        <div class="dashboard-statistics">
            <div class="dashboard-stat-card">
                <span class="stat-label">ATTENDANCE</span>
                <div class="stat-value">${studentData.attendance}%</div>
                <small class="stat-description">Current overall</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">COURSES</span>
                <div class="stat-value">${getStudentCourseCount(studentData.id)}</div>
                <small class="stat-description">Enrolled</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">INTERNAL TOTAL</span>
                <div class="stat-value">${marksData.total}</div>
                <small class="stat-description">Scored marks</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">FEE STATUS</span>
                <div class="stat-value">${getStudentFeeStatus(studentData.id)}</div>
                <small class="stat-description">Payment state</small>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h3>Student Information</h3>
                </div>
                <div class="profile-info-list">
                    <div class="profile-info-row"><span>ID</span><strong>${studentData.id}</strong></div>
                    <div class="profile-info-row"><span>Department</span><strong>${studentData.department}</strong></div>
                    <div class="profile-info-row"><span>Semester</span><strong>${studentData.semester}</strong></div>
                    <div class="profile-info-row"><span>Email</span><strong>${studentData.email}</strong></div>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h3>Quick Services</h3>
                </div>
                <div class="quick-actions">
                    <button type="button" class="quick-action" data-quick-page="courses"><span class="quick-action-icon">▤</span><strong>Courses</strong></button>
                    <button type="button" class="quick-action" data-quick-page="attendance"><span class="quick-action-icon">◷</span><strong>Attendance</strong></button>
                    <button type="button" class="quick-action" data-quick-page="marks"><span class="quick-action-icon">▣</span><strong>Marks</strong></button>
                    <button type="button" class="quick-action" data-quick-page="fees"><span class="quick-action-icon">₹</span><strong>Fees</strong></button>
                </div>
            </div>
        </div>
    `;

    initializeQuickActions();
}

function showFacultyDashboard() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;
    const user = appState.currentUser || users.faculty;
    const facultyData = facultyMembers.find(f => f.id === user.userId) || facultyMembers[0];
    const assignedCourses = courses.filter(c => c.faculty === facultyData.name);

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <h1>Welcome back, ${facultyData.name}</h1>
                <p>Manage your courses, attendance and internal assessments.</p>
            </div>
        </div>

        <div class="dashboard-statistics">
            <div class="dashboard-stat-card">
                <span class="stat-label">ASSIGNED COURSES</span>
                <div class="stat-value">${assignedCourses.length}</div>
                <small class="stat-description">Active subjects</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">TOTAL STUDENTS</span>
                <div class="stat-value">${assignedCourses.reduce((sum, c) => sum + Number(c.students), 0)}</div>
                <small class="stat-description">Enrolled students</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">DEPARTMENT</span>
                <div class="stat-value" style="font-size:16px; margin-top:14px;">${facultyData.department}</div>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">DESIGNATION</span>
                <div class="stat-value" style="font-size:16px; margin-top:14px;">${facultyData.designation}</div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h3>Assigned Courses</h3>
                </div>
                ${assignedCourses.length ? `
                    <div class="activity-list">
                        ${assignedCourses.map(c => `
                            <div class="activity-item">
                                <div class="activity-avatar">▤</div>
                                <div class="activity-info">
                                    <strong>${c.code} - ${c.name}</strong>
                                    <p>${c.department} | ${c.semester}</p>
                                </div>
                                <span class="activity-time">${c.students} Students</span>
                            </div>
                        `).join("")}
                    </div>
                ` : `<p>No courses currently assigned.</p>`}
            </div>

            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h3>Faculty Actions</h3>
                </div>
                <div class="quick-actions">
                    <button type="button" class="quick-action" data-quick-page="students"><span class="quick-action-icon">♙</span><strong>Students</strong></button>
                    <button type="button" class="quick-action" data-quick-page="courses"><span class="quick-action-icon">▤</span><strong>Courses</strong></button>
                    <button type="button" class="quick-action" data-quick-page="attendance"><span class="quick-action-icon">◷</span><strong>Attendance</strong></button>
                    <button type="button" class="quick-action" data-quick-page="marks"><span class="quick-action-icon">▣</span><strong>Marks</strong></button>
                </div>
            </div>
        </div>
    `;

    initializeQuickActions();
}

function initializeQuickActions() {
    document.querySelectorAll("[data-quick-page]").forEach(button => {
        button.addEventListener("click", () => navigateTo(button.dataset.quickPage));
    });
}

/* =====================================================
   10. STUDENTS DATA & MANAGEMENT
===================================================== */

let students = [
    { id: "STU202401", name: "Meera Nair", email: "meera.nair@campuscore.edu", department: "Computer Science", semester: "Semester 3", phone: "9876543210", attendance: 94 },
    { id: "STU202402", name: "Arjun Kumar", email: "arjun.kumar@campuscore.edu", department: "Computer Science", semester: "Semester 3", phone: "9876543211", attendance: 89 },
    { id: "STU202403", name: "Ananya Thomas", email: "ananya.thomas@campuscore.edu", department: "Electronics", semester: "Semester 5", phone: "9876543212", attendance: 92 },
    { id: "STU202404", name: "Rahul Menon", email: "rahul.menon@campuscore.edu", department: "Commerce", semester: "Semester 1", phone: "9876543213", attendance: 86 },
    { id: "STU202405", name: "Diya Joseph", email: "diya.joseph@campuscore.edu", department: "Mathematics", semester: "Semester 3", phone: "9876543214", attendance: 96 }
];

function showStudentsPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">STUDENT ADMINISTRATION</span>
                <h1>Student Management</h1>
                <p>Manage student profiles, admissions and academic information.</p>
            </div>
            ${appState.selectedRole === "admin" ? `<button type="button" class="dashboard-button dashboard-button-primary" id="addStudentButton">+ Add Student</button>` : ""}
        </div>

        <div class="faculty-summary">
            <div class="faculty-summary-card"><span>TOTAL STUDENTS</span><strong>${students.length}</strong></div>
            <div class="faculty-summary-card"><span>CS DEPT</span><strong>${students.filter(s => s.department === "Computer Science").length}</strong></div>
            <div class="faculty-summary-card"><span>ELECTRONICS</span><strong>${students.filter(s => s.department === "Electronics").length}</strong></div>
            <div class="faculty-summary-card"><span>AVG. ATTENDANCE</span><strong>${getAverageAttendance()}%</strong></div>
        </div>

        <div class="dashboard-card">
            <div class="page-toolbar">
                <div class="page-toolbar-left">
                    <div class="search-box">
                        <span class="search-icon">⌕</span>
                        <input type="search" id="studentSearch" placeholder="Search student or ID...">
                    </div>
                    <select class="filter-select" id="studentDepartmentFilter">
                        <option value="all">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                    <select class="filter-select" id="studentSemesterFilter">
                        <option value="all">All Semesters</option>
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 3">Semester 3</option>
                        <option value="Semester 5">Semester 5</option>
                    </select>
                </div>
            </div>

            <div id="studentTableContainer" class="student-table-wrapper">
                ${renderStudentTable(students)}
            </div>
        </div>
    `;

    initializeStudentManagement();
}

function renderStudentTable(data) {
    if (!data.length) {
        return `
            <div class="dashboard-empty">
                <div class="dashboard-empty-icon">⌕</div>
                <h3>No students found</h3>
                <p>Try changing your search or filter options.</p>
            </div>
        `;
    }

    return `
        <table class="student-table">
            <thead>
                <tr>
                    <th>STUDENT</th>
                    <th>ID</th>
                    <th>DEPARTMENT</th>
                    <th>SEMESTER</th>
                    <th>ATTENDANCE</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(student => `
                    <tr>
                        <td>
                            <div class="student-info">
                                <div class="student-avatar">${getInitials(student.name)}</div>
                                <div>
                                    <div class="student-name">${student.name}</div>
                                    <span class="student-id">${student.email}</span>
                                </div>
                            </div>
                        </td>
                        <td><span class="student-id">${student.id}</span></td>
                        <td>${student.department}</td>
                        <td>${student.semester}</td>
                        <td><strong>${student.attendance}%</strong></td>
                        <td>
                            <div class="student-actions">
                                <button type="button" class="student-action" data-student-action="view" data-student-id="${student.id}">👁</button>
                                ${appState.selectedRole === "admin" ? `
                                    <button type="button" class="student-action" data-student-action="edit" data-student-id="${student.id}">✎</button>
                                    <button type="button" class="student-action delete" data-student-action="delete" data-student-id="${student.id}">×</button>
                                ` : ""}
                            </div>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <div class="table-footer">
            <span class="table-count">Showing ${data.length} of ${students.length} students</span>
        </div>
    `;
}

function initializeStudentManagement() {
    const search = document.getElementById("studentSearch");
    const department = document.getElementById("studentDepartmentFilter");
    const semester = document.getElementById("studentSemesterFilter");
    const addButton = document.getElementById("addStudentButton");

    function applyStudentFilters() {
        const searchValue = search ? search.value.toLowerCase().trim() : "";
        const departmentValue = department ? department.value : "all";
        const semesterValue = semester ? semester.value : "all";

        const filtered = students.filter(student => {
            const matchesSearch = student.name.toLowerCase().includes(searchValue) ||
                student.id.toLowerCase().includes(searchValue) ||
                student.email.toLowerCase().includes(searchValue);
            const matchesDept = departmentValue === "all" || student.department === departmentValue;
            const matchesSem = semesterValue === "all" || student.semester === semesterValue;
            return matchesSearch && matchesDept && matchesSem;
        });

        const container = document.getElementById("studentTableContainer");
        if (container) container.innerHTML = renderStudentTable(filtered);
        initializeStudentActions();
    }

    if (search) search.addEventListener("input", applyStudentFilters);
    if (department) department.addEventListener("change", applyStudentFilters);
    if (semester) semester.addEventListener("change", applyStudentFilters);
    if (addButton) addButton.addEventListener("click", () => openStudentModal());

    initializeStudentActions();
}

function initializeStudentActions() {
    document.querySelectorAll("[data-student-action]").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.studentId;
            const action = button.dataset.studentAction;
            const student = students.find(s => s.id === id);
            if (!student) return;

            if (action === "view") showMessage(`${student.name} (${student.id}) - ${student.department}`, "info");
            if (action === "edit") openStudentModal(student);
            if (action === "delete") deleteStudent(id);
        });
    });
}

function openStudentModal(student = null) {
    const editing = student !== null;
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "studentModal";

    modal.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h2>${editing ? "Edit Student" : "Add New Student"}</h2>
                <button type="button" class="modal-close" id="closeStudentModal">×</button>
            </div>
            <form id="studentForm">
                <div class="modal-grid">
                    <div class="form-group">
                        <label>Student ID</label>
                        <input type="text" id="studentId" value="${student?.id || ""}" placeholder="STU202406" required ${editing ? "readonly" : ""}>
                    </div>
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="studentName" value="${student?.name || ""}" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="studentEmail" value="${student?.email || ""}" placeholder="student@campuscore.edu" required>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" id="studentPhone" value="${student?.phone || ""}" placeholder="Phone number" required>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <select id="studentDepartment">
                            ${["Computer Science", "Electronics", "Commerce", "Mathematics", "Physics"].map(dept => `
                                <option value="${dept}" ${student?.department === dept ? "selected" : ""}>${dept}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Semester</label>
                        <select id="studentSemester">
                            ${["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"].map(sem => `
                                <option value="${sem}" ${student?.semester === sem ? "selected" : ""}>${sem}</option>
                            `).join("")}
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-button cancel" id="cancelStudentModal">Cancel</button>
                    <button type="submit" class="modal-button save">${editing ? "Save Changes" : "Add Student"}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("closeStudentModal").addEventListener("click", () => modal.remove());
    document.getElementById("cancelStudentModal").addEventListener("click", () => modal.remove());
    document.getElementById("studentForm").addEventListener("submit", event => {
        event.preventDefault();
        saveStudent(student?.id || null);
    });
}

function saveStudent(existingId) {
    const id = document.getElementById("studentId").value.trim().toUpperCase();
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const department = document.getElementById("studentDepartment").value;
    const semester = document.getElementById("studentSemester").value;

    if (!id || !name || !email || !phone) {
        showMessage("Please complete all required fields.", "error");
        return;
    }

    if (existingId) {
        const student = students.find(s => s.id === existingId);
        if (student) {
            student.name = name;
            student.email = email;
            student.phone = phone;
            student.department = department;
            student.semester = semester;
        }
        showMessage("Student updated successfully.", "success");
    } else {
        if (students.some(s => s.id === id)) {
            showMessage("Student ID already exists.", "error");
            return;
        }
        students.push({ id, name, email, department, semester, phone, attendance: 0 });
        showMessage("Student added successfully.", "success");
    }

    document.getElementById("studentModal")?.remove();
    showStudentsPage();
}

function deleteStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student || !confirm(`Delete ${student.name} (${student.id})?`)) return;

    students = students.filter(s => s.id !== id);
    showMessage("Student deleted successfully.", "success");
    showStudentsPage();
}

function getInitials(name) {
    if (!name) return "U";
    return name.split(" ").map(w => w.charAt(0)).slice(0, 2).join("").toUpperCase();
}

function getAverageAttendance() {
    if (!students.length) return "0.0";
    const total = students.reduce((sum, s) => sum + Number(s.attendance || 0), 0);
    return (total / students.length).toFixed(1);
}

/* =====================================================
   11. FACULTY DATA & MANAGEMENT
===================================================== */

let facultyMembers = [
    { id: "FAC101", name: "Dr. Anjali Rao", email: "anjali.rao@campuscore.edu", department: "Computer Science", designation: "Professor", phone: "9876501001", courses: 3 },
    { id: "FAC102", name: "Dr. Arun Das", email: "arun.das@campuscore.edu", department: "Computer Science", designation: "Assistant Professor", phone: "9876501002", courses: 2 },
    { id: "FAC103", name: "Dr. Rahul Menon", email: "rahul.menon@campuscore.edu", department: "Electronics", designation: "Associate Professor", phone: "9876501003", courses: 3 },
    { id: "FAC104", name: "Prof. Sneha Thomas", email: "sneha.thomas@campuscore.edu", department: "Commerce", designation: "Assistant Professor", phone: "9876501004", courses: 2 },
    { id: "FAC105", name: "Dr. Vivek Kumar", email: "vivek.kumar@campuscore.edu", department: "Mathematics", designation: "Professor", phone: "9876501005", courses: 2 }
];

function showFacultyPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">FACULTY ADMINISTRATION</span>
                <h1>Faculty Management</h1>
                <p>Manage faculty profiles, departments and assignments.</p>
            </div>
            ${appState.selectedRole === "admin" ? `<button type="button" class="dashboard-button dashboard-button-primary" id="addFacultyButton">+ Add Faculty</button>` : ""}
        </div>

        <div class="faculty-summary">
            <div class="faculty-summary-card"><span>TOTAL FACULTY</span><strong>${facultyMembers.length}</strong></div>
            <div class="faculty-summary-card"><span>PROFESSORS</span><strong>${facultyMembers.filter(f => f.designation === "Professor").length}</strong></div>
            <div class="faculty-summary-card"><span>DEPARTMENTS</span><strong>${new Set(facultyMembers.map(f => f.department)).size}</strong></div>
            <div class="faculty-summary-card"><span>ASSIGNMENTS</span><strong>${facultyMembers.reduce((t, f) => t + f.courses, 0)}</strong></div>
        </div>

        <div class="dashboard-card">
            <div class="page-toolbar">
                <div class="page-toolbar-left">
                    <div class="search-box">
                        <span class="search-icon">⌕</span>
                        <input type="search" id="facultySearch" placeholder="Search faculty or ID...">
                    </div>
                    <select class="filter-select" id="facultyDepartmentFilter">
                        <option value="all">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                </div>
            </div>

            <div class="faculty-table-wrapper" id="facultyTableContainer">
                ${renderFacultyTable(facultyMembers)}
            </div>
        </div>
    `;

    initializeFacultyManagement();
}

function renderFacultyTable(data) {
    if (!data.length) {
        return `
            <div class="dashboard-empty">
                <div class="dashboard-empty-icon">⌕</div>
                <h3>No faculty found</h3>
            </div>
        `;
    }

    return `
        <table class="faculty-table">
            <thead>
                <tr>
                    <th>FACULTY</th>
                    <th>ID</th>
                    <th>DEPARTMENT</th>
                    <th>DESIGNATION</th>
                    <th>COURSES</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(faculty => `
                    <tr>
                        <td>
                            <div class="faculty-info">
                                <div class="faculty-avatar">${getInitials(faculty.name.replace(/^Dr\.\s*/, ""))}</div>
                                <div>
                                    <div class="faculty-name">${faculty.name}</div>
                                    <span class="faculty-id">${faculty.email}</span>
                                </div>
                            </div>
                        </td>
                        <td><span class="faculty-id">${faculty.id}</span></td>
                        <td>${faculty.department}</td>
                        <td><span class="faculty-designation">${faculty.designation}</span></td>
                        <td><strong>${faculty.courses}</strong></td>
                        <td>
                            <div class="faculty-actions">
                                <button type="button" class="student-action" data-faculty-action="view" data-faculty-id="${faculty.id}">👁</button>
                                ${appState.selectedRole === "admin" ? `
                                    <button type="button" class="student-action" data-faculty-action="edit" data-faculty-id="${faculty.id}">✎</button>
                                    <button type="button" class="student-action delete" data-faculty-action="delete" data-faculty-id="${faculty.id}">×</button>
                                ` : ""}
                            </div>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function initializeFacultyManagement() {
    const search = document.getElementById("facultySearch");
    const department = document.getElementById("facultyDepartmentFilter");
    const addButton = document.getElementById("addFacultyButton");

    function applyFacultyFilters() {
        const searchValue = search ? search.value.toLowerCase().trim() : "";
        const departmentValue = department ? department.value : "all";

        const filtered = facultyMembers.filter(faculty => {
            const matchesSearch = faculty.name.toLowerCase().includes(searchValue) ||
                faculty.id.toLowerCase().includes(searchValue) ||
                faculty.email.toLowerCase().includes(searchValue);
            const matchesDept = departmentValue === "all" || faculty.department === departmentValue;
            return matchesSearch && matchesDept;
        });

        const container = document.getElementById("facultyTableContainer");
        if (container) container.innerHTML = renderFacultyTable(filtered);
        initializeFacultyActions();
    }

    if (search) search.addEventListener("input", applyFacultyFilters);
    if (department) department.addEventListener("change", applyFacultyFilters);
    if (addButton) addButton.addEventListener("click", () => openFacultyModal());

    initializeFacultyActions();
}

function initializeFacultyActions() {
    document.querySelectorAll("[data-faculty-action]").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.facultyId;
            const action = button.dataset.facultyAction;
            const faculty = facultyMembers.find(f => f.id === id);
            if (!faculty) return;

            if (action === "view") showMessage(`${faculty.name} — ${faculty.department}`, "info");
            if (action === "edit") openFacultyModal(faculty);
            if (action === "delete") deleteFaculty(id);
        });
    });
}

function openFacultyModal(faculty = null) {
    const editing = faculty !== null;
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "facultyModal";

    modal.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h2>${editing ? "Edit Faculty" : "Add New Faculty"}</h2>
                <button type="button" class="modal-close" id="closeFacultyModal">×</button>
            </div>
            <form id="facultyForm">
                <div class="faculty-modal-grid">
                    <div class="form-group">
                        <label>Faculty ID</label>
                        <input type="text" id="facultyId" value="${faculty?.id || ""}" placeholder="FAC106" required ${editing ? "readonly" : ""}>
                    </div>
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="facultyName" value="${faculty?.name || ""}" placeholder="Dr. Name" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="facultyEmail" value="${faculty?.email || ""}" placeholder="faculty@campuscore.edu" required>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" id="facultyPhone" value="${faculty?.phone || ""}" placeholder="Phone number" required>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <select id="facultyDepartment">
                            ${["Computer Science", "Electronics", "Commerce", "Mathematics", "Physics"].map(dept => `
                                <option value="${dept}" ${faculty?.department === dept ? "selected" : ""}>${dept}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Designation</label>
                        <select id="facultyDesignation">
                            ${["Professor", "Associate Professor", "Assistant Professor"].map(des => `
                                <option value="${des}" ${faculty?.designation === des ? "selected" : ""}>${des}</option>
                            `).join("")}
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-button cancel" id="cancelFacultyModal">Cancel</button>
                    <button type="submit" class="modal-button save">${editing ? "Save Changes" : "Add Faculty"}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("closeFacultyModal").addEventListener("click", () => modal.remove());
    document.getElementById("cancelFacultyModal").addEventListener("click", () => modal.remove());
    document.getElementById("facultyForm").addEventListener("submit", event => {
        event.preventDefault();
        saveFaculty(faculty?.id || null);
    });
}

function saveFaculty(existingId) {
    const id = document.getElementById("facultyId").value.trim().toUpperCase();
    const name = document.getElementById("facultyName").value.trim();
    const email = document.getElementById("facultyEmail").value.trim();
    const phone = document.getElementById("facultyPhone").value.trim();
    const department = document.getElementById("facultyDepartment").value;
    const designation = document.getElementById("facultyDesignation").value;

    if (!id || !name || !email || !phone) {
        showMessage("Please complete all required fields.", "error");
        return;
    }

    if (existingId) {
        const faculty = facultyMembers.find(f => f.id === existingId);
        if (faculty) {
            faculty.name = name;
            faculty.email = email;
            faculty.phone = phone;
            faculty.department = department;
            faculty.designation = designation;
        }
        showMessage("Faculty updated successfully.", "success");
    } else {
        if (facultyMembers.some(f => f.id === id)) {
            showMessage("Faculty ID already exists.", "error");
            return;
        }
        facultyMembers.push({ id, name, email, department, designation, phone, courses: 0 });
        showMessage("Faculty added successfully.", "success");
    }

    document.getElementById("facultyModal")?.remove();
    showFacultyPage();
}

function deleteFaculty(id) {
    const faculty = facultyMembers.find(f => f.id === id);
    if (!faculty || !confirm(`Delete ${faculty.name} (${faculty.id})?`)) return;

    facultyMembers = facultyMembers.filter(f => f.id !== id);
    showMessage("Faculty deleted successfully.", "success");
    showFacultyPage();
}

/* =====================================================
   12. COURSES DATA & MANAGEMENT
===================================================== */

let courses = [
    { code: "CS301", name: "Data Structures", department: "Computer Science", semester: "Semester 3", credits: 4, faculty: "Dr. Anjali Rao", students: 46 },
    { code: "CS302", name: "Java Programming", department: "Computer Science", semester: "Semester 3", credits: 4, faculty: "Dr. Anjali Rao", students: 52 },
    { code: "CS303", name: "Object Oriented Programming", department: "Computer Science", semester: "Semester 3", credits: 3, faculty: "Dr. Arun Das", students: 48 },
    { code: "EC301", name: "Digital Electronics", department: "Electronics", semester: "Semester 3", credits: 4, faculty: "Dr. Rahul Menon", students: 41 },
    { code: "CM501", name: "Financial Management", department: "Commerce", semester: "Semester 5", credits: 3, faculty: "Prof. Sneha Thomas", students: 44 },
    { code: "MA101", name: "Engineering Mathematics", department: "Mathematics", semester: "Semester 1", credits: 4, faculty: "Dr. Vivek Kumar", students: 63 }
];

function showCoursesPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ACADEMICS</span>
                <h1>Course Management</h1>
                <p>Manage courses, credits, faculty allocation and enrollment.</p>
            </div>
            ${appState.selectedRole === "admin" ? `<button type="button" class="dashboard-button dashboard-button-primary" id="addCourseButton">+ Add Course</button>` : ""}
        </div>

        <div class="course-summary">
            <div class="course-summary-card"><span>TOTAL COURSES</span><strong>${courses.length}</strong></div>
            <div class="course-summary-card"><span>DEPARTMENTS</span><strong>${new Set(courses.map(c => c.department)).size}</strong></div>
            <div class="course-summary-card"><span>TOTAL CREDITS</span><strong>${courses.reduce((s, c) => s + Number(c.credits), 0)}</strong></div>
            <div class="course-summary-card"><span>ENROLLED STUDENTS</span><strong>${courses.reduce((s, c) => s + Number(c.students), 0)}</strong></div>
        </div>

        <div class="dashboard-card">
            <div class="page-toolbar">
                <div class="page-toolbar-left">
                    <div class="search-box">
                        <span class="search-icon">⌕</span>
                        <input type="search" id="courseSearch" placeholder="Search course or code...">
                    </div>
                    <select class="filter-select" id="courseDepartmentFilter">
                        <option value="all">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                </div>
            </div>

            <div class="course-table-wrapper" id="courseTableContainer">
                ${renderCourseTable(courses)}
            </div>
        </div>
    `;

    initializeCourseManagement();
}

function renderCourseTable(data) {
    if (!data.length) {
        return `<div class="dashboard-empty"><h3>No courses found</h3></div>`;
    }

    return `
        <table class="course-table">
            <thead>
                <tr>
                    <th>COURSE</th>
                    <th>DEPARTMENT</th>
                    <th>SEMESTER</th>
                    <th>FACULTY</th>
                    <th>CREDITS</th>
                    <th>STUDENTS</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(course => `
                    <tr>
                        <td>
                            <span class="course-code">${course.code}</span>
                            <div class="course-name" style="margin-top:6px">${course.name}</div>
                        </td>
                        <td>${course.department}</td>
                        <td>${course.semester}</td>
                        <td class="course-faculty">${course.faculty}</td>
                        <td class="course-credits">${course.credits}</td>
                        <td class="course-students">${course.students}</td>
                        <td>
                            <div class="course-actions">
                                <button type="button" class="student-action" data-course-action="view" data-course-code="${course.code}">👁</button>
                                ${appState.selectedRole === "admin" ? `
                                    <button type="button" class="student-action" data-course-action="edit" data-course-code="${course.code}">✎</button>
                                    <button type="button" class="student-action delete" data-course-action="delete" data-course-code="${course.code}">×</button>
                                ` : ""}
                            </div>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function initializeCourseManagement() {
    const search = document.getElementById("courseSearch");
    const department = document.getElementById("courseDepartmentFilter");
    const addButton = document.getElementById("addCourseButton");

    function applyCourseFilters() {
        const searchValue = search ? search.value.toLowerCase().trim() : "";
        const departmentValue = department ? department.value : "all";

        const filtered = courses.filter(course => {
            const matchesSearch = course.name.toLowerCase().includes(searchValue) || course.code.toLowerCase().includes(searchValue);
            const matchesDept = departmentValue === "all" || course.department === departmentValue;
            return matchesSearch && matchesDept;
        });

        const table = document.getElementById("courseTableContainer");
        if (table) table.innerHTML = renderCourseTable(filtered);
        initializeCourseActions();
    }

    if (search) search.addEventListener("input", applyCourseFilters);
    if (department) department.addEventListener("change", applyCourseFilters);
    if (addButton) addButton.addEventListener("click", () => openCourseModal());

    initializeCourseActions();
}

function initializeCourseActions() {
    document.querySelectorAll("[data-course-action]").forEach(button => {
        button.addEventListener("click", () => {
            const code = button.dataset.courseCode;
            const action = button.dataset.courseAction;
            const course = courses.find(c => c.code === code);
            if (!course) return;

            if (action === "view") showMessage(`${course.code}: ${course.name} - Faculty: ${course.faculty}`, "info");
            if (action === "edit") openCourseModal(course);
            if (action === "delete") deleteCourse(code);
        });
    });
}

function openCourseModal(course = null) {
    const editing = course !== null;
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "courseModal";

    modal.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h2>${editing ? "Edit Course" : "Add New Course"}</h2>
                <button type="button" class="modal-close" id="closeCourseModal">×</button>
            </div>
            <form id="courseForm">
                <div class="course-modal-grid">
                    <div class="form-group">
                        <label>Course Code</label>
                        <input type="text" id="courseCode" value="${course?.code || ""}" placeholder="CS401" required ${editing ? "readonly" : ""}>
                    </div>
                    <div class="form-group">
                        <label>Course Name</label>
                        <input type="text" id="courseName" value="${course?.name || ""}" placeholder="Course Name" required>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <select id="courseDepartment">
                            ${["Computer Science", "Electronics", "Commerce", "Mathematics", "Physics"].map(dept => `
                                <option value="${dept}" ${course?.department === dept ? "selected" : ""}>${dept}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Semester</label>
                        <select id="courseSemester">
                            ${["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"].map(sem => `
                                <option value="${sem}" ${course?.semester === sem ? "selected" : ""}>${sem}</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Credits</label>
                        <select id="courseCredits">
                            ${[1, 2, 3, 4, 5, 6].map(cr => `
                                <option value="${cr}" ${Number(course?.credits) === cr ? "selected" : ""}>${cr} Credits</option>
                            `).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Assigned Faculty</label>
                        <select id="courseFaculty">
                            ${facultyMembers.map(f => `
                                <option value="${f.name}" ${course?.faculty === f.name ? "selected" : ""}>${f.name}</option>
                            `).join("")}
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-button cancel" id="cancelCourseModal">Cancel</button>
                    <button type="submit" class="modal-button save">${editing ? "Save Changes" : "Add Course"}</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("closeCourseModal").addEventListener("click", () => modal.remove());
    document.getElementById("cancelCourseModal").addEventListener("click", () => modal.remove());
    document.getElementById("courseForm").addEventListener("submit", event => {
        event.preventDefault();
        saveCourse(course?.code || null);
    });
}

function saveCourse(existingCode) {
    const code = document.getElementById("courseCode").value.trim().toUpperCase();
    const name = document.getElementById("courseName").value.trim();
    const department = document.getElementById("courseDepartment").value;
    const semester = document.getElementById("courseSemester").value;
    const credits = Number(document.getElementById("courseCredits").value);
    const faculty = document.getElementById("courseFaculty").value;

    if (!code || !name) {
        showMessage("Please enter all required details.", "error");
        return;
    }

    if (existingCode) {
        const course = courses.find(c => c.code === existingCode);
        if (course) {
            course.name = name;
            course.department = department;
            course.semester = semester;
            course.credits = credits;
            course.faculty = faculty;
        }
        showMessage("Course updated successfully.", "success");
    } else {
        if (courses.some(c => c.code === code)) {
            showMessage("Course code already exists.", "error");
            return;
        }
        courses.push({ code, name, department, semester, credits, faculty, students: 0 });
        showMessage("Course added successfully.", "success");
    }

    document.getElementById("courseModal")?.remove();
    showCoursesPage();
}

function deleteCourse(code) {
    const course = courses.find(c => c.code === code);
    if (!course || !confirm(`Delete ${course.name} (${course.code})?`)) return;

    courses = courses.filter(c => c.code !== code);
    showMessage("Course deleted successfully.", "success");
    showCoursesPage();
}

/* =====================================================
   13. ATTENDANCE MANAGEMENT
===================================================== */

let attendanceRecords = {
    "2026-08-31": {
        "CS301": { "STU202401": "Present", "STU202402": "Present", "STU202403": "Absent", "STU202404": "Present", "STU202405": "Present" },
        "CS302": { "STU202401": "Present", "STU202402": "Absent", "STU202403": "Present", "STU202404": "Present", "STU202405": "Present" },
        "EC301": { "STU202401": "Present", "STU202402": "Present", "STU202403": "Present", "STU202404": "Absent", "STU202405": "Present" }
    }
};

function showAttendancePage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;
    const today = new Date().toISOString().split("T")[0];

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ACADEMICS</span>
                <h1>Attendance Management</h1>
                <p>Record and monitor student attendance by course and date.</p>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="page-toolbar-left" style="gap:15px; flex-wrap:wrap;">
                <div class="form-group" style="margin-bottom:0;">
                    <label>Select Course</label>
                    <select id="attendanceCourse" class="filter-select">
                        ${courses.map(c => `<option value="${c.code}">${c.code} — ${c.name}</option>`).join("")}
                    </select>
                </div>
                <div class="form-group" style="margin-bottom:0;">
                    <label>Attendance Date</label>
                    <input type="date" id="attendanceDate" value="${today}" class="filter-select">
                </div>
                <button type="button" class="dashboard-button dashboard-button-primary" id="loadAttendanceButton" style="align-self:flex-end;">Load Attendance</button>
            </div>
        </div>

        <div class="dashboard-card" id="attendanceTableCard">
            ${renderAttendanceTable(courses[0]?.code, today)}
        </div>
    `;

    initializeAttendanceEvents();
}

function renderAttendanceTable(courseCode, date) {
    const course = courses.find(c => c.code === courseCode);
    if (!course) return `<div class="dashboard-empty"><h3>No course selected</h3></div>`;

    const records = attendanceRecords[date]?.[courseCode] || {};
    const presentCount = students.filter(s => records[s.id] === "Present").length;
    const absentCount = students.filter(s => records[s.id] === "Absent").length;

    return `
        <div class="dashboard-card-header">
            <div>
                <span class="section-label">${course.code}</span>
                <h3>${course.name}</h3>
            </div>
            <div>
                <span>Present: <strong>${presentCount}</strong> | Absent: <strong>${absentCount}</strong></span>
            </div>
        </div>

        <div class="student-table-wrapper">
            <table class="student-table">
                <thead>
                    <tr>
                        <th>STUDENT</th>
                        <th>ID</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(student => {
                        const status = records[student.id] || "Present";
                        return `
                            <tr>
                                <td>
                                    <div class="student-info">
                                        <div class="student-avatar">${getInitials(student.name)}</div>
                                        <div>
                                            <div class="student-name">${student.name}</div>
                                            <span class="student-id">${student.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>${student.id}</td>
                                <td>
                                    <button type="button" class="table-action ${status === "Present" ? "dashboard-button-primary" : ""}" data-attendance-status="Present" data-student-id="${student.id}" data-course-code="${courseCode}" data-attendance-date="${date}">Present</button>
                                    <button type="button" class="table-action ${status === "Absent" ? "dashboard-button-primary" : ""}" data-attendance-status="Absent" data-student-id="${student.id}" data-course-code="${courseCode}" data-attendance-date="${date}">Absent</button>
                                </td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        </div>

        <div style="margin-top:15px; text-align:right;">
            <button type="button" class="dashboard-button dashboard-button-primary" id="saveAttendanceButton">Save Attendance</button>
        </div>
    `;
}

function initializeAttendanceEvents() {
    const loadButton = document.getElementById("loadAttendanceButton");
    if (loadButton) {
        loadButton.addEventListener("click", () => {
            const course = document.getElementById("attendanceCourse")?.value;
            const date = document.getElementById("attendanceDate")?.value;
            const tableCard = document.getElementById("attendanceTableCard");
            if (tableCard && course && date) {
                tableCard.innerHTML = renderAttendanceTable(course, date);
                initializeAttendanceStatusButtons();
                initializeSaveAttendance();
            }
        });
    }

    initializeAttendanceStatusButtons();
    initializeSaveAttendance();
}

function initializeAttendanceStatusButtons() {
    document.querySelectorAll("[data-attendance-status]").forEach(button => {
        button.addEventListener("click", () => {
            const studentId = button.dataset.studentId;
            const status = button.dataset.attendanceStatus;
            const courseCode = button.dataset.courseCode;
            const date = button.dataset.attendanceDate;

            if (!attendanceRecords[date]) attendanceRecords[date] = {};
            if (!attendanceRecords[date][courseCode]) attendanceRecords[date][courseCode] = {};
            attendanceRecords[date][courseCode][studentId] = status;

            const row = button.closest("tr");
            if (row) {
                row.querySelectorAll("[data-attendance-status]").forEach(btn => btn.classList.remove("dashboard-button-primary"));
                button.classList.add("dashboard-button-primary");
            }
        });
    });
}

function initializeSaveAttendance() {
    const button = document.getElementById("saveAttendanceButton");
    if (button) {
        button.addEventListener("click", () => {
            showMessage("Attendance saved successfully.", "success");
        });
    }
}

/* =====================================================
   14. INTERNAL MARKS MANAGEMENT
===================================================== */

let internalMarks = {
    "STU202401": {
        "CS301": { internal1: 18, internal2: 17, assignment: 9 },
        "CS302": { internal1: 19, internal2: 18, assignment: 10 }
    },
    "STU202402": {
        "CS301": { internal1: 16, internal2: 18, assignment: 8 },
        "CS302": { internal1: 17, internal2: 16, assignment: 9 }
    },
    "STU202403": {
        "EC301": { internal1: 18, internal2: 19, assignment: 9 }
    }
};

function showMarksPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ACADEMICS</span>
                <h1>Internal Marks</h1>
                <p>Manage internal examination marks and student assessments.</p>
            </div>
            <button type="button" class="dashboard-button dashboard-button-primary" id="saveMarksButton">Save Marks</button>
        </div>

        <div class="dashboard-card">
            <div class="page-toolbar-left" style="gap:15px;">
                <div class="form-group" style="margin-bottom:0;">
                    <label>Select Course</label>
                    <select id="marksCourse" class="filter-select">
                        ${courses.map(c => `<option value="${c.code}">${c.code} — ${c.name}</option>`).join("")}
                    </select>
                </div>
                <div class="form-group" style="margin-bottom:0;">
                    <label>Assessment</label>
                    <select id="marksAssessment" class="filter-select">
                        <option value="internal1">Internal Examination 1</option>
                        <option value="internal2">Internal Examination 2</option>
                        <option value="assignment">Assignment</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="dashboard-card" id="marksTableCard">
            ${renderMarksTable(courses[0]?.code, "internal1")}
        </div>
    `;

    initializeMarksEvents();
}

function renderMarksTable(courseCode, assessment) {
    const course = courses.find(c => c.code === courseCode);
    if (!course) return `<div class="dashboard-empty"><h3>No course selected</h3></div>`;
    const maximum = assessment === "assignment" ? 10 : 20;

    return `
        <div class="dashboard-card-header">
            <div>
                <span class="section-label">${course.code}</span>
                <h3>${course.name}</h3>
            </div>
        </div>

        <div class="student-table-wrapper">
            <table class="student-table">
                <thead>
                    <tr>
                        <th>STUDENT</th>
                        <th>STUDENT ID</th>
                        <th>MARK (MAX: ${maximum})</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(student => {
                        const mark = internalMarks[student.id]?.[courseCode]?.[assessment] ?? "";
                        return `
                            <tr>
                                <td>
                                    <div class="student-info">
                                        <div class="student-avatar">${getInitials(student.name)}</div>
                                        <div>
                                            <div class="student-name">${student.name}</div>
                                            <span class="student-id">${student.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>${student.id}</td>
                                <td>
                                    <input type="number" min="0" max="${maximum}" value="${mark}" class="filter-select" style="width:90px;"
                                        data-mark-input="true" data-student-id="${student.id}" data-course-code="${courseCode}" data-assessment="${assessment}">
                                </td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function initializeMarksEvents() {
    const courseSelect = document.getElementById("marksCourse");
    const assessmentSelect = document.getElementById("marksAssessment");
    const saveButton = document.getElementById("saveMarksButton");

    function loadMarks() {
        const tableCard = document.getElementById("marksTableCard");
        if (tableCard && courseSelect && assessmentSelect) {
            tableCard.innerHTML = renderMarksTable(courseSelect.value, assessmentSelect.value);
        }
    }

    if (courseSelect) courseSelect.addEventListener("change", loadMarks);
    if (assessmentSelect) assessmentSelect.addEventListener("change", loadMarks);
    if (saveButton) saveButton.addEventListener("click", saveInternalMarks);
}

function saveInternalMarks() {
    const inputs = document.querySelectorAll("[data-mark-input]");
    inputs.forEach(input => {
        const sId = input.dataset.studentId;
        const cCode = input.dataset.courseCode;
        const assess = input.dataset.assessment;
        const val = input.value === "" ? 0 : Number(input.value);

        if (!internalMarks[sId]) internalMarks[sId] = {};
        if (!internalMarks[sId][cCode]) internalMarks[sId][cCode] = {};
        internalMarks[sId][cCode][assess] = val;
    });

    showMessage("Internal marks saved successfully.", "success");
}

/* =====================================================
   15. FEES MANAGEMENT
===================================================== */

let feeRecords = [
    { studentId: "STU202401", studentName: "Meera Nair", department: "Computer Science", totalFee: 45000, paid: 45000, status: "Paid" },
    { studentId: "STU202402", studentName: "Arjun Kumar", department: "Computer Science", totalFee: 45000, paid: 30000, status: "Pending" },
    { studentId: "STU202403", studentName: "Ananya Thomas", department: "Electronics", totalFee: 48000, paid: 48000, status: "Paid" },
    { studentId: "STU202404", studentName: "Rahul Menon", department: "Commerce", totalFee: 40000, paid: 20000, status: "Pending" },
    { studentId: "STU202405", studentName: "Diya Joseph", department: "Mathematics", totalFee: 42000, paid: 42000, status: "Paid" }
];

function showFeesPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    const totalCollected = feeRecords.reduce((t, r) => t + r.paid, 0);
    const totalAmount = feeRecords.reduce((t, r) => t + r.totalFee, 0);
    const totalDue = totalAmount - totalCollected;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">FINANCE</span>
                <h1>Fees & Payments</h1>
                <p>Track student tuition fees, receipts and dues.</p>
            </div>
        </div>

        <div class="faculty-summary">
            <div class="faculty-summary-card"><span>TOTAL FEE</span><strong>₹${totalAmount.toLocaleString("en-IN")}</strong></div>
            <div class="faculty-summary-card"><span>COLLECTED</span><strong>₹${totalCollected.toLocaleString("en-IN")}</strong></div>
            <div class="faculty-summary-card"><span>PENDING DUES</span><strong>₹${totalDue.toLocaleString("en-IN")}</strong></div>
            <div class="faculty-summary-card"><span>COLLECTION %</span><strong>${Math.round((totalCollected/totalAmount)*100)}%</strong></div>
        </div>

        <div class="dashboard-card">
            <div class="student-table-wrapper">
                <table class="student-table">
                    <thead>
                        <tr>
                            <th>STUDENT</th>
                            <th>TOTAL FEE</th>
                            <th>PAID AMOUNT</th>
                            <th>BALANCE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${feeRecords.map(record => `
                            <tr>
                                <td>
                                    <strong>${record.studentName}</strong>
                                    <span class="student-id">${record.studentId} • ${record.department}</span>
                                </td>
                                <td>₹${record.totalFee.toLocaleString("en-IN")}</td>
                                <td>₹${record.paid.toLocaleString("en-IN")}</td>
                                <td>₹${(record.totalFee - record.paid).toLocaleString("en-IN")}</td>
                                <td><span class="status-badge ${record.status === 'Paid' ? '' : 'inactive'}">${record.status}</span></td>
                                <td>
                                    ${record.status !== 'Paid' && appState.selectedRole === 'admin' ? `
                                        <button type="button" class="table-action" onclick="collectFee('${record.studentId}')">Mark Paid</button>
                                    ` : '—'}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

window.collectFee = function(studentId) {
    const rec = feeRecords.find(r => r.studentId === studentId);
    if (rec) {
        rec.paid = rec.totalFee;
        rec.status = "Paid";
        showMessage(`Payment updated for ${rec.studentName}`, "success");
        showFeesPage();
    }
};

/* =====================================================
   16. ANNOUNCEMENTS MANAGEMENT
===================================================== */

let announcements = [
    { id: 1, title: "Internal Examination Schedule", message: "The internal examination schedule has been published.", category: "Academic", date: "2026-08-30", author: "Administration" },
    { id: 2, title: "College Reopening Notice", message: "Regular academic classes will commence from next Monday.", category: "General", date: "2026-08-28", author: "Administration" },
    { id: 3, title: "Fee Payment Reminder", message: "Pending fees must be cleared on or before the due date.", category: "Finance", date: "2026-08-25", author: "Accounts Department" }
];

function showAnnouncementsPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ADMINISTRATION</span>
                <h1>Announcements</h1>
                <p>Publish and view notices across the campus.</p>
            </div>
            ${appState.selectedRole === "admin" ? `<button type="button" class="dashboard-button dashboard-button-primary" id="addAnnouncementButton">+ New Announcement</button>` : ""}
        </div>

        <div class="announcement-list">
            ${announcements.map(a => `
                <div class="dashboard-card" style="margin-bottom:15px;">
                    <div class="dashboard-card-header">
                        <div>
                            <span class="section-label">${a.category}</span>
                            <h3>${a.title}</h3>
                        </div>
                        <span>${a.date}</span>
                    </div>
                    <p style="color:#66727f; font-size:13px; line-height:1.6;">${a.message}</p>
                    <div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center;">
                        <small style="color:#929ca6;">By <strong>${a.author}</strong></small>
                        ${appState.selectedRole === "admin" ? `<button type="button" class="student-action delete" onclick="deleteAnnouncement(${a.id})">×</button>` : ""}
                    </div>
                </div>
            `).join("")}
        </div>
    `;

    const addBtn = document.getElementById("addAnnouncementButton");
    if (addBtn) addBtn.addEventListener("click", openAnnouncementModal);
}

function openAnnouncementModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "announcementModal";

    modal.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h2>New Announcement</h2>
                <button type="button" class="modal-close" id="closeAnnModal">×</button>
            </div>
            <form id="annForm">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="annTitle" placeholder="Title" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select id="annCategory" class="filter-select" style="width:100%;">
                        <option>Academic</option>
                        <option>General</option>
                        <option>Finance</option>
                        <option>Faculty</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea id="annMessage" rows="4" style="width:100%; border:1px solid #dfe5eb; border-radius:10px; padding:10px;" required></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-button cancel" id="cancelAnnModal">Cancel</button>
                    <button type="submit" class="modal-button save">Publish</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("closeAnnModal").addEventListener("click", () => modal.remove());
    document.getElementById("cancelAnnModal").addEventListener("click", () => modal.remove());
    document.getElementById("annForm").addEventListener("submit", e => {
        e.preventDefault();
        announcements.unshift({
            id: Date.now(),
            title: document.getElementById("annTitle").value.trim(),
            category: document.getElementById("annCategory").value,
            message: document.getElementById("annMessage").value.trim(),
            date: new Date().toISOString().split("T")[0],
            author: appState.currentUser?.name || "Admin"
        });
        modal.remove();
        showMessage("Announcement published.", "success");
        showAnnouncementsPage();
    });
}

window.deleteAnnouncement = function(id) {
    if (!confirm("Delete this announcement?")) return;
    announcements = announcements.filter(a => a.id !== id);
    showMessage("Announcement removed.", "success");
    showAnnouncementsPage();
};

/* =====================================================
   17. REPORTS & ANALYTICS
===================================================== */

function showReportsPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    const totalCollected = feeRecords.reduce((t, r) => t + r.paid, 0);
    const totalOutstanding = feeRecords.reduce((t, r) => t + (r.totalFee - r.paid), 0);

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">REPORTS & ANALYTICS</span>
                <h1>Reports & Analytics</h1>
                <p>Institutional metrics and performance overview.</p>
            </div>
            <button type="button" class="dashboard-button dashboard-button-primary" onclick="window.print()">Print Report</button>
        </div>

        <div class="faculty-summary">
            <div class="faculty-summary-card"><span>TOTAL STUDENTS</span><strong>${students.length}</strong></div>
            <div class="faculty-summary-card"><span>TOTAL FACULTY</span><strong>${facultyMembers.length}</strong></div>
            <div class="faculty-summary-card"><span>COURSES</span><strong>${courses.length}</strong></div>
            <div class="faculty-summary-card"><span>ATTENDANCE</span><strong>${getAverageAttendance()}%</strong></div>
        </div>

        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="dashboard-card-header"><h3>Department Distribution</h3></div>
                <div class="department-list">
                    ${["Computer Science", "Electronics", "Commerce", "Mathematics"].map(dept => {
                        const count = students.filter(s => s.department === dept).length;
                        const pct = Math.round((count / (students.length || 1)) * 100);
                        return `
                            <div class="department-row">
                                <span class="department-name">${dept}</span>
                                <div class="department-track"><div class="department-fill" style="width:${pct}%"></div></div>
                                <span class="department-value">${count}</span>
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>

            <div class="dashboard-card">
                <div class="dashboard-card-header"><h3>Fee Status Breakdown</h3></div>
                <div class="profile-info-list">
                    <div class="profile-info-row"><span>Total Collected</span><strong>₹${totalCollected.toLocaleString("en-IN")}</strong></div>
                    <div class="profile-info-row"><span>Total Outstanding</span><strong>₹${totalOutstanding.toLocaleString("en-IN")}</strong></div>
                </div>
            </div>
        </div>
    `;
}

/* =====================================================
   18. PROFILE & SETTINGS
===================================================== */

function showProfilePage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;
    const user = appState.currentUser || users[appState.selectedRole];

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ACCOUNT</span>
                <h1>My Profile</h1>
            </div>
        </div>

        <div class="dashboard-card" style="max-width:600px;">
            <div class="faculty-profile" style="margin-bottom:20px;">
                <div class="faculty-profile-avatar">${user.initials || "U"}</div>
                <div>
                    <h3>${user.name}</h3>
                    <p>${user.role}</p>
                </div>
            </div>
            <div class="profile-info-list">
                <div class="profile-info-row"><span>User ID</span><strong>${user.userId || user.id || "N/A"}</strong></div>
                <div class="profile-info-row"><span>Email</span><strong>${user.email || "N/A"}</strong></div>
                <div class="profile-info-row"><span>Role</span><strong>${user.role || "User"}</strong></div>
            </div>
        </div>
    `;
}

function showSettingsPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">SYSTEM</span>
                <h1>Settings</h1>
            </div>
        </div>
        <div class="dashboard-card" style="max-width:600px;">
            <p style="color:#66727f; font-size:13px;">System configuration and user preferences.</p>
            <div style="margin-top:20px;">
                <button type="button" class="dashboard-button dashboard-button-primary" onclick="showMessage('Settings saved', 'success')">Save Preferences</button>
            </div>
        </div>
    `;
}

function showNotifications() {
    showMessage("No new unread notifications.", "info");
}

/* =====================================================
   19. HELPERS
===================================================== */

function getStudentMarks(studentId) {
    const recs = internalMarks[studentId] || {};
    let total = 0;
    Object.values(recs).forEach(course => {
        Object.values(course).forEach(mark => {
            total += Number(mark);
        });
    });
    return { total };
}

function getStudentCourseCount(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return 0;
    return courses.filter(c => c.department === student.department).length;
}

function getStudentFeeStatus(studentId) {
    const rec = feeRecords.find(f => f.studentId === studentId);
    return rec ? rec.status : "Paid";
}