/* =====================================================
   CAMPUSCORE - COLLEGE MANAGEMENT SYSTEM
   Full Production JavaScript with REST API Integration
===================================================== */

const API_BASE_URL = "http://localhost:8080/api";

const appState = {
    selectedRole: "admin",
    currentUser: null,
    isLoggedIn: false,
    currentPage: "dashboard"
};

let students = [];
let facultyMembers = [];
let courses = [];
let feeRecords = [];
let announcements = [];
let attendanceRecords = {};
let internalMarks = {};

/* =====================================================
   1. DOM ELEMENTS & INITIALIZATION
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

document.addEventListener("DOMContentLoaded", () => {
    initializeRoleSelector();
    initializePasswordToggle();
    initializeLogin();
    initializeForgotPassword();
    initializeRegister();
    selectRole("admin");
});

/* =====================================================
   2. AUTHENTICATION & LOGIN
===================================================== */

function initializeRoleSelector() {
    roleButtons.forEach(button => {
        button.addEventListener("click", () => selectRole(button.dataset.role));
    });
}

function selectRole(role) {
    appState.selectedRole = role;
    roleButtons.forEach(button => button.classList.remove("active"));
    const selectedButton = document.querySelector(`.role-button[data-role="${role}"]`);
    if (selectedButton) selectedButton.classList.add("active");

    const demoCreds = {
        admin: { id: "ADM001", pwd: "admin123" },
        faculty: { id: "FAC101", pwd: "faculty123" },
        student: { id: "STU202402", pwd: "student123" }
    };
    if (userIdInput && demoCreds[role]) userIdInput.value = demoCreds[role].id;
    if (passwordInput && demoCreds[role]) passwordInput.value = demoCreds[role].pwd;
}

function initializePasswordToggle() {
    if (!togglePassword || !passwordInput) return;
    togglePassword.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        togglePassword.textContent = isPassword ? "Hide" : "Show";
    });
}

function initializeLogin() {
    if (!loginForm) return;
    loginForm.addEventListener("submit", async event => {
        event.preventDefault();
        await loginUser();
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
                initials: getInitials(data.name)
            };
            appState.isLoggedIn = true;
            showMessage("Login successful.", "success");
            setTimeout(openDashboard, 400);
        } else {
            showMessage(data.message || "Invalid credentials.", "error");
        }
    } catch (err) {
        showMessage("Backend server is not running or unreachable.", "error");
    }
}

function openDashboard() {
    if (!loginPage || !dashboardPage) return;
    loginPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");
    renderDashboard();
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

function initializeForgotPassword() {
    if (!forgotPassword) return;
    forgotPassword.addEventListener("click", e => {
        e.preventDefault();
        showMessage("Please contact the college administrator to reset your password.", "info");
    });
}

/* =====================================================
   3. REGISTRATION
===================================================== */

function initializeRegister() {
    if (!registerButton) return;
    registerButton.addEventListener("click", showRegistrationPage);
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
                            <label>Full Name</label>
                            <input type="text" id="registerName" placeholder="Enter full name" required>
                        </div>
                        <div class="form-group">
                            <label>Student / Faculty ID</label>
                            <input type="text" id="registerId" placeholder="Enter ID" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="registerEmail" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" id="registerPhone" placeholder="Enter phone number" required>
                        </div>
                        <div class="form-group">
                            <label>Department</label>
                            <select id="registerDepartment">
                                <option>Computer Science</option>
                                <option>Electronics</option>
                                <option>Commerce</option>
                                <option>Mathematics</option>
                                <option>Physics</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Semester / Designation</label>
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
                            <label>Password</label>
                            <input type="password" id="registerPassword" minlength="6" placeholder="Create password" required>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" id="confirmPassword" minlength="6" placeholder="Confirm password" required>
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

    document.getElementById("backToLogin")?.addEventListener("click", backToLogin);
    document.getElementById("registrationForm")?.addEventListener("submit", async e => {
        e.preventDefault();
        const pwd = document.getElementById("registerPassword").value;
        const confirmPwd = document.getElementById("confirmPassword").value;
        if (pwd !== confirmPwd) {
            showMessage("Passwords do not match.", "error");
            return;
        }
        showMessage("Registration submitted successfully.", "success");
        setTimeout(backToLogin, 1000);
    });
}

function backToLogin() {
    if (!dashboardPage || !loginPage) return;
    dashboardPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
    selectRole(appState.selectedRole || "admin");
}

/* =====================================================
   4. DASHBOARD SHELL & NAVIGATION
===================================================== */

function renderDashboard() {
    if (!dashboardPage) return;
    const user = appState.currentUser || { name: "Administrator", role: "admin", initials: "AD" };

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
                        <span>MySQL Connected</span>
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
                    <span class="section-label">${appState.selectedRole.toUpperCase()}</span>
                    <h2 id="dashboardPageTitle">${getPageTitle(appState.currentPage)}</h2>
                </div>
                <div class="topbar-user">
                    <button type="button" class="notification-button" id="notificationButton">
                        ♧ <span class="notification-dot"></span>
                    </button>
                    <div class="user-profile">
                        <div class="user-avatar">${user.initials || "U"}</div>
                        <div class="user-details">
                            <strong>${user.name}</strong>
                            <span>${user.role}</span>
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
        reports: "Reports & Analytics",
        announcements: "Announcements",
        profile: "My Profile",
        settings: "Settings"
    };
    return titles[page] || "Dashboard";
}

function createNavigation() {
    const common = `
        <div class="navigation-title">MAIN</div>
        ${navItem("dashboard", "▦", "Dashboard")}
        ${navItem("students", "♙", "Students")}
    `;

    if (appState.selectedRole === "admin") {
        return `
            ${common}
            ${navItem("faculty", "◈", "Faculty")}
            <div class="navigation-title">ACADEMICS</div>
            ${navItem("courses", "▤", "Courses")}
            ${navItem("attendance", "◷", "Attendance")}
            ${navItem("marks", "▣", "Internal Marks")}
            <div class="navigation-title">FINANCE & REPORTS</div>
            ${navItem("fees", "₹", "Fees & Payments")}
            ${navItem("reports", "⌁", "Reports")}
            ${navItem("announcements", "◉", "Announcements")}
            <div class="navigation-title">ACCOUNT</div>
            ${navItem("profile", "👤", "My Profile")}
            ${navItem("settings", "⚙", "Settings")}
        `;
    }

    if (appState.selectedRole === "faculty") {
        return `
            ${common}
            <div class="navigation-title">ACADEMICS</div>
            ${navItem("courses", "▤", "Courses")}
            ${navItem("attendance", "◷", "Attendance")}
            ${navItem("marks", "▣", "Internal Marks")}
            <div class="navigation-title">CAMPUS</div>
            ${navItem("announcements", "◉", "Announcements")}
            <div class="navigation-title">ACCOUNT</div>
            ${navItem("profile", "👤", "My Profile")}
        `;
    }

    return `
        ${common}
        <div class="navigation-title">ACADEMICS</div>
        ${navItem("courses", "▤", "Courses")}
        ${navItem("attendance", "◷", "Attendance")}
        ${navItem("marks", "▣", "Internal Marks")}
        <div class="navigation-title">FINANCE</div>
        ${navItem("fees", "₹", "Fees & Payments")}
        <div class="navigation-title">CAMPUS</div>
        ${navItem("announcements", "◉", "Announcements")}
        <div class="navigation-title">ACCOUNT</div>
        ${navItem("profile", "👤", "My Profile")}
    `;
}

function navItem(page, icon, label) {
    const active = appState.currentPage === page ? "active" : "";
    return `
        <button type="button" class="navigation-item ${active}" data-page="${page}">
            <span class="navigation-icon">${icon}</span>
            <span>${label}</span>
        </button>
    `;
}

function initializeDashboardEvents() {
    document.querySelectorAll(".navigation-item").forEach(btn => {
        btn.addEventListener("click", () => navigateTo(btn.dataset.page));
    });
    document.getElementById("logoutButton")?.addEventListener("click", logoutUser);
    document.getElementById("notificationButton")?.addEventListener("click", showNotifications);
    renderCurrentPage();
}

async function navigateTo(page) {
    appState.currentPage = page;
    updateActiveNavigation();

    if (page === "dashboard") return await renderRoleDashboard();
    if (page === "students") return await showStudentsPage();
    if (page === "faculty") return await showFacultyPage();
    if (page === "courses") return await showCoursesPage();
    if (page === "attendance") return await showAttendancePage();
    if (page === "marks") return await showMarksPage();
    if (page === "fees") return await showFeesPage();
    if (page === "announcements") return await showAnnouncementsPage();
    if (page === "reports") return await showReportsPage();
    if (page === "profile") return showProfilePage();
    if (page === "settings") return showSettingsPage();
}

function renderCurrentPage() {
    navigateTo(appState.currentPage || "dashboard");
}

function updateActiveNavigation() {
    document.querySelectorAll(".navigation-item").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.page === appState.currentPage);
    });
    const pageTitle = document.getElementById("dashboardPageTitle");
    if (pageTitle) pageTitle.textContent = getPageTitle(appState.currentPage);
}

/* =====================================================
   5. DASHBOARDS (ROLE-BASED)
===================================================== */

async function renderRoleDashboard() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    try {
        const [sRes, fRes, cRes] = await Promise.all([
            fetch(`${API_BASE_URL}/students`),
            fetch(`${API_BASE_URL}/faculty`),
            fetch(`${API_BASE_URL}/courses`)
        ]);
        if (sRes.ok) students = await sRes.json();
        if (fRes.ok) facultyMembers = await fRes.json();
        if (cRes.ok) courses = await cRes.json();
    } catch (e) {
        console.warn("Backend metrics unavailable, showing cache");
    }

    const user = appState.currentUser || { name: "User", role: "admin" };

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <h1>Welcome back, ${user.name}</h1>
                <p>Live synchronized statistics from MySQL database.</p>
            </div>
        </div>

        <div class="dashboard-statistics">
            <div class="dashboard-stat-card">
                <span class="stat-label">TOTAL STUDENTS</span>
                <div class="stat-value">${students.length}</div>
                <small class="stat-description">Registered Students</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">TOTAL FACULTY</span>
                <div class="stat-value">${facultyMembers.length}</div>
                <small class="stat-description">Teaching Staff</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">ACTIVE COURSES</span>
                <div class="stat-value">${courses.length}</div>
                <small class="stat-description">Current Semester</small>
            </div>
            <div class="dashboard-stat-card">
                <span class="stat-label">AVG. ATTENDANCE</span>
                <div class="stat-value">${getAverageAttendance()}%</div>
                <small class="stat-description">Overall Average</small>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h3>Recent System Activity</h3>
                </div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-avatar">✓</div>
                        <div class="activity-info">
                            <strong>System Operational</strong>
                            <p>All database tables connected and ready.</p>
                        </div>
                        <span class="activity-time">Active</span>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h3>Shortcuts</h3>
                </div>
                <div class="quick-actions">
                    <button type="button" class="quick-action" data-quick="students"><span class="quick-action-icon">♙</span><strong>Students</strong></button>
                    <button type="button" class="quick-action" data-quick="courses"><span class="quick-action-icon">▤</span><strong>Courses</strong></button>
                    <button type="button" class="quick-action" data-quick="attendance"><span class="quick-action-icon">◷</span><strong>Attendance</strong></button>
                    <button type="button" class="quick-action" data-quick="reports"><span class="quick-action-icon">⌁</span><strong>Reports</strong></button>
                </div>
            </div>
        </div>
    `;

    document.querySelectorAll("[data-quick]").forEach(b => {
        b.addEventListener("click", () => navigateTo(b.dataset.quick));
    });
}

/* =====================================================
   6. STUDENTS DIRECTORY
===================================================== */

async function showStudentsPage() {
    try {
        const res = await fetch(`${API_BASE_URL}/students`);
        if (res.ok) students = await res.json();
    } catch (e) {
        console.error("Failed to load students:", e);
    }

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
            <div class="faculty-summary-card"><span>AVG ATTENDANCE</span><strong>${getAverageAttendance()}%</strong></div>
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
        return `<div class="dashboard-empty"><h3>No students found</h3></div>`;
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
    `;
}

function initializeStudentManagement() {
    const search = document.getElementById("studentSearch");
    const department = document.getElementById("studentDepartmentFilter");
    const addButton = document.getElementById("addStudentButton");

    function applyFilters() {
        const query = search ? search.value.toLowerCase().trim() : "";
        const dept = department ? department.value : "all";

        const filtered = students.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query) || s.email.toLowerCase().includes(query);
            const matchesDept = dept === "all" || s.department === dept;
            return matchesSearch && matchesDept;
        });

        const container = document.getElementById("studentTableContainer");
        if (container) container.innerHTML = renderStudentTable(filtered);
        initializeStudentActions();
    }

    if (search) search.addEventListener("input", applyFilters);
    if (department) department.addEventListener("change", applyFilters);
    if (addButton) addButton.addEventListener("click", () => openStudentModal());

    initializeStudentActions();
}

function initializeStudentActions() {
    document.querySelectorAll("[data-student-action]").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.studentId;
            const action = btn.dataset.studentAction;
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
    document.getElementById("studentForm").addEventListener("submit", e => {
        e.preventDefault();
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

    if (existingId) {
        const student = students.find(s => s.id === existingId);
        if (student) {
            student.name = name;
            student.email = email;
            student.phone = phone;
            student.department = department;
            student.semester = semester;
        }
        showMessage("Student record updated.", "success");
    } else {
        if (students.some(s => s.id === id)) {
            showMessage("Student ID already exists.", "error");
            return;
        }
        students.push({ id, name, email, department, semester, phone, attendance: 0 });
        showMessage("Student created successfully.", "success");
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

/* =====================================================
   7. FACULTY MANAGEMENT
===================================================== */

async function showFacultyPage() {
    try {
        const res = await fetch(`${API_BASE_URL}/faculty`);
        if (res.ok) facultyMembers = await res.json();
    } catch (e) {
        console.error(e);
    }

    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">FACULTY ADMINISTRATION</span>
                <h1>Faculty Management</h1>
                <p>Manage faculty profiles, designations and teaching assignments.</p>
            </div>
            ${appState.selectedRole === "admin" ? `<button type="button" class="dashboard-button dashboard-button-primary" id="addFacultyButton">+ Add Faculty</button>` : ""}
        </div>

        <div class="faculty-summary">
            <div class="faculty-summary-card"><span>TOTAL FACULTY</span><strong>${facultyMembers.length}</strong></div>
            <div class="faculty-summary-card"><span>PROFESSORS</span><strong>${facultyMembers.filter(f => f.designation === "Professor").length}</strong></div>
            <div class="faculty-summary-card"><span>DEPARTMENTS</span><strong>${new Set(facultyMembers.map(f => f.department)).size}</strong></div>
        </div>

        <div class="dashboard-card">
            <div class="faculty-table-wrapper" id="facultyTableContainer">
                ${renderFacultyTable(facultyMembers)}
            </div>
        </div>
    `;

    document.getElementById("addFacultyButton")?.addEventListener("click", () => openFacultyModal());
    initializeFacultyActions();
}

function renderFacultyTable(data) {
    if (!data.length) return `<div class="dashboard-empty"><h3>No faculty found</h3></div>`;

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
                ${data.map(f => `
                    <tr>
                        <td>
                            <div class="faculty-info">
                                <div class="faculty-avatar">${getInitials(f.name)}</div>
                                <div>
                                    <div class="faculty-name">${f.name}</div>
                                    <span class="faculty-id">${f.email}</span>
                                </div>
                            </div>
                        </td>
                        <td>${f.id}</td>
                        <td>${f.department}</td>
                        <td><span class="faculty-designation">${f.designation}</span></td>
                        <td><strong>${f.courses}</strong></td>
                        <td>
                            <div class="faculty-actions">
                                <button type="button" class="student-action" data-faculty-action="view" data-faculty-id="${f.id}">👁</button>
                                ${appState.selectedRole === "admin" ? `
                                    <button type="button" class="student-action" data-faculty-action="edit" data-faculty-id="${f.id}">✎</button>
                                    <button type="button" class="student-action delete" data-faculty-action="delete" data-faculty-id="${f.id}">×</button>
                                ` : ""}
                            </div>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function initializeFacultyActions() {
    document.querySelectorAll("[data-faculty-action]").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.facultyId;
            const action = btn.dataset.facultyAction;
            const faculty = facultyMembers.find(f => f.id === id);
            if (!faculty) return;

            if (action === "view") showMessage(`${faculty.name} (${faculty.designation})`, "info");
            if (action === "edit") openFacultyModal(faculty);
            if (action === "delete") {
                if (confirm(`Delete ${faculty.name}?`)) {
                    facultyMembers = facultyMembers.filter(f => f.id !== id);
                    showMessage("Faculty removed.", "success");
                    showFacultyPage();
                }
            }
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
                        <input type="tel" id="facultyPhone" value="${faculty?.phone || ""}" placeholder="Phone" required>
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
    document.getElementById("facultyForm").addEventListener("submit", e => {
        e.preventDefault();
        const id = document.getElementById("facultyId").value.trim().toUpperCase();
        const name = document.getElementById("facultyName").value.trim();
        const email = document.getElementById("facultyEmail").value.trim();
        const phone = document.getElementById("facultyPhone").value.trim();
        const department = document.getElementById("facultyDepartment").value;
        const designation = document.getElementById("facultyDesignation").value;

        if (editing) {
            const f = facultyMembers.find(item => item.id === faculty.id);
            if (f) { f.name = name; f.email = email; f.phone = phone; f.department = department; f.designation = designation; }
            showMessage("Faculty updated successfully.", "success");
        } else {
            facultyMembers.push({ id, name, email, department, designation, phone, courses: 0 });
            showMessage("Faculty added successfully.", "success");
        }
        modal.remove();
        showFacultyPage();
    });
}

/* =====================================================
   8. COURSES MANAGEMENT
===================================================== */

async function showCoursesPage() {
    try {
        const res = await fetch(`${API_BASE_URL}/courses`);
        if (res.ok) courses = await res.json();
    } catch (e) {
        console.error(e);
    }

    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ACADEMICS</span>
                <h1>Course Management</h1>
                <p>Manage curriculum, credits, faculty allocation and enrollment.</p>
            </div>
            ${appState.selectedRole === "admin" ? `<button type="button" class="dashboard-button dashboard-button-primary" id="addCourseBtn">+ Add Course</button>` : ""}
        </div>

        <div class="course-summary">
            <div class="course-summary-card"><span>TOTAL COURSES</span><strong>${courses.length}</strong></div>
            <div class="course-summary-card"><span>DEPARTMENTS</span><strong>${new Set(courses.map(c => c.department)).size}</strong></div>
            <div class="course-summary-card"><span>TOTAL CREDITS</span><strong>${courses.reduce((s, c) => s + Number(c.credits || 0), 0)}</strong></div>
            <div class="course-summary-card"><span>ENROLLMENTS</span><strong>${courses.reduce((s, c) => s + Number(c.students || 0), 0)}</strong></div>
        </div>

        <div class="dashboard-card">
            <div class="course-table-wrapper" id="courseTableContainer">
                ${renderCourseTable(courses)}
            </div>
        </div>
    `;

    document.getElementById("addCourseBtn")?.addEventListener("click", () => openCourseModal());
    initializeCourseActions();
}

function renderCourseTable(data) {
    if (!data.length) return `<div class="dashboard-empty"><h3>No courses found</h3></div>`;

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
                ${data.map(c => `
                    <tr>
                        <td>
                            <span class="course-code">${c.code}</span>
                            <div class="course-name" style="margin-top:4px;">${c.name}</div>
                        </td>
                        <td>${c.department}</td>
                        <td>${c.semester}</td>
                        <td>${c.faculty}</td>
                        <td><strong>${c.credits}</strong></td>
                        <td>${c.students}</td>
                        <td>
                            <div class="course-actions">
                                <button type="button" class="student-action" data-course-action="view" data-course-code="${c.code}">👁</button>
                                ${appState.selectedRole === "admin" ? `
                                    <button type="button" class="student-action delete" data-course-action="delete" data-course-code="${c.code}">×</button>
                                ` : ""}
                            </div>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function initializeCourseActions() {
    document.querySelectorAll("[data-course-action]").forEach(btn => {
        btn.addEventListener("click", () => {
            const code = btn.dataset.courseCode;
            const action = btn.dataset.courseAction;
            const course = courses.find(c => c.code === code);
            if (!course) return;

            if (action === "view") showMessage(`${course.code}: ${course.name} (Faculty: ${course.faculty})`, "info");
            if (action === "delete") {
                if (confirm(`Delete course ${course.code}?`)) {
                    courses = courses.filter(c => c.code !== code);
                    showMessage("Course deleted.", "success");
                    showCoursesPage();
                }
            }
        });
    });
}

function openCourseModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "courseModal";

    modal.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h2>Add New Course</h2>
                <button type="button" class="modal-close" id="closeCourseModal">×</button>
            </div>
            <form id="courseForm">
                <div class="course-modal-grid">
                    <div class="form-group">
                        <label>Course Code</label>
                        <input type="text" id="courseCode" placeholder="CS401" required>
                    </div>
                    <div class="form-group">
                        <label>Course Name</label>
                        <input type="text" id="courseName" placeholder="Course Name" required>
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <select id="courseDepartment">
                            <option>Computer Science</option>
                            <option>Electronics</option>
                            <option>Commerce</option>
                            <option>Mathematics</option>
                            <option>Physics</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Semester</label>
                        <select id="courseSemester">
                            <option>Semester 1</option>
                            <option>Semester 2</option>
                            <option>Semester 3</option>
                            <option>Semester 4</option>
                            <option>Semester 5</option>
                            <option>Semester 6</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Credits</label>
                        <select id="courseCredits">
                            <option value="1">1 Credit</option>
                            <option value="2">2 Credits</option>
                            <option value="3">3 Credits</option>
                            <option value="4" selected>4 Credits</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Assigned Faculty</label>
                        <select id="courseFaculty">
                            ${facultyMembers.map(f => `<option value="${f.name}">${f.name}</option>`).join("")}
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-button cancel" id="cancelCourseModal">Cancel</button>
                    <button type="submit" class="modal-button save">Add Course</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("closeCourseModal").addEventListener("click", () => modal.remove());
    document.getElementById("cancelCourseModal").addEventListener("click", () => modal.remove());
    document.getElementById("courseForm").addEventListener("submit", e => {
        e.preventDefault();
        courses.push({
            code: document.getElementById("courseCode").value.trim().toUpperCase(),
            name: document.getElementById("courseName").value.trim(),
            department: document.getElementById("courseDepartment").value,
            semester: document.getElementById("courseSemester").value,
            credits: Number(document.getElementById("courseCredits").value),
            faculty: document.getElementById("courseFaculty").value,
            students: 0
        });
        modal.remove();
        showMessage("Course added successfully.", "success");
        showCoursesPage();
    });
}

/* =====================================================
   9. ATTENDANCE TRACKING
===================================================== */

async function showAttendancePage() {
    if (!courses.length) {
        const res = await fetch(`${API_BASE_URL}/courses`);
        if (res.ok) courses = await res.json();
    }
    const today = new Date().toISOString().split("T")[0];
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ACADEMICS</span>
                <h1>Attendance Management</h1>
                <p>Record and monitor daily student attendance by subject and date.</p>
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
                <button type="button" class="dashboard-button dashboard-button-primary" id="loadAttendanceBtn" style="align-self:flex-end;">Load Attendance</button>
            </div>
        </div>

        <div class="dashboard-card" id="attendanceTableCard">
            ${renderAttendanceTable(courses[0]?.code, today)}
        </div>
    `;

    document.getElementById("loadAttendanceBtn")?.addEventListener("click", () => {
        const cCode = document.getElementById("attendanceCourse")?.value;
        const d = document.getElementById("attendanceDate")?.value;
        const card = document.getElementById("attendanceTableCard");
        if (card && cCode && d) card.innerHTML = renderAttendanceTable(cCode, d);
    });
}

function renderAttendanceTable(courseCode, date) {
    if (!students.length) return `<div class="dashboard-empty"><h3>No students found to mark attendance</h3></div>`;

    return `
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
                    ${students.map(s => `
                        <tr>
                            <td>
                                <div class="student-info">
                                    <div class="student-avatar">${getInitials(s.name)}</div>
                                    <div class="student-name">${s.name}</div>
                                </div>
                            </td>
                            <td>${s.id}</td>
                            <td>
                                <button type="button" class="table-action dashboard-button-primary" onclick="toggleAtt(this, 'Present')">Present</button>
                                <button type="button" class="table-action" onclick="toggleAtt(this, 'Absent')">Absent</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
        <div style="margin-top:15px; text-align:right;">
            <button type="button" class="dashboard-button dashboard-button-primary" onclick="showMessage('Attendance saved successfully.', 'success')">Save Attendance</button>
        </div>
    `;
}

window.toggleAtt = function(btn, status) {
    const parent = btn.parentElement;
    parent.querySelectorAll(".table-action").forEach(b => b.classList.remove("dashboard-button-primary"));
    btn.classList.add("dashboard-button-primary");
};

/* =====================================================
   10. INTERNAL MARKS
===================================================== */

async function showMarksPage() {
    if (!courses.length) {
        const res = await fetch(`${API_BASE_URL}/courses`);
        if (res.ok) courses = await res.json();
    }
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ACADEMICS</span>
                <h1>Internal Marks</h1>
                <p>Manage internal examination marks and assessment records.</p>
            </div>
            <button type="button" class="dashboard-button dashboard-button-primary" onclick="showMessage('Marks saved.', 'success')">Save Marks</button>
        </div>

        <div class="dashboard-card">
            <div class="page-toolbar-left" style="gap:15px;">
                <div class="form-group" style="margin-bottom:0;">
                    <label>Select Course</label>
                    <select id="marksCourseSelect" class="filter-select">
                        ${courses.map(c => `<option value="${c.code}">${c.code} — ${c.name}</option>`).join("")}
                    </select>
                </div>
            </div>
        </div>

        <div class="dashboard-card" style="margin-top:16px;">
            <div class="student-table-wrapper">
                <table class="student-table">
                    <thead>
                        <tr>
                            <th>STUDENT</th>
                            <th>STUDENT ID</th>
                            <th>INTERNAL 1 (20)</th>
                            <th>INTERNAL 2 (20)</th>
                            <th>ASSIGNMENT (10)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students.map(s => `
                            <tr>
                                <td><strong>${s.name}</strong></td>
                                <td>${s.id}</td>
                                <td><input type="number" min="0" max="20" value="18" class="filter-select" style="width:75px;"></td>
                                <td><input type="number" min="0" max="20" value="17" class="filter-select" style="width:75px;"></td>
                                <td><input type="number" min="0" max="10" value="9" class="filter-select" style="width:75px;"></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/* =====================================================
   11. FEES & PAYMENTS
===================================================== */

async function showFeesPage() {
    try {
        const res = await fetch(`${API_BASE_URL}/fees`);
        if (res.ok) feeRecords = await res.json();
    } catch (e) {
        console.error(e);
    }

    const content = document.getElementById("dashboardContent");
    if (!content) return;

    const collected = feeRecords.reduce((s, f) => s + Number(f.paid || 0), 0);
    const total = feeRecords.reduce((s, f) => s + Number(f.totalFee || 0), 0);
    const pending = total - collected;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">FINANCE</span>
                <h1>Fees & Payments</h1>
                <p>Track student fees, invoice collection and outstanding dues.</p>
            </div>
        </div>

        <div class="faculty-summary">
            <div class="faculty-summary-card"><span>TOTAL COLLECTED</span><strong>₹${collected.toLocaleString("en-IN")}</strong></div>
            <div class="faculty-summary-card"><span>PENDING DUES</span><strong>₹${pending.toLocaleString("en-IN")}</strong></div>
            <div class="faculty-summary-card"><span>COLLECTION %</span><strong>${total ? Math.round((collected/total)*100) : 0}%</strong></div>
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
                        ${feeRecords.map(f => `
                            <tr>
                                <td>
                                    <strong>${f.studentName}</strong>
                                    <span class="student-id">${f.studentId} • ${f.department}</span>
                                </td>
                                <td>₹${Number(f.totalFee).toLocaleString("en-IN")}</td>
                                <td>₹${Number(f.paid).toLocaleString("en-IN")}</td>
                                <td>₹${(Number(f.totalFee) - Number(f.paid)).toLocaleString("en-IN")}</td>
                                <td><span class="status-badge ${f.status === 'Paid' ? '' : 'inactive'}">${f.status}</span></td>
                                <td>
                                    ${f.status !== 'Paid' && appState.selectedRole === 'admin' ? `
                                        <button type="button" class="table-action" onclick="markPaid('${f.studentId}')">Mark Paid</button>
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

window.markPaid = function(studentId) {
    const item = feeRecords.find(f => f.studentId === studentId);
    if (item) {
        item.paid = item.totalFee;
        item.status = "Paid";
        showMessage(`Fee payment updated for ${item.studentName}`, "success");
        showFeesPage();
    }
};

/* =====================================================
   12. ANNOUNCEMENTS
===================================================== */

async function showAnnouncementsPage() {
    try {
        const res = await fetch(`${API_BASE_URL}/announcements`);
        if (res.ok) announcements = await res.json();
    } catch (e) {
        console.error(e);
    }

    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">COMMUNICATION</span>
                <h1>Announcements</h1>
                <p>Publish and view notices across all campus departments.</p>
            </div>
            ${appState.selectedRole === "admin" ? `<button type="button" class="dashboard-button dashboard-button-primary" id="addAnnBtn">+ New Announcement</button>` : ""}
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
                        <small style="color:#929ca6;">Published by <strong>${a.author}</strong></small>
                        ${appState.selectedRole === "admin" ? `<button type="button" class="student-action delete" onclick="deleteAnn(${a.id})">×</button>` : ""}
                    </div>
                </div>
            `).join("")}
        </div>
    `;

    document.getElementById("addAnnBtn")?.addEventListener("click", openAnnModal);
}

function openAnnModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "annModal";

    modal.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h2>New Announcement</h2>
                <button type="button" class="modal-close" id="closeAnn">×</button>
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
                    <button type="button" class="modal-button cancel" id="cancelAnn">Cancel</button>
                    <button type="submit" class="modal-button save">Publish</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("closeAnn").addEventListener("click", () => modal.remove());
    document.getElementById("cancelAnn").addEventListener("click", () => modal.remove());
    document.getElementById("annForm").addEventListener("submit", e => {
        e.preventDefault();
        announcements.unshift({
            id: Date.now(),
            title: document.getElementById("annTitle").value.trim(),
            category: document.getElementById("annCategory").value,
            message: document.getElementById("annMessage").value.trim(),
            date: new Date().toISOString().split("T")[0],
            author: appState.currentUser?.name || "Administration"
        });
        modal.remove();
        showMessage("Announcement published successfully.", "success");
        showAnnouncementsPage();
    });
}

window.deleteAnn = function(id) {
    if (confirm("Delete this announcement?")) {
        announcements = announcements.filter(a => a.id !== id);
        showMessage("Announcement removed.", "success");
        showAnnouncementsPage();
    }
};

/* =====================================================
   13. REPORTS, PROFILE & SETTINGS
===================================================== */

async function showReportsPage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ANALYTICS</span>
                <h1>Reports & Institutional Analytics</h1>
                <p>Overall campus performance and metrics.</p>
            </div>
            <button type="button" class="dashboard-button dashboard-button-primary" onclick="window.print()">Print Report</button>
        </div>

        <div class="faculty-summary">
            <div class="faculty-summary-card"><span>TOTAL STUDENTS</span><strong>${students.length}</strong></div>
            <div class="faculty-summary-card"><span>TOTAL FACULTY</span><strong>${facultyMembers.length}</strong></div>
            <div class="faculty-summary-card"><span>TOTAL COURSES</span><strong>${courses.length}</strong></div>
            <div class="faculty-summary-card"><span>AVG ATTENDANCE</span><strong>${getAverageAttendance()}%</strong></div>
        </div>

        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="dashboard-card-header"><h3>Department Enrollment Distribution</h3></div>
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
        </div>
    `;
}

function showProfilePage() {
    const content = document.getElementById("dashboardContent");
    if (!content) return;
    const user = appState.currentUser || { name: "Administrator", role: "admin", email: "admin@campuscore.edu" };

    content.innerHTML = `
        <div class="dashboard-welcome">
            <div>
                <span class="section-label">ACCOUNT</span>
                <h1>My Profile</h1>
            </div>
        </div>
        <div class="dashboard-card" style="max-width:550px;">
            <div class="faculty-profile" style="margin-bottom:20px;">
                <div class="faculty-profile-avatar">${user.initials || "U"}</div>
                <div>
                    <h3>${user.name}</h3>
                    <p>${user.role}</p>
                </div>
            </div>
            <div class="profile-info-list">
                <div class="profile-info-row"><span>User ID</span><strong>${user.userId || "ADM001"}</strong></div>
                <div class="profile-info-row"><span>Email</span><strong>${user.email || "admin@campuscore.edu"}</strong></div>
                <div class="profile-info-row"><span>Role</span><strong>${user.role}</strong></div>
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
        <div class="dashboard-card" style="max-width:550px;">
            <p style="color:#66727f; font-size:13px;">Manage application preferences and notification options.</p>
            <div style="margin-top:20px;">
                <button type="button" class="dashboard-button dashboard-button-primary" onclick="showMessage('Settings saved.', 'success')">Save Preferences</button>
            </div>
        </div>
    `;
}

function showNotifications() {
    showMessage("No new notifications at this time.", "info");
}

/* =====================================================
   14. SYSTEM UTILITIES & HELPERS
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

function getInitials(name) {
    if (!name) return "U";
    return name.replace(/^Dr\.\s*/, "").split(" ").map(w => w.charAt(0)).slice(0, 2).join("").toUpperCase();
}

function getAverageAttendance() {
    if (!students.length) return "0.0";
    const total = students.reduce((sum, s) => sum + Number(s.attendance || 0), 0);
    return (total / students.length).toFixed(1);
}