/* =====================================================
   CAMPUSCORE
   COLLEGE MANAGEMENT SYSTEM
   Application JavaScript
===================================================== */


/* =====================================================
   1. APPLICATION STATE
===================================================== */

const appState = {
    selectedRole: "admin",
    currentUser: null,
    isLoggedIn: false,
    currentPage: "dashboard"
};


/* =====================================================
   2. DEMO USERS
   Later replaced by Java + MySQL authentication
===================================================== */

const users = {

    admin: {
        userId: "ADM001",
        password: "admin123",
        name: "Aarav Menon",
        role: "Administrator",
        initials: "AM"
    },

    faculty: {
        userId: "FAC101",
        password: "faculty123",
        name: "Dr. Anjali Rao",
        role: "Faculty Member",
        initials: "AR"
    },

    student: {
        userId: "STU202402",
        password: "student123",
        name: "Meera Nair",
        role: "Student",
        initials: "MN"
    }

};


/* =====================================================
   3. DOM ELEMENTS
===================================================== */

const loginPage =
    document.getElementById("loginPage");

const dashboardPage =
    document.getElementById("dashboardPage");

const loginForm =
    document.getElementById("loginForm");

const userIdInput =
    document.getElementById("userId");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const forgotPassword =
    document.getElementById("forgotPassword");

const registerButton =
    document.getElementById("registerButton");

const roleButtons =
    document.querySelectorAll(".role-button");


/* =====================================================
   4. APPLICATION START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeRoleSelector();

    initializePasswordToggle();

    initializeLogin();

    initializeForgotPassword();

    initializeRegister();

});


/* =====================================================
   REGISTER
===================================================== */

function initializeRegister() {

    registerButton.addEventListener(
        "click",
        () => {

            showRegistrationPage();

        }
    );

}


/* =====================================================
   REGISTRATION PAGE
===================================================== */

function showRegistrationPage() {

    loginPage.classList.add("hidden");

    dashboardPage.classList.remove("hidden");

    dashboardPage.innerHTML = `

        <div class="registration-page">

            <div class="registration-card">

                <button
                    type="button"
                    class="back-button"
                    id="backToLogin">

                    ← Back to Login

                </button>


                <div class="registration-heading">

                    <span class="section-label">
                        ACCOUNT REGISTRATION
                    </span>

                    <h1>
                        Create your account
                    </h1>

                    <p>
                        Register your details to access
                        the college management portal.
                    </p>

                </div>


                <form id="registrationForm">

                    <div class="registration-role">

                        <label>
                            Register as
                        </label>

                        <select id="registerRole">

                            <option value="student">
                                Student
                            </option>

                            <option value="faculty">
                                Faculty
                            </option>

                        </select>

                    </div>


                    <div class="registration-grid">

                        <div class="form-group">

                            <label for="registerName">
                                Full Name
                            </label>

                            <input
                                type="text"
                                id="registerName"
                                placeholder="Enter full name"
                                required>

                        </div>


                        <div class="form-group">

                            <label for="registerId">
                                Student / Faculty ID
                            </label>

                            <input
                                type="text"
                                id="registerId"
                                placeholder="Enter ID"
                                required>

                        </div>


                        <div class="form-group">

                            <label for="registerEmail">
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="registerEmail"
                                placeholder="Enter email"
                                required>

                        </div>


                        <div class="form-group">

                            <label for="registerPhone">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                id="registerPhone"
                                placeholder="Enter phone number"
                                required>

                        </div>


                        <div class="form-group">

                            <label for="registerDepartment">
                                Department
                            </label>

                            <select id="registerDepartment">

                                <option>
                                    Computer Science
                                </option>

                                <option>
                                    Electronics
                                </option>

                                <option>
                                    Commerce
                                </option>

                                <option>
                                    Mathematics
                                </option>

                                <option>
                                    Physics
                                </option>

                            </select>

                        </div>


                        <div class="form-group">

                            <label for="registerSemester">
                                Semester
                            </label>

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

                            <label for="registerPassword">
                                Password
                            </label>

                            <input
                                type="password"
                                id="registerPassword"
                                placeholder="Create password"
                                required>

                        </div>


                        <div class="form-group">

                            <label for="confirmPassword">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                required>

                        </div>

                    </div>


                    <label class="terms-option">

                        <input
                            type="checkbox"
                            id="terms"
                            required>

                        <span>
                            I agree to the college portal
                            terms and conditions.
                        </span>

                    </label>


                    <button
                        type="submit"
                        class="registration-submit">

                        Create Account →

                    </button>

                </form>

            </div>

        </div>

    `;


    initializeRegistrationForm();


    document
        .getElementById("backToLogin")
        .addEventListener(
            "click",
            backToLogin
        );

}

/* =====================================================
   5. ROLE SELECTOR
===================================================== */

function initializeRoleSelector() {

    roleButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectRole(button.dataset.role);

        });

    });

}


function selectRole(role) {

    if (!users[role]) {
        return;
    }

    appState.selectedRole = role;


    roleButtons.forEach(button => {

        button.classList.remove("active");

    });


    const selectedButton =
        document.querySelector(
            `.role-button[data-role="${role}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add("active");

    }


    userIdInput.value =
        users[role].userId;

    passwordInput.value =
        users[role].password;

}


/* =====================================================
   6. PASSWORD TOGGLE
===================================================== */

function initializePasswordToggle() {

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


/* =====================================================
   7. LOGIN
===================================================== */

function initializeLogin() {

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        loginUser();

    });

}


function loginUser() {

    const userId =
        userIdInput.value.trim();

    const password =
        passwordInput.value;

    const selectedUser =
        users[appState.selectedRole];


    if (!userId || !password) {

        showMessage(
            "Please enter your login details.",
            "error"
        );

        return;
    }


    if (
        userId !== selectedUser.userId ||
        password !== selectedUser.password
    ) {

        showMessage(
            "Invalid User ID or password.",
            "error"
        );

        return;
    }


    appState.currentUser =
        selectedUser;

    appState.isLoggedIn = true;

    appState.currentPage = "dashboard";


    showMessage(
        "Login successful.",
        "success"
    );


    setTimeout(() => {

        openDashboard();

    }, 400);

}


/* =====================================================
   8. DASHBOARD
===================================================== */

function openDashboard() {

    loginPage.classList.add("hidden");

    dashboardPage.classList.remove("hidden");

    renderDashboard();

}


/* =====================================================
   9. DASHBOARD RENDERER
===================================================== */

function renderDashboard() {

    dashboardPage.innerHTML = `

        <aside class="dashboard-sidebar">

            <div class="dashboard-brand">

                <div class="brand-logo">
                    C
                </div>

                <div class="brand-text">

                    <h2>CampusCore</h2>

                    <span>
                        College Management System
                    </span>

                </div>

            </div>


            <nav class="dashboard-navigation">

                ${createNavigation()}

            </nav>


            <div class="sidebar-bottom">

                <div class="system-status">

                    <span class="system-status-dot"></span>

                    <div>

                        <strong>
                            System secure
                        </strong>

                        <span>
                            Database connected
                        </span>

                    </div>

                </div>


                <button
                    class="sidebar-logout"
                    id="logoutButton">

                    ← Sign out

                </button>

            </div>

        </aside>


        <main class="dashboard-main">

            <header class="dashboard-topbar">

                <div class="dashboard-heading">

                    <span class="section-label">
                        ${getRoleLabel()}
                    </span>

                    <h2 id="dashboardPageTitle">
                        Dashboard
                    </h2>

                </div>


                <div class="topbar-user">

                    <button
                        class="notification-button"
                        id="notificationButton">

                        🔔

                        <span class="notification-dot"></span>

                    </button>


                    <div class="user-profile">

                        <div class="user-avatar">

                            ${appState.currentUser.initials}

                        </div>

                        <div class="user-details">

                            <strong>
                                ${appState.currentUser.name}
                            </strong>

                            <span>
                                ${appState.currentUser.role}
                            </span>

                        </div>

                    </div>

                </div>

            </header>


            <section
                class="dashboard-content"
                id="dashboardContent">

                ${createDashboardHome()}

            </section>

        </main>

    `;


    initializeDashboardEvents();

}


/* =====================================================
   10. NAVIGATION
===================================================== */

function createNavigation() {

    const commonMain = `

        <div class="navigation-title">
            MAIN
        </div>

        ${navigationItem("dashboard", "▦", "Dashboard")}

        ${navigationItem("students", "♙", "Students")}

    `;


    if (appState.selectedRole === "admin") {

        return `

            ${commonMain}

            ${navigationItem("faculty", "◈", "Faculty")}


            <div class="navigation-title">
                ACADEMICS
            </div>

            ${navigationItem("courses", "▤", "Courses")}

            ${navigationItem("attendance", "◷", "Attendance")}

            ${navigationItem("marks", "▣", "Internal Marks")}


            <div class="navigation-title">
                FINANCE
            </div>

            ${navigationItem("fees", "₹", "Fees")}


            <div class="navigation-title">
                REPORTS
            </div>

            ${navigationItem("reports", "⌁", "Reports")}

            ${navigationItem(
                "announcements",
                "◉",
                "Announcements"
            )}

        `;

    }


    if (appState.selectedRole === "faculty") {

        return `

            ${commonMain}

            <div class="navigation-title">
                ACADEMICS
            </div>

            ${navigationItem("courses", "▤", "My Courses")}

            ${navigationItem(
                "attendance",
                "◷",
                "Attendance"
            )}

            ${navigationItem(
                "marks",
                "▣",
                "Internal Marks"
            )}

            ${navigationItem(
                "announcements",
                "◉",
                "Announcements"
            )}

        `;

    }


    return `

        <div class="navigation-title">
            MAIN
        </div>

        ${navigationItem(
            "dashboard",
            "▦",
            "Dashboard"
        )}

        ${navigationItem(
            "profile",
            "♙",
            "My Profile"
        )}


        <div class="navigation-title">
            ACADEMICS
        </div>

        ${navigationItem(
            "courses",
            "▤",
            "My Courses"
        )}

        ${navigationItem(
            "attendance",
            "◷",
            "Attendance"
        )}

        ${navigationItem(
            "marks",
            "▣",
            "Internal Marks"
        )}


        <div class="navigation-title">
            FINANCE
        </div>

        ${navigationItem(
            "fees",
            "₹",
            "Fee Status"
        )}

        ${navigationItem(
            "announcements",
            "◉",
            "Notices"
        )}

    `;

}


function navigationItem(page, icon, label) {

    return `

        <button
            class="navigation-item
            ${appState.currentPage === page ? "active" : ""}"
            data-page="${page}">

            <span class="navigation-icon">
                ${icon}
            </span>

            <span>
                ${label}
            </span>

        </button>

    `;

}


/* =====================================================
   11. ADMIN DASHBOARD
===================================================== */

function createDashboardHome() {

    if (appState.selectedRole === "student") {

        return createStudentDashboard();

    }


    if (appState.selectedRole === "faculty") {

        return createFacultyDashboard();

    }


    return createAdminDashboard();

}


/* =====================================================
   12. ADMIN HOME
===================================================== */

function createAdminDashboard() {

    return `

        <div class="dashboard-welcome">

            <div>

                <span class="section-label">
                    MONDAY • 01 SEPTEMBER 2026
                </span>

                <h1>
                    Good evening,
                    ${appState.currentUser.name.split(" ")[0]}.
                </h1>

                <p>
                    Here’s what’s happening across
                    your college today.
                </p>

            </div>


            <button
                class="dashboard-button
                       dashboard-button-primary"
                id="addStudentButton">

                + Add Student

            </button>

        </div>


        <div class="dashboard-statistics">

            ${statCard(
                "Total Students",
                "2,480",
                "↑ 4.8% this term"
            )}

            ${statCard(
                "Faculty Members",
                "128",
                "↑ 2 new this month"
            )}

            ${statCard(
                "Attendance Rate",
                "89.4%",
                "↑ 1.6% vs last month"
            )}

            ${statCard(
                "Fees Collected",
                "₹18.6L",
                "78% of target"
            )}

        </div>


        <div
            class="dashboard-card"
            style="margin-top:16px;">

            <div class="dashboard-card-header">

                <h3>
                    Quick actions
                </h3>

                <span>
                    Common workflows
                </span>

            </div>


            <div class="quick-actions">

                ${quickAction("♙", "Add Student", "add-student")}

                ${quickAction("₹", "Record Payment", "payment")}

                ${quickAction("▣", "Enter Marks", "marks")}

                ${quickAction("◉", "Announcement", "announcement")}

            </div>

        </div>


        <div class="dashboard-grid">

            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Attendance overview
                    </h3>

                    <span>
                        June – September
                    </span>

                </div>


                ${attendanceChart()}

            </div>


            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Latest announcements
                    </h3>

                    <span>
                        View all
                    </span>

                </div>


                ${announcements()}

            </div>

        </div>


        <div
            class="dashboard-card"
            style="margin-top:16px;">

            <div class="dashboard-card-header">

                <h3>
                    Recent students
                </h3>

                <span>
                    5 latest records
                </span>

            </div>


            ${recentStudents()}

                    <div class="admin-main-grid">

            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Recent activity
                    </h3>

                    <span>
                        Live updates
                    </span>

                </div>

                ${recentActivity()}

            </div>


            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Fee collection
                    </h3>

                    <span>
                        This semester
                    </span>

                </div>

                ${feeCollection()}

            </div>

        </div>


        <div class="admin-main-grid">

            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Students by department
                    </h3>

                    <span>
                        Current semester
                    </span>

                </div>

                ${departmentBreakdown()}

            </div>


            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Academic calendar
                    </h3>

                    <span>
                        September 2026
                    </span>

                </div>

                ${miniCalendar()}

            </div>

        </div>

        </div>

    `;

}


/* =====================================================
   13. FACULTY DASHBOARD
===================================================== */

function createFacultyDashboard() {

    return `

        <div class="dashboard-welcome">

            <div>

                <span class="section-label">
                    FACULTY PORTAL
                </span>

                <h1>
                    Hello,
                    ${appState.currentUser.name.split(" ")[1]}.
                </h1>

                <p>
                    Manage your classes, attendance
                    and internal assessments.
                </p>

            </div>


            <button
                class="dashboard-button
                       dashboard-button-primary">

                Take Attendance

            </button>

        </div>


        <div class="dashboard-statistics">

            ${statCard(
                "My Courses",
                "4",
                "2 classes today"
            )}

            ${statCard(
                "Students Taught",
                "186",
                "Across 4 courses"
            )}

            ${statCard(
                "Pending Marks",
                "12",
                "Entries to review"
            )}

            ${statCard(
                "Attendance",
                "93%",
                "Above department average"
            )}

        </div>


        <div class="dashboard-grid">

            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Today’s classes
                    </h3>

                    <span>
                        01 Sep 2026
                    </span>

                </div>


                ${classItem(
                    "▤",
                    "Data Structures",
                    "10:00 AM",
                    "Room 204",
                    "46 students"
                )}

                ${classItem(
                    "⌘",
                    "Java Programming",
                    "12:00 PM",
                    "Lab 2",
                    "52 students"
                )}

                ${classItem(
                    "◈",
                    "OOP & Design Patterns",
                    "2:30 PM",
                    "Room 112",
                    "39 students"
                )}

            </div>


            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Attendance summary
                    </h3>

                </div>


                ${attendanceProgress(
                    "Data Structures",
                    93
                )}

                ${attendanceProgress(
                    "Java Programming",
                    89
                )}

                ${attendanceProgress(
                    "OOP",
                    96
                )}

            </div>

        </div>

    `;

}


/* =====================================================
   14. STUDENT DASHBOARD
===================================================== */

function createStudentDashboard() {

    return `

        <div class="dashboard-welcome">

            <div>

                <span class="section-label">
                    STUDENT PORTAL
                </span>

                <h1>
                    Welcome,
                    ${appState.currentUser.name.split(" ")[0]}.
                </h1>

                <p>
                    Here’s your academic snapshot
                    for this semester.
                </p>

            </div>


            <button
                class="dashboard-button
                       dashboard-button-light">

                View Profile

            </button>

        </div>


        <div class="dashboard-statistics">

            ${statCard(
                "Attendance",
                "88%",
                "Above minimum requirement"
            )}

            ${statCard(
                "Internal Average",
                "82/100",
                "Across 5 subjects"
            )}

            ${statCard(
                "Fee Balance",
                "₹14,000",
                "Due 15 September",
                true
            )}

            ${statCard(
                "Current Semester",
                "S3",
                "B.Sc. Computer Science"
            )}

        </div>


        <div class="dashboard-grid">

            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Subject performance
                    </h3>

                    <span>
                        Internal assessment
                    </span>

                </div>


                ${attendanceProgress(
                    "Data Structures",
                    86
                )}

                ${attendanceProgress(
                    "Java Programming",
                    91
                )}

                ${attendanceProgress(
                    "Database Management",
                    78
                )}

                ${attendanceProgress(
                    "Digital Electronics",
                    83
                )}

                ${attendanceProgress(
                    "Operating Systems",
                    72
                )}

            </div>


            <div class="dashboard-card">

                <div class="dashboard-card-header">

                    <h3>
                        Latest notices
                    </h3>

                </div>


                ${announcements()}

            </div>

        </div>

    `;

}


/* =====================================================
   15. STAT CARD
===================================================== */

function statCard(
    label,
    value,
    description,
    warning = false
) {

    return `

        <div class="dashboard-stat-card">

            <div class="stat-label">
                ${label}
            </div>

            <div class="stat-value">
                ${value}
            </div>

            <div
                class="stat-description
                ${warning ? "warning" : ""}">

                ${description}

            </div>

        </div>

    `;

}


/* =====================================================
   16. QUICK ACTION
===================================================== */

function quickAction(
    icon,
    title,
    action
) {

    return `

        <button
            class="quick-action"
            data-action="${action}">

            <span class="quick-action-icon">
                ${icon}
            </span>

            <strong>
                ${title}
            </strong>

        </button>

    `;

}


/* =====================================================
   17. ATTENDANCE CHART
===================================================== */

function attendanceChart() {

    const values = [
        58, 71, 65, 79,
        74, 88, 84, 91
    ];

    const months = [
        "Jun", "Jun",
        "Jul", "Jul",
        "Aug", "Aug",
        "Sep", "Sep"
    ];


    return `

        <div class="attendance-chart">

            <div class="chart-bars">

                ${values.map((value, index) => `

                    <div class="chart-column">

                        <div
                            class="chart-bar"
                            style="
                                height:${value}%;
                            ">
                        </div>

                        <div
                            class="chart-bar secondary"
                            style="
                                height:${Math.max(
                                    30,
                                    value - 24
                                )}%;
                            ">
                        </div>

                        <span
                            class="chart-column-label">

                            ${months[index]}

                        </span>

                    </div>

                `).join("")}

            </div>

        </div>


        <div class="chart-legend">

            <span>
                <i class="legend-dot"></i>
                Present
            </span>

            <span>
                <i class="legend-dot secondary"></i>
                Absent
            </span>

        </div>

    `;

}


/* =====================================================
   18. ANNOUNCEMENTS
===================================================== */

function announcements() {

    const data = [

        {
            icon: "📅",
            title: "Internal Examination Schedule",
            text: "Mid-semester examinations begin from 14 September.",
            time: "Today"
        },

        {
            icon: "💳",
            title: "Fee Payment Reminder",
            text: "Students with pending dues should clear their balance.",
            time: "Yesterday"
        },

        {
            icon: "🎓",
            title: "Faculty Development Workshop",
            text: "Registration is open for the Java & OOP workshop.",
            time: "28 Aug"
        }

    ];


    return data.map(item => `

        <div class="announcement-item">

            <div class="announcement-icon">
                ${item.icon}
            </div>

            <div class="announcement-content">

                <strong>
                    ${item.title}
                </strong>

                <p>
                    ${item.text}
                </p>

                <time>
                    ${item.time}
                </time>

            </div>

        </div>

    `).join("");

}


/* =====================================================
   19. RECENT STUDENTS
===================================================== */

function recentStudents() {

    const students = [

        ["AM", "Aarav Menon", "Computer Science", "92%"],
        ["MN", "Meera Nair", "Electronics", "88%"],
        ["RT", "Rohan Thomas", "Commerce", "95%"],
        ["DJ", "Diya Joseph", "Computer Science", "79%"]

    ];


    return `

        <div style="overflow-x:auto">

            <table
                style="
                    width:100%;
                    border-collapse:collapse;
                    min-width:550px;
                ">

                <thead>

                    <tr>

                        <th
                            style="
                                text-align:left;
                                padding:10px;
                                color:#9aa4ae;
                                font-size:9px;
                                border-bottom:1px solid #edf0f3;
                            ">

                            STUDENT

                        </th>

                        <th
                            style="
                                text-align:left;
                                padding:10px;
                                color:#9aa4ae;
                                font-size:9px;
                                border-bottom:1px solid #edf0f3;
                            ">

                            DEPARTMENT

                        </th>

                        <th
                            style="
                                text-align:left;
                                padding:10px;
                                color:#9aa4ae;
                                font-size:9px;
                                border-bottom:1px solid #edf0f3;
                            ">

                            ATTENDANCE

                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${students.map(student => `

                        <tr>

                            <td
                                style="
                                    padding:12px 10px;
                                    font-size:11px;
                                    border-bottom:1px solid #f0f2f4;
                                ">

                                <div
                                    style="
                                        display:flex;
                                        align-items:center;
                                        gap:9px;
                                    ">

                                    <div
                                        style="
                                            width:30px;
                                            height:30px;
                                            display:grid;
                                            place-items:center;
                                            border-radius:9px;
                                            background:#edf2f6;
                                            color:#49637b;
                                            font-size:9px;
                                            font-weight:800;
                                        ">

                                        ${student[0]}

                                    </div>

                                    ${student[1]}

                                </div>

                            </td>


                            <td
                                style="
                                    padding:12px 10px;
                                    font-size:11px;
                                    color:#687580;
                                    border-bottom:1px solid #f0f2f4;
                                ">

                                ${student[2]}

                            </td>


                            <td
                                style="
                                    padding:12px 10px;
                                    font-size:11px;
                                    border-bottom:1px solid #f0f2f4;
                                ">

                                ${student[3]}

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;

}


/* =====================================================
   20. CLASS ITEM
===================================================== */

function classItem(
    icon,
    subject,
    time,
    room,
    students
) {

    return `

        <div class="announcement-item">

            <div class="announcement-icon">
                ${icon}
            </div>

            <div class="announcement-content">

                <strong>
                    ${subject}
                </strong>

                <p>
                    ${time} • ${room} • ${students}
                </p>

            </div>

        </div>

    `;

}


/* =====================================================
   21. PROGRESS BAR
===================================================== */

function attendanceProgress(
    subject,
    percentage
) {

    return `

        <div style="margin-bottom:17px">

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    margin-bottom:7px;
                    font-size:10px;
                ">

                <strong>
                    ${subject}
                </strong>

                <span>
                    ${percentage}%
                </span>

            </div>


            <div
                style="
                    height:7px;
                    overflow:hidden;
                    border-radius:20px;
                    background:#edf0f3;
                ">

                <div
                    style="
                        width:${percentage}%;
                        height:100%;
                        border-radius:20px;
                        background:#6e9bbd;
                    ">
                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   22. ROLE LABEL
===================================================== */

function getRoleLabel() {

    if (appState.selectedRole === "admin") {
        return "ADMINISTRATION";
    }

    if (appState.selectedRole === "faculty") {
        return "ACADEMIC PORTAL";
    }

    return "STUDENT PORTAL";

}


/* =====================================================
   23. DASHBOARD EVENTS
===================================================== */

function initializeDashboardEvents() {

    document
        .querySelectorAll(".navigation-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    navigateTo(
                        button.dataset.page
                    );

                }
            );

        });


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }


    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                showMessage(
                    "You have 3 new notifications.",
                    "info"
                );

            }
        );

    }


    const addStudentButton =
        document.getElementById(
            "addStudentButton"
        );


    if (addStudentButton) {

        addStudentButton.addEventListener(
            "click",
            () => {

                showMessage(
                    "Student management module will open here.",
                    "info"
                );

            }
        );

    }


    document
        .querySelectorAll(".quick-action")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;

                    handleQuickAction(action);

                }
            );

        });

}


/* =====================================================
   24. NAVIGATION
===================================================== */

function navigateTo(page) {

    appState.currentPage = page;

    if (page === "dashboard") {
        renderDashboard();
        return;
    }

    if (page === "students") {
        showStudentsPage();
        return;
    }

    if (page === "faculty") {
        showFacultyPage();
        return;
    }

    // ⬇️ ഈ ഭാഗം ഇല്ലെങ്കിൽ add ചെയ്യണം
    if (page === "courses") {
        showCoursesPage();
        return;
    }

    showPagePlaceholder(page);
}


    /* =====================================================
   PAGE ROUTER
===================================================== */

function showPagePlaceholder(page) {

    if (page === "students") {

        showStudentsPage();

        return;
    }

    if (page === "faculty") {

    showFacultyPage();

    return;
}


    const titles = {

        faculty: "Faculty",

        courses: "Courses",

        attendance: "Attendance",

        marks: "Internal Marks",

        fees: "Fees & Payments",

        reports: "Reports",

        announcements: "Announcements",

        profile: "My Profile"

    };


    const title =
        titles[page] || "Dashboard";


    const content =
        document.getElementById(
            "dashboardContent"
        );


    if (!content) {
        return;
    }


    document.getElementById(
        "dashboardPageTitle"
    ).textContent = title;


    content.innerHTML = `

        <div class="dashboard-welcome">

            <div>

                <span class="section-label">
                    ${getRoleLabel()}
                </span>

                <h1>
                    ${title}
                </h1>

                <p>
                    ${getPageDescription(page)}
                </p>

            </div>

        </div>


        <div class="dashboard-card">

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    ✓
                </div>

                <h3>
                    ${title} module
                </h3>

                <p>
                    This module is ready for the
                    Java backend and MySQL database
                    integration.
                </p>

            </div>

        </div>

    `;


    updateActiveNavigation();

}



/* =====================================================
   25. PAGE PLACEHOLDER
===================================================== */

function showPagePlaceholder(page) {

    const titles = {

        students: "Students",

        faculty: "Faculty",

        courses: "Courses",

        attendance: "Attendance",

        marks: "Internal Marks",

        fees: "Fees & Payments",

        reports: "Reports",

        announcements: "Announcements",

        profile: "My Profile"

    };


    const title =
        titles[page] || "Dashboard";


    const content =
        document.getElementById(
            "dashboardContent"
        );


    if (!content) {
        return;
    }


    document.getElementById(
        "dashboardPageTitle"
    ).textContent = title;


    content.innerHTML = `

        <div class="dashboard-welcome">

            <div>

                <span class="section-label">
                    ${getRoleLabel()}
                </span>

                <h1>
                    ${title}
                </h1>

                <p>
                    ${getPageDescription(page)}
                </p>

            </div>

        </div>


        <div class="dashboard-card">

            <div
                style="
                    padding:55px 20px;
                    text-align:center;
                ">

                <div
                    style="
                        width:60px;
                        height:60px;
                        display:grid;
                        place-items:center;
                        margin:0 auto 17px;
                        border-radius:16px;
                        background:#edf4fa;
                        color:#315a78;
                        font-size:24px;
                    ">

                    ✓

                </div>

                <h3
                    style="
                        font-family:'Space Grotesk',
                        sans-serif;
                        font-size:20px;
                        margin-bottom:8px;
                    ">

                    ${title} module

                </h3>

                <p
                    style="
                        color:#89939f;
                        font-size:12px;
                        max-width:450px;
                        margin:0 auto;
                        line-height:1.7;
                    ">

                    This module is ready for the
                    Java backend and MySQL database
                    integration.

                </p>

            </div>

        </div>

    `;


    updateActiveNavigation();

}


/* =====================================================
   26. PAGE DESCRIPTIONS
===================================================== */

function getPageDescription(page) {

    const descriptions = {

        students:
            "Manage student profiles, admissions and academic records.",

        faculty:
            "Manage faculty information and course allocation.",

        courses:
            "View and manage academic courses and allocations.",

        attendance:
            "Record and monitor student attendance.",

        marks:
            "Enter and manage internal examination marks.",

        fees:
            "Track fee payments, balances and transactions.",

        reports:
            "Generate academic, attendance and financial reports.",

        announcements:
            "Publish important institutional announcements.",

        profile:
            "View your personal and account information."

    };


    return descriptions[page] ||
        "Manage your college information.";

}


/* =====================================================
   27. ACTIVE NAVIGATION
===================================================== */

function updateActiveNavigation() {

    document
        .querySelectorAll(".navigation-item")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page ===
                appState.currentPage
            );

        });

}


/* =====================================================
   28. QUICK ACTION HANDLER
===================================================== */

function handleQuickAction(action) {

    const messages = {

        "add-student":
            "Opening student registration module.",

        payment:
            "Opening fee payment module.",

        marks:
            "Opening internal marks module.",

        announcement:
            "Opening announcement module."

    };


    showMessage(
        messages[action] ||
        "Module opened.",
        "info"
    );

}


/* =====================================================
   29. LOGOUT
===================================================== */

function logout() {

    appState.currentUser = null;

    appState.isLoggedIn = false;

    dashboardPage.classList.add("hidden");

    loginPage.classList.remove("hidden");

    passwordInput.type = "password";

    togglePassword.textContent = "Show";

    selectRole("admin");


    showMessage(
        "You have been signed out.",
        "success"
    );

}


/* =====================================================
   30. FORGOT PASSWORD
===================================================== */

function initializeForgotPassword() {

    forgotPassword.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showMessage(
                "Please contact the college administrator to reset your password.",
                "info"
            );

        }
    );

}


/* =====================================================
   31. MESSAGE SYSTEM
===================================================== */

function showMessage(
    message,
    type = "info"
) {

    const oldMessage =
        document.querySelector(
            ".system-message"
        );


    if (oldMessage) {
        oldMessage.remove();
    }


    const messageElement =
        document.createElement("div");


    messageElement.className =
        `system-message ${type}`;


    messageElement.textContent =
        message;


    document.body.appendChild(
        messageElement
    );


    setTimeout(() => {

        messageElement.classList.add(
            "message-hide"
        );


        setTimeout(() => {

            messageElement.remove();

        }, 300);

    }, 2500);

}

/* =====================================================
   REGISTRATION FORM
===================================================== */

function initializeRegistrationForm() {

    const registrationForm =
        document.getElementById("registrationForm");


    registrationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            registerNewUser();

        }
    );

}


/* =====================================================
   CREATE ACCOUNT
===================================================== */

function registerNewUser() {

    const name =
        document.getElementById("registerName")
        .value
        .trim();

    const id =
        document.getElementById("registerId")
        .value
        .trim();

    const email =
        document.getElementById("registerEmail")
        .value
        .trim();

    const phone =
        document.getElementById("registerPhone")
        .value
        .trim();

    const password =
        document.getElementById("registerPassword")
        .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
        .value;


    /* Password validation */

    if (password.length < 6) {

        showMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    /* Confirm password */

    if (password !== confirmPassword) {

        showMessage(
            "Passwords do not match.",
            "error"
        );

        return;
    }


    /* Basic validation */

    if (
        !name ||
        !id ||
        !email ||
        !phone
    ) {

        showMessage(
            "Please complete all required fields.",
            "error"
        );

        return;
    }


    /*
       Temporary registration.

       Later:
       Java → JDBC → MySQL
    */

    showMessage(
        "Registration submitted successfully.",
        "success"
    );


    setTimeout(() => {

        backToLogin();

    }, 1000);

}


/* =====================================================
   BACK TO LOGIN
===================================================== */

function backToLogin() {

    dashboardPage.classList.add("hidden");

    loginPage.classList.remove("hidden");

    selectRole("admin");

}

/* =====================================================
   RECENT ACTIVITY
===================================================== */

function recentActivity() {

    const activities = [

        {
            initials: "AR",
            title: "Dr. Anjali Rao",
            text: "Updated internal marks for Java Programming",
            time: "8 min ago"
        },

        {
            initials: "MN",
            title: "Meera Nair",
            text: "Fee payment receipt generated",
            time: "24 min ago"
        },

        {
            initials: "RT",
            title: "Rohan Thomas",
            text: "Student profile updated",
            time: "42 min ago"
        },

        {
            initials: "SJ",
            title: "Staff Office",
            text: "New announcement published",
            time: "1 hr ago"
        }

    ];


    return `

        <div class="activity-list">

            ${activities.map(item => `

                <div class="activity-item">

                    <div class="activity-avatar">
                        ${item.initials}
                    </div>

                    <div class="activity-info">

                        <strong>
                            ${item.title}
                        </strong>

                        <p>
                            ${item.text}
                        </p>

                    </div>

                    <span class="activity-time">
                        ${item.time}
                    </span>

                </div>

            `).join("")}

        </div>

    `;

}


/* =====================================================
   FEE COLLECTION
===================================================== */

function feeCollection() {

    return `

        <div class="fee-summary">

            <div class="fee-summary-item">

                <span>
                    Collected
                </span>

                <strong>
                    ₹18.6L
                </strong>

            </div>


            <div class="fee-summary-item">

                <span>
                    Pending
                </span>

                <strong>
                    ₹5.2L
                </strong>

            </div>

        </div>


        <div class="fee-progress-wrapper">

            <div class="fee-progress-header">

                <span>
                    Collection target
                </span>

                <strong>
                    78%
                </strong>

            </div>


            <div class="fee-progress">

                <div
                    class="fee-progress-bar">
                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   DEPARTMENT BREAKDOWN
===================================================== */

function departmentBreakdown() {

    const departments = [

        ["Computer Science", 92, 680],
        ["Electronics", 78, 520],
        ["Commerce", 65, 430],
        ["Mathematics", 52, 350],
        ["Physics", 38, 280]

    ];


    return `

        <div class="department-list">

            ${departments.map(dept => `

                <div class="department-row">

                    <span class="department-name">
                        ${dept[0]}
                    </span>

                    <div class="department-track">

                        <div
                            class="department-fill"
                            style="
                                width:${dept[1]}%;
                            ">
                        </div>

                    </div>

                    <span class="department-value">
                        ${dept[2]}
                    </span>

                </div>

            `).join("")}

        </div>

    `;

}


/* =====================================================
   MINI CALENDAR
===================================================== */

function miniCalendar() {

    const days = [
        "", "", "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10", "11", "12",
        "13", "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", "24", "25", "26",
        "27", "28", "29", "30"
    ];


    return `

        <div class="mini-calendar">

            <div class="calendar-header">

                <strong>
                    September 2026
                </strong>

                <button>
                    →
                </button>

            </div>


            <div class="calendar-days">

                <span class="calendar-day-name">S</span>
                <span class="calendar-day-name">M</span>
                <span class="calendar-day-name">T</span>
                <span class="calendar-day-name">W</span>
                <span class="calendar-day-name">T</span>
                <span class="calendar-day-name">F</span>
                <span class="calendar-day-name">S</span>


                ${days.map((day, index) => {

                    if (!day) {

                        return `<span></span>`;

                    }


                    const number =
                        Number(day);


                    const today =
                        number === 1
                            ? "today"
                            : "";


                    const event =
                        [14, 15, 21, 28]
                            .includes(number)
                            ? "event"
                            : "";


                    return `

                        <span
                            class="
                                calendar-day
                                ${today}
                                ${event}
                            ">

                            ${day}

                        </span>

                    `;

                }).join("")}

            </div>

        </div>

    `;

}

/* =====================================================
   STUDENT DATA
   Temporary frontend data
   Later replaced by MySQL
===================================================== */

let students = [

    {
        id: "STU202401",
        name: "Aarav Menon",
        initials: "AM",
        email: "aarav@campuscore.edu",
        phone: "9876543210",
        department: "Computer Science",
        semester: "Semester 3",
        attendance: 92,
        status: "Active"
    },

    {
        id: "STU202402",
        name: "Meera Nair",
        initials: "MN",
        email: "meera@campuscore.edu",
        phone: "9876543211",
        department: "Computer Science",
        semester: "Semester 3",
        attendance: 88,
        status: "Active"
    },

    {
        id: "STU202403",
        name: "Rohan Thomas",
        initials: "RT",
        email: "rohan@campuscore.edu",
        phone: "9876543212",
        department: "Commerce",
        semester: "Semester 5",
        attendance: 95,
        status: "Active"
    },

    {
        id: "STU202404",
        name: "Diya Joseph",
        initials: "DJ",
        email: "diya@campuscore.edu",
        phone: "9876543213",
        department: "Computer Science",
        semester: "Semester 5",
        attendance: 79,
        status: "Active"
    },

    {
        id: "STU202405",
        name: "Adithya Krishnan",
        initials: "AK",
        email: "adithya@campuscore.edu",
        phone: "9876543214",
        department: "Electronics",
        semester: "Semester 3",
        attendance: 84,
        status: "Active"
    },

    {
        id: "STU202406",
        name: "Sarah George",
        initials: "SG",
        email: "sarah@campuscore.edu",
        phone: "9876543215",
        department: "Mathematics",
        semester: "Semester 1",
        attendance: 91,
        status: "Active"
    },

    {
        id: "STU202407",
        name: "Nikhil Raj",
        initials: "NR",
        email: "nikhil@campuscore.edu",
        phone: "9876543216",
        department: "Physics",
        semester: "Semester 5",
        attendance: 74,
        status: "Active"
    },

    {
        id: "STU202408",
        name: "Ananya Das",
        initials: "AD",
        email: "ananya@campuscore.edu",
        phone: "9876543217",
        department: "Commerce",
        semester: "Semester 3",
        attendance: 87,
        status: "Active"
    }

];

/* =====================================================
   STUDENT MANAGEMENT PAGE
===================================================== */

function showStudentsPage() {

    appState.currentPage = "students";


    const content =
        document.getElementById(
            "dashboardContent"
        );


    document.getElementById(
        "dashboardPageTitle"
    ).textContent = "Students";


    content.innerHTML = `

        <div class="dashboard-welcome">

            <div>

                <span class="section-label">
                    ADMINISTRATION
                </span>

                <h1>
                    Student Management
                </h1>

                <p>
                    Manage student profiles,
                    admissions and academic records.
                </p>

            </div>


            <button
                class="dashboard-button
                       dashboard-button-primary"
                id="openAddStudent">

                + Add Student

            </button>

        </div>


        <div class="dashboard-card">

            <div class="page-toolbar">

                <div class="page-toolbar-left">

                    <div class="search-box">

                        <span class="search-icon">
                            ⌕
                        </span>

                        <input
                            type="search"
                            id="studentSearch"
                            placeholder="Search by name or student ID...">

                    </div>


                    <select
                        class="filter-select"
                        id="departmentFilter">

                        <option value="all">
                            All Departments
                        </option>

                        <option value="Computer Science">
                            Computer Science
                        </option>

                        <option value="Electronics">
                            Electronics
                        </option>

                        <option value="Commerce">
                            Commerce
                        </option>

                        <option value="Mathematics">
                            Mathematics
                        </option>

                        <option value="Physics">
                            Physics
                        </option>

                    </select>


                    <select
                        class="filter-select"
                        id="semesterFilter">

                        <option value="all">
                            All Semesters
                        </option>

                        <option value="Semester 1">
                            Semester 1
                        </option>

                        <option value="Semester 3">
                            Semester 3
                        </option>

                        <option value="Semester 5">
                            Semester 5
                        </option>

                    </select>

                </div>

            </div>


            <div
                class="student-table-wrapper"
                id="studentTableContainer">

                ${renderStudentTable(students)}

            </div>

        </div>

    `;


    initializeStudentManagement();

    updateActiveNavigation();

}

/* =====================================================
   STUDENT TABLE
===================================================== */

function renderStudentTable(data) {

    if (data.length === 0) {

        return `

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    ⌕
                </div>

                <h3>
                    No students found
                </h3>

                <p>
                    Try changing your search or
                    filter options.
                </p>

            </div>

        `;

    }


    return `

        <table class="student-table">

            <thead>

                <tr>

                    <th>
                        STUDENT
                    </th>

                    <th>
                        DEPARTMENT
                    </th>

                    <th>
                        SEMESTER
                    </th>

                    <th>
                        ATTENDANCE
                    </th>

                    <th>
                        STATUS
                    </th>

                    <th>
                        ACTIONS
                    </th>

                </tr>

            </thead>


            <tbody>

                ${data.map(student => `

                    <tr>

                        <td>

                            <div class="student-info">

                                <div class="student-avatar">
                                    ${student.initials}
                                </div>

                                <div>

                                    <div class="student-name">
                                        ${student.name}
                                    </div>

                                    <span class="student-id">
                                        ${student.id}
                                    </span>

                                </div>

                            </div>

                        </td>


                        <td>
                            ${student.department}
                        </td>


                        <td>
                            ${student.semester}
                        </td>


                        <td>

                            <span
                                class="${
                                    student.attendance >= 80
                                    ? "attendance-good"
                                    : "attendance-warning"
                                }">

                                ${student.attendance}%

                            </span>

                        </td>


                        <td>

                            <span
                                class="status-badge
                                ${
                                    student.status !== "Active"
                                    ? "inactive"
                                    : ""
                                }">

                                ${student.status}

                            </span>

                        </td>


                        <td>

                            <div class="student-actions">

                                <button
                                    class="student-action"
                                    data-action="view"
                                    data-id="${student.id}"
                                    title="View">

                                    👁

                                </button>


                                <button
                                    class="student-action"
                                    data-action="edit"
                                    data-id="${student.id}"
                                    title="Edit">

                                    ✎

                                </button>


                                <button
                                    class="student-action delete"
                                    data-action="delete"
                                    data-id="${student.id}"
                                    title="Delete">

                                    ×

                                </button>

                            </div>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>


        <div class="table-footer">

            <span class="table-count">

                Showing ${data.length}
                of ${students.length} students

            </span>


            <div class="pagination">

                <button class="page-number active">
                    1
                </button>

                <button class="page-number">
                    2
                </button>

                <button class="page-number">
                    →
                </button>

            </div>

        </div>

    `;

}

/* =====================================================
   STUDENT MANAGEMENT EVENTS
===================================================== */

function initializeStudentManagement() {

    const search =
        document.getElementById(
            "studentSearch"
        );

    const department =
        document.getElementById(
            "departmentFilter"
        );

    const semester =
        document.getElementById(
            "semesterFilter"
        );

    const addButton =
        document.getElementById(
            "openAddStudent"
        );


    function applyFilters() {

        const searchValue =
            search.value
                .toLowerCase()
                .trim();

        const departmentValue =
            department.value;

        const semesterValue =
            semester.value;


        const filtered =
            students.filter(student => {

                const matchesSearch =
                    student.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    student.id
                        .toLowerCase()
                        .includes(searchValue);


                const matchesDepartment =
                    departmentValue === "all" ||
                    student.department ===
                    departmentValue;


                const matchesSemester =
                    semesterValue === "all" ||
                    student.semester ===
                    semesterValue;


                return (
                    matchesSearch &&
                    matchesDepartment &&
                    matchesSemester
                );

            });


        document.getElementById(
            "studentTableContainer"
        ).innerHTML =
            renderStudentTable(filtered);


        initializeStudentActions();

    }


    search.addEventListener(
        "input",
        applyFilters
    );


    department.addEventListener(
        "change",
        applyFilters
    );


    semester.addEventListener(
        "change",
        applyFilters
    );


    addButton.addEventListener(
        "click",
        () => {

            openStudentModal();

        }
    );


    initializeStudentActions();

}

/* =====================================================
   STUDENT ACTIONS
===================================================== */

function initializeStudentActions() {

    document
        .querySelectorAll(".student-action")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    const action =
                        button.dataset.action;


                    if (action === "view") {

                        viewStudent(id);

                    }


                    if (action === "edit") {

                        editStudent(id);

                    }


                    if (action === "delete") {

                        deleteStudent(id);

                    }

                }
            );

        });

}

/* =====================================================
   ADD STUDENT
===================================================== */

function openStudentModal(student = null) {

    const isEdit =
        student !== null;


    const overlay =
        document.createElement("div");


    overlay.className =
        "modal-overlay";


    overlay.id =
        "studentModal";


    overlay.innerHTML = `

        <div class="modal-card">

            <div class="modal-header">

                <h2>
                    ${isEdit
                        ? "Edit Student"
                        : "Add New Student"}
                </h2>


                <button
                    class="modal-close"
                    id="closeStudentModal">

                    ×

                </button>

            </div>


            <form id="studentForm">

                <div class="modal-grid">

                    <div class="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            id="studentName"
                            type="text"
                            value="${student?.name || ""}"
                            placeholder="Enter full name"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Student ID
                        </label>

                        <input
                            id="studentId"
                            type="text"
                            value="${student?.id || ""}"
                            placeholder="STU202409"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            id="studentEmail"
                            type="email"
                            value="${student?.email || ""}"
                            placeholder="student@college.edu"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Phone
                        </label>

                        <input
                            id="studentPhone"
                            type="tel"
                            value="${student?.phone || ""}"
                            placeholder="Phone number"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Department
                        </label>

                        <select id="studentDepartment">

                            <option
                                ${
                                    student?.department ===
                                    "Computer Science"
                                    ? "selected"
                                    : ""
                                }>

                                Computer Science

                            </option>

                            <option
                                ${
                                    student?.department ===
                                    "Electronics"
                                    ? "selected"
                                    : ""
                                }>

                                Electronics

                            </option>

                            <option
                                ${
                                    student?.department ===
                                    "Commerce"
                                    ? "selected"
                                    : ""
                                }>

                                Commerce

                            </option>

                            <option
                                ${
                                    student?.department ===
                                    "Mathematics"
                                    ? "selected"
                                    : ""
                                }>

                                Mathematics

                            </option>

                            <option
                                ${
                                    student?.department ===
                                    "Physics"
                                    ? "selected"
                                    : ""
                                }>

                                Physics

                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Semester
                        </label>

                        <select id="studentSemester">

                            ${[
                                "Semester 1",
                                "Semester 3",
                                "Semester 5"
                            ].map(sem => `

                                <option
                                    ${
                                        student?.semester === sem
                                        ? "selected"
                                        : ""
                                    }>

                                    ${sem}

                                </option>

                            `).join("")}

                        </select>

                    </div>

                </div>


                <div class="modal-actions">

                    <button
                        type="button"
                        class="modal-button cancel"
                        id="cancelStudentModal">

                        Cancel

                    </button>


                    <button
                        type="submit"
                        class="modal-button save">

                        ${isEdit
                            ? "Save Changes"
                            : "Add Student"}

                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    document
        .getElementById(
            "closeStudentModal"
        )
        .addEventListener(
            "click",
            closeStudentModal
        );


    document
        .getElementById(
            "cancelStudentModal"
        )
        .addEventListener(
            "click",
            closeStudentModal
        );


    document
        .getElementById(
            "studentForm"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();

                saveStudent(
                    student?.id || null
                );

            }
        );

}

/* =====================================================
   SAVE STUDENT
===================================================== */

function saveStudent(existingId) {

    const name =
        document.getElementById(
            "studentName"
        ).value.trim();

    const id =
        document.getElementById(
            "studentId"
        ).value.trim();

    const email =
        document.getElementById(
            "studentEmail"
        ).value.trim();

    const phone =
        document.getElementById(
            "studentPhone"
        ).value.trim();

    const department =
        document.getElementById(
            "studentDepartment"
        ).value;

    const semester =
        document.getElementById(
            "studentSemester"
        ).value;


    if (!name || !id || !email || !phone) {

        showMessage(
            "Please complete all fields.",
            "error"
        );

        return;
    }


    const initials =
        name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();


    if (existingId) {

        const student =
            students.find(
                item => item.id === existingId
            );


        if (student) {

            student.name = name;
            student.id = id;
            student.email = email;
            student.phone = phone;
            student.department = department;
            student.semester = semester;
            student.initials = initials;

        }


        showMessage(
            "Student details updated successfully.",
            "success"
        );

    } else {

        students.push({

            id,

            name,

            initials,

            email,

            phone,

            department,

            semester,

            attendance: 0,

            status: "Active"

        });


        showMessage(
            "Student added successfully.",
            "success"
        );

    }


    closeStudentModal();

    showStudentsPage();

}


/* =====================================================
   EDIT STUDENT
===================================================== */

function editStudent(id) {

    const student =
        students.find(
            item => item.id === id
        );


    if (!student) {
        return;
    }


    openStudentModal(student);

}


/* =====================================================
   VIEW STUDENT
===================================================== */

function viewStudent(id) {

    const student =
        students.find(
            item => item.id === id
        );


    if (!student) {
        return;
    }


    showMessage(
        `${student.name} — ${student.department}`,
        "info"
    );

}


/* =====================================================
   DELETE STUDENT
===================================================== */

function deleteStudent(id) {

    const student =
        students.find(
            item => item.id === id
        );


    if (!student) {
        return;
    }


    const confirmed =
        confirm(
            `Delete ${student.name} from the student records?`
        );


    if (!confirmed) {
        return;
    }


    students =
        students.filter(
            item => item.id !== id
        );


    showMessage(
        "Student deleted successfully.",
        "success"
    );


    showStudentsPage();

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeStudentModal() {

    const modal =
        document.getElementById(
            "studentModal"
        );


    if (modal) {

        modal.remove();

    }

}

/* =====================================================
   FACULTY DATA
===================================================== */

let facultyMembers = [

    {
        id: "FAC101",
        name: "Dr. Anjali Rao",
        initials: "AR",
        email: "anjali.rao@campuscore.edu",
        phone: "9876500011",
        department: "Computer Science",
        designation: "Assistant Professor",
        courses: 3,
        status: "Active"
    },

    {
        id: "FAC102",
        name: "Dr. Rahul Menon",
        initials: "RM",
        email: "rahul.menon@campuscore.edu",
        phone: "9876500012",
        department: "Electronics",
        designation: "Associate Professor",
        courses: 4,
        status: "Active"
    },

    {
        id: "FAC103",
        name: "Prof. Sneha Thomas",
        initials: "ST",
        email: "sneha.thomas@campuscore.edu",
        phone: "9876500013",
        department: "Commerce",
        designation: "Assistant Professor",
        courses: 2,
        status: "Active"
    },

    {
        id: "FAC104",
        name: "Dr. Vivek Kumar",
        initials: "VK",
        email: "vivek.kumar@campuscore.edu",
        phone: "9876500014",
        department: "Mathematics",
        designation: "Professor",
        courses: 3,
        status: "On Leave"
    },

    {
        id: "FAC105",
        name: "Prof. Neha Joseph",
        initials: "NJ",
        email: "neha.joseph@campuscore.edu",
        phone: "9876500015",
        department: "Physics",
        designation: "Assistant Professor",
        courses: 2,
        status: "Active"
    },

    {
        id: "FAC106",
        name: "Dr. Arun Das",
        initials: "AD",
        email: "arun.das@campuscore.edu",
        phone: "9876500016",
        department: "Computer Science",
        designation: "Associate Professor",
        courses: 4,
        status: "Active"
    }

];

/* =====================================================
   FACULTY MANAGEMENT PAGE
===================================================== */

function showFacultyPage() {

    appState.currentPage = "faculty";

    const content =
        document.getElementById(
            "dashboardContent"
        );

    document.getElementById(
        "dashboardPageTitle"
    ).textContent = "Faculty";


    content.innerHTML = `

        <div class="dashboard-welcome">

            <div>

                <span class="section-label">
                    ADMINISTRATION
                </span>

                <h1>
                    Faculty Management
                </h1>

                <p>
                    Manage faculty profiles,
                    departments and course assignments.
                </p>

            </div>


            <button
                class="dashboard-button
                       dashboard-button-primary"
                id="openAddFaculty">

                + Add Faculty

            </button>

        </div>


        <div class="faculty-summary">

            <div class="faculty-summary-card">

                <span>
                    TOTAL FACULTY
                </span>

                <strong>
                    ${facultyMembers.length}
                </strong>

            </div>


            <div class="faculty-summary-card">

                <span>
                    ACTIVE
                </span>

                <strong>
                    ${
                        facultyMembers.filter(
                            f => f.status === "Active"
                        ).length
                    }
                </strong>

            </div>


            <div class="faculty-summary-card">

                <span>
                    DEPARTMENTS
                </span>

                <strong>
                    ${
                        new Set(
                            facultyMembers.map(
                                f => f.department
                            )
                        ).size
                    }
                </strong>

            </div>


            <div class="faculty-summary-card">

                <span>
                    COURSES ASSIGNED
                </span>

                <strong>
                    ${
                        facultyMembers.reduce(
                            (total, f) =>
                                total + f.courses,
                            0
                        )
                    }
                </strong>

            </div>

        </div>


        <div class="dashboard-card">

            <div class="page-toolbar">

                <div class="page-toolbar-left">

                    <div class="search-box">

                        <span class="search-icon">
                            ⌕
                        </span>

                        <input
                            type="search"
                            id="facultySearch"
                            placeholder="Search faculty...">

                    </div>


                    <select
                        class="filter-select"
                        id="facultyDepartmentFilter">

                        <option value="all">
                            All Departments
                        </option>

                        <option>
                            Computer Science
                        </option>

                        <option>
                            Electronics
                        </option>

                        <option>
                            Commerce
                        </option>

                        <option>
                            Mathematics
                        </option>

                        <option>
                            Physics
                        </option>

                    </select>

                </div>

            </div>


            <div
                class="faculty-table-wrapper"
                id="facultyTableContainer">

                ${renderFacultyTable(facultyMembers)}

            </div>

        </div>

    `;


    initializeFacultyManagement();

    updateActiveNavigation();

}

/* =====================================================
   FACULTY TABLE
===================================================== */

function renderFacultyTable(data) {

    if (data.length === 0) {

        return `

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    ⌕
                </div>

                <h3>
                    No faculty found
                </h3>

                <p>
                    Try changing your search
                    or department filter.
                </p>

            </div>

        `;
    }


    return `

        <table class="faculty-table">

            <thead>

                <tr>

                    <th>
                        FACULTY
                    </th>

                    <th>
                        DEPARTMENT
                    </th>

                    <th>
                        DESIGNATION
                    </th>

                    <th>
                        COURSES
                    </th>

                    <th>
                        STATUS
                    </th>

                    <th>
                        ACTIONS
                    </th>

                </tr>

            </thead>


            <tbody>

                ${data.map(faculty => `

                    <tr>

                        <td>

                            <div class="faculty-info">

                                <div class="faculty-avatar">
                                    ${faculty.initials}
                                </div>

                                <div>

                                    <div class="faculty-name">
                                        ${faculty.name}
                                    </div>

                                    <span class="faculty-id">
                                        ${faculty.id}
                                    </span>

                                </div>

                            </div>

                        </td>


                        <td class="faculty-department">
                            ${faculty.department}
                        </td>


                        <td class="faculty-designation">
                            ${faculty.designation}
                        </td>


                        <td>
                            ${faculty.courses}
                        </td>


                        <td>

                            <span
                                class="faculty-status
                                ${
                                    faculty.status !== "Active"
                                    ? "leave"
                                    : ""
                                }">

                                ${faculty.status}

                            </span>

                        </td>


                        <td>

                            <div class="faculty-actions">

                                <button
                                    class="student-action"
                                    data-faculty-action="view"
                                    data-id="${faculty.id}">

                                    👁

                                </button>


                                <button
                                    class="student-action"
                                    data-faculty-action="edit"
                                    data-id="${faculty.id}">

                                    ✎

                                </button>


                                <button
                                    class="student-action delete"
                                    data-faculty-action="delete"
                                    data-id="${faculty.id}">

                                    ×

                                </button>

                            </div>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>


        <div class="table-footer">

            <span class="table-count">

                Showing ${data.length}
                of ${facultyMembers.length} faculty members

            </span>


            <div class="pagination">

                <button class="page-number active">
                    1
                </button>

                <button class="page-number">
                    2
                </button>

                <button class="page-number">
                    →
                </button>

            </div>

        </div>

    `;

}

/* =====================================================
   FACULTY EVENTS
===================================================== */

function initializeFacultyManagement() {

    const search =
        document.getElementById(
            "facultySearch"
        );

    const department =
        document.getElementById(
            "facultyDepartmentFilter"
        );

    const addButton =
        document.getElementById(
            "openAddFaculty"
        );


    function applyFacultyFilters() {

        const searchValue =
            search.value
                .toLowerCase()
                .trim();

        const departmentValue =
            department.value;


        const filtered =
            facultyMembers.filter(faculty => {

                const matchesSearch =
                    faculty.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    faculty.id
                        .toLowerCase()
                        .includes(searchValue) ||

                    faculty.designation
                        .toLowerCase()
                        .includes(searchValue);


                const matchesDepartment =
                    departmentValue === "all" ||
                    faculty.department ===
                    departmentValue;


                return (
                    matchesSearch &&
                    matchesDepartment
                );

            });


        document.getElementById(
            "facultyTableContainer"
        ).innerHTML =
            renderFacultyTable(filtered);


        initializeFacultyActions();

    }


    search.addEventListener(
        "input",
        applyFacultyFilters
    );


    department.addEventListener(
        "change",
        applyFacultyFilters
    );


    addButton.addEventListener(
        "click",
        () => {

            openFacultyModal();

        }
    );


    initializeFacultyActions();

}

/* =====================================================
   FACULTY ACTIONS
===================================================== */

function initializeFacultyActions() {

    document
        .querySelectorAll(
            "[data-faculty-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    const action =
                        button.dataset.facultyAction;


                    if (action === "view") {

                        viewFaculty(id);

                    }


                    if (action === "edit") {

                        const faculty =
                            facultyMembers.find(
                                f => f.id === id
                            );

                        if (faculty) {

                            openFacultyModal(
                                faculty
                            );

                        }

                    }


                    if (action === "delete") {

                        deleteFaculty(id);

                    }

                }
            );

        });

}

/* =====================================================
   FACULTY MODAL
===================================================== */

function openFacultyModal(
    faculty = null
) {

    const isEdit =
        faculty !== null;


    const modal =
        document.createElement("div");

    modal.className =
        "modal-overlay";

    modal.id =
        "facultyModal";


    modal.innerHTML = `

        <div class="modal-card">

            <div class="modal-header">

                <h2>
                    ${
                        isEdit
                        ? "Edit Faculty"
                        : "Add New Faculty"
                    }
                </h2>


                <button
                    class="modal-close"
                    id="closeFacultyModal">

                    ×

                </button>

            </div>


            <form id="facultyForm">

                <div class="faculty-modal-grid">

                    <div class="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            id="facultyName"
                            type="text"
                            value="${faculty?.name || ""}"
                            placeholder="Faculty name"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Faculty ID
                        </label>

                        <input
                            id="facultyId"
                            type="text"
                            value="${faculty?.id || ""}"
                            placeholder="FAC107"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            id="facultyEmail"
                            type="email"
                            value="${faculty?.email || ""}"
                            placeholder="faculty@college.edu"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Phone
                        </label>

                        <input
                            id="facultyPhone"
                            type="tel"
                            value="${faculty?.phone || ""}"
                            placeholder="Phone number"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Department
                        </label>

                        <select id="facultyDepartment">

                            ${[
                                "Computer Science",
                                "Electronics",
                                "Commerce",
                                "Mathematics",
                                "Physics"
                            ].map(dept => `

                                <option
                                    ${
                                        faculty?.department === dept
                                        ? "selected"
                                        : ""
                                    }>

                                    ${dept}

                                </option>

                            `).join("")}

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Designation
                        </label>

                        <select id="facultyDesignation">

                            ${[
                                "Assistant Professor",
                                "Associate Professor",
                                "Professor",
                                "Lecturer"
                            ].map(designation => `

                                <option
                                    ${
                                        faculty?.designation ===
                                        designation
                                        ? "selected"
                                        : ""
                                    }>

                                    ${designation}

                                </option>

                            `).join("")}

                        </select>

                    </div>

                </div>


                <div class="modal-actions">

                    <button
                        type="button"
                        class="modal-button cancel"
                        id="cancelFacultyModal">

                        Cancel

                    </button>


                    <button
                        type="submit"
                        class="modal-button save">

                        ${
                            isEdit
                            ? "Save Changes"
                            : "Add Faculty"
                        }

                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(modal);


    document
        .getElementById(
            "closeFacultyModal"
        )
        .addEventListener(
            "click",
            closeFacultyModal
        );


    document
        .getElementById(
            "cancelFacultyModal"
        )
        .addEventListener(
            "click",
            closeFacultyModal
        );


    document
        .getElementById(
            "facultyForm"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();

                saveFaculty(
                    faculty?.id || null
                );

            }
        );

}

/* =====================================================
   SAVE FACULTY
===================================================== */

function saveFaculty(existingId) {

    const name =
        document.getElementById(
            "facultyName"
        ).value.trim();

    const id =
        document.getElementById(
            "facultyId"
        ).value.trim();

    const email =
        document.getElementById(
            "facultyEmail"
        ).value.trim();

    const phone =
        document.getElementById(
            "facultyPhone"
        ).value.trim();

    const department =
        document.getElementById(
            "facultyDepartment"
        ).value;

    const designation =
        document.getElementById(
            "facultyDesignation"
        ).value;


    if (
        !name ||
        !id ||
        !email ||
        !phone
    ) {

        showMessage(
            "Please complete all faculty details.",
            "error"
        );

        return;

    }


    const initials =
        name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();


    if (existingId) {

        const faculty =
            facultyMembers.find(
                f => f.id === existingId
            );


        if (faculty) {

            faculty.name = name;
            faculty.id = id;
            faculty.email = email;
            faculty.phone = phone;
            faculty.department = department;
            faculty.designation = designation;
            faculty.initials = initials;

        }


        showMessage(
            "Faculty details updated successfully.",
            "success"
        );

    } else {

        facultyMembers.push({

            id,

            name,

            initials,

            email,

            phone,

            department,

            designation,

            courses: 0,

            status: "Active"

        });


        showMessage(
            "Faculty member added successfully.",
            "success"
        );

    }


    closeFacultyModal();

    showFacultyPage();

}


/* =====================================================
   VIEW FACULTY
===================================================== */

function viewFaculty(id) {

    const faculty =
        facultyMembers.find(
            f => f.id === id
        );


    if (!faculty) {
        return;
    }


    showMessage(
        `${faculty.name} — ${faculty.designation}`,
        "info"
    );

}


/* =====================================================
   DELETE FACULTY
===================================================== */

function deleteFaculty(id) {

    const faculty =
        facultyMembers.find(
            f => f.id === id
        );


    if (!faculty) {
        return;
    }


    const confirmed =
        confirm(
            `Delete ${faculty.name} from faculty records?`
        );


    if (!confirmed) {
        return;
    }


    facultyMembers =
        facultyMembers.filter(
            f => f.id !== id
        );


    showMessage(
        "Faculty member deleted successfully.",
        "success"
    );


    showFacultyPage();

}


/* =====================================================
   CLOSE FACULTY MODAL
===================================================== */

function closeFacultyModal() {

    const modal =
        document.getElementById(
            "facultyModal"
        );


    if (modal) {

        modal.remove();

    }

}

/* =====================================================
   SIDEBAR NAVIGATION — FIX
===================================================== */

document.addEventListener("click", function (event) {

    const navItem =
        event.target.closest("[data-page]");

    if (!navItem) {
        return;
    }

    const page =
        navItem.dataset.page;

    if (!page) {
        return;
    }

    event.preventDefault();


    /* Dashboard */

    if (page === "dashboard") {

        if (typeof createAdminDashboard === "function") {
            createAdminDashboard();
        }

        return;
    }


    /* Students */

    if (page === "students") {

        if (typeof showStudentsPage === "function") {
            showStudentsPage();
        }

        return;
    }


    /* Faculty */

    if (page === "faculty") {

        if (typeof showFacultyPage === "function") {
            showFacultyPage();
        }

        return;
    }


    /* Other pages */

    if (typeof showPagePlaceholder === "function") {

        showPagePlaceholder(page);

    }

});



/* =====================================================
   COURSE DATA
===================================================== */

let courses = [

    {
        code: "CS301",
        name: "Data Structures",
        department: "Computer Science",
        semester: "Semester 3",
        credits: 4,
        faculty: "Dr. Anjali Rao",
        students: 46
    },

    {
        code: "CS302",
        name: "Java Programming",
        department: "Computer Science",
        semester: "Semester 3",
        credits: 4,
        faculty: "Dr. Anjali Rao",
        students: 52
    },

    {
        code: "CS303",
        name: "Object Oriented Programming",
        department: "Computer Science",
        semester: "Semester 3",
        credits: 3,
        faculty: "Dr. Arun Das",
        students: 48
    },

    {
        code: "EC301",
        name: "Digital Electronics",
        department: "Electronics",
        semester: "Semester 3",
        credits: 4,
        faculty: "Dr. Rahul Menon",
        students: 41
    },

    {
        code: "CM501",
        name: "Financial Management",
        department: "Commerce",
        semester: "Semester 5",
        credits: 3,
        faculty: "Prof. Sneha Thomas",
        students: 44
    },

    {
        code: "MA101",
        name: "Engineering Mathematics",
        department: "Mathematics",
        semester: "Semester 1",
        credits: 4,
        faculty: "Dr. Vivek Kumar",
        students: 63
    }

];

/* =====================================================
   COURSE MANAGEMENT PAGE
===================================================== */

function showCoursesPage() {

    appState.currentPage = "courses";


    const content =
        document.getElementById(
            "dashboardContent"
        );


    document.getElementById(
        "dashboardPageTitle"
    ).textContent = "Courses";


    content.innerHTML = `

        <div class="dashboard-welcome">

            <div>

                <span class="section-label">
                    ACADEMICS
                </span>

                <h1>
                    Course Management
                </h1>

                <p>
                    Manage courses, credits,
                    faculty allocation and enrollment.
                </p>

            </div>


            <button
                class="dashboard-button
                       dashboard-button-primary"
                id="openAddCourse">

                + Add Course

            </button>

        </div>


        <div class="course-summary">

            <div class="course-summary-card">

                <span>
                    TOTAL COURSES
                </span>

                <strong>
                    ${courses.length}
                </strong>

            </div>


            <div class="course-summary-card">

                <span>
                    DEPARTMENTS
                </span>

                <strong>
                    ${
                        new Set(
                            courses.map(
                                c => c.department
                            )
                        ).size
                    }
                </strong>

            </div>


            <div class="course-summary-card">

                <span>
                    TOTAL CREDITS
                </span>

                <strong>
                    ${
                        courses.reduce(
                            (total, c) =>
                                total + c.credits,
                            0
                        )
                    }
                </strong>

            </div>


            <div class="course-summary-card">

                <span>
                    ENROLLED STUDENTS
                </span>

                <strong>
                    ${
                        courses.reduce(
                            (total, c) =>
                                total + c.students,
                            0
                        )
                    }
                </strong>

            </div>

        </div>


        <div class="dashboard-card">

            <div class="page-toolbar">

                <div class="page-toolbar-left">

                    <div class="search-box">

                        <span class="search-icon">
                            ⌕
                        </span>

                        <input
                            type="search"
                            id="courseSearch"
                            placeholder="Search course or code...">

                    </div>


                    <select
                        class="filter-select"
                        id="courseDepartmentFilter">

                        <option value="all">
                            All Departments
                        </option>

                        <option>
                            Computer Science
                        </option>

                        <option>
                            Electronics
                        </option>

                        <option>
                            Commerce
                        </option>

                        <option>
                            Mathematics
                        </option>

                    </select>


                    <select
                        class="filter-select"
                        id="courseSemesterFilter">

                        <option value="all">
                            All Semesters
                        </option>

                        <option>
                            Semester 1
                        </option>

                        <option>
                            Semester 3
                        </option>

                        <option>
                            Semester 5
                        </option>

                    </select>

                </div>

            </div>


            <div
                class="course-table-wrapper"
                id="courseTableContainer">

                ${renderCourseTable(courses)}

            </div>

        </div>

    `;


    initializeCourseManagement();

    updateActiveNavigation();

}

/* =====================================================
   COURSE TABLE
===================================================== */

function renderCourseTable(data) {

    if (data.length === 0) {

        return `

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    ⌕
                </div>

                <h3>
                    No courses found
                </h3>

                <p>
                    Try changing your search
                    or filter options.
                </p>

            </div>

        `;
    }


    return `

        <table class="course-table">

            <thead>

                <tr>

                    <th>
                        COURSE
                    </th>

                    <th>
                        DEPARTMENT
                    </th>

                    <th>
                        SEMESTER
                    </th>

                    <th>
                        FACULTY
                    </th>

                    <th>
                        CREDITS
                    </th>

                    <th>
                        STUDENTS
                    </th>

                    <th>
                        ACTIONS
                    </th>

                </tr>

            </thead>


            <tbody>

                ${data.map(course => `

                    <tr>

                        <td>

                            <span class="course-code">
                                ${course.code}
                            </span>

                            <div
                                class="course-name"
                                style="margin-top:6px">

                                ${course.name}

                            </div>

                        </td>


                        <td>
                            ${course.department}
                        </td>


                        <td>
                            ${course.semester}
                        </td>


                        <td class="course-faculty">
                            ${course.faculty}
                        </td>


                        <td class="course-credits">
                            ${course.credits}
                        </td>


                        <td class="course-students">
                            ${course.students}
                        </td>


                        <td>

                            <div class="course-actions">

                                <button
                                    class="student-action"
                                    data-course-action="view"
                                    data-code="${course.code}">

                                    👁

                                </button>


                                <button
                                    class="student-action"
                                    data-course-action="edit"
                                    data-code="${course.code}">

                                    ✎

                                </button>


                                <button
                                    class="student-action delete"
                                    data-course-action="delete"
                                    data-code="${course.code}">

                                    ×

                                </button>

                            </div>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>


        <div class="table-footer">

            <span class="table-count">

                Showing ${data.length}
                of ${courses.length} courses

            </span>


            <div class="pagination">

                <button class="page-number active">
                    1
                </button>

                <button class="page-number">
                    2
                </button>

                <button class="page-number">
                    →
                </button>

            </div>

        </div>

    `;

}

/* =====================================================
   COURSE EVENTS
===================================================== */

function initializeCourseManagement() {

    const search =
        document.getElementById(
            "courseSearch"
        );

    const department =
        document.getElementById(
            "courseDepartmentFilter"
        );

    const semester =
        document.getElementById(
            "courseSemesterFilter"
        );

    const addButton =
        document.getElementById(
            "openAddCourse"
        );


    function applyCourseFilters() {

        const searchValue =
            search.value
                .toLowerCase()
                .trim();

        const departmentValue =
            department.value;

        const semesterValue =
            semester.value;


        const filtered =
            courses.filter(course => {

                const matchesSearch =
                    course.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    course.code
                        .toLowerCase()
                        .includes(searchValue);


                const matchesDepartment =
                    departmentValue === "all" ||
                    course.department ===
                    departmentValue;


                const matchesSemester =
                    semesterValue === "all" ||
                    course.semester ===
                    semesterValue;


                return (
                    matchesSearch &&
                    matchesDepartment &&
                    matchesSemester
                );

            });


        document.getElementById(
            "courseTableContainer"
        ).innerHTML =
            renderCourseTable(filtered);


        initializeCourseActions();

    }


    search.addEventListener(
        "input",
        applyCourseFilters
    );


    department.addEventListener(
        "change",
        applyCourseFilters
    );


    semester.addEventListener(
        "change",
        applyCourseFilters
    );


    addButton.addEventListener(
        "click",
        () => {

            openCourseModal();

        }
    );


    initializeCourseActions();

}

/* =====================================================
   COURSE ACTIONS
===================================================== */

function initializeCourseActions() {

    document
        .querySelectorAll(
            "[data-course-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const code =
                        button.dataset.code;

                    const action =
                        button.dataset.courseAction;


                    const course =
                        courses.find(
                            c => c.code === code
                        );


                    if (!course) {
                        return;
                    }


                    if (action === "view") {

                        showMessage(
                            `${course.code} — ${course.name}`,
                            "info"
                        );

                    }


                    if (action === "edit") {

                        openCourseModal(course);

                    }


                    if (action === "delete") {

                        deleteCourse(code);

                    }

                }
            );

        });

}

/* =====================================================
   COURSE MODAL
===================================================== */

function openCourseModal(course = null) {

    const isEdit =
        course !== null;


    const modal =
        document.createElement("div");

    modal.className =
        "modal-overlay";

    modal.id =
        "courseModal";


    modal.innerHTML = `

        <div class="modal-card">

            <div class="modal-header">

                <h2>
                    ${
                        isEdit
                        ? "Edit Course"
                        : "Add New Course"
                    }
                </h2>


                <button
                    class="modal-close"
                    id="closeCourseModal">

                    ×

                </button>

            </div>


            <form id="courseForm">

                <div class="course-modal-grid">

                    <div class="form-group">

                        <label>
                            Course Code
                        </label>

                        <input
                            id="courseCode"
                            type="text"
                            value="${course?.code || ""}"
                            placeholder="CS401"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Course Name
                        </label>

                        <input
                            id="courseName"
                            type="text"
                            value="${course?.name || ""}"
                            placeholder="Course name"
                            required>

                    </div>


                    <div class="form-group">

                        <label>
                            Department
                        </label>

                        <select id="courseDepartment">

                            ${[
                                "Computer Science",
                                "Electronics",
                                "Commerce",
                                "Mathematics",
                                "Physics"
                            ].map(dept => `

                                <option
                                    ${
                                        course?.department === dept
                                        ? "selected"
                                        : ""
                                    }>

                                    ${dept}

                                </option>

                            `).join("")}

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Semester
                        </label>

                        <select id="courseSemester">

                            ${[
                                "Semester 1",
                                "Semester 3",
                                "Semester 5"
                            ].map(sem => `

                                <option
                                    ${
                                        course?.semester === sem
                                        ? "selected"
                                        : ""
                                    }>

                                    ${sem}

                                </option>

                            `).join("")}

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Credits
                        </label>

                        <select id="courseCredits">

                            ${[1, 2, 3, 4, 5, 6]
                                .map(c => `

                                    <option
                                        value="${c}"
                                        ${
                                            course?.credits === c
                                            ? "selected"
                                            : ""
                                        }>

                                        ${c} Credits

                                    </option>

                                `).join("")}

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Assigned Faculty
                        </label>

                        <select id="courseFaculty">

                            ${facultyMembers.map(f => `

                                <option
                                    ${
                                        course?.faculty === f.name
                                        ? "selected"
                                        : ""
                                    }>

                                    ${f.name}

                                </option>

                            `).join("")}

                        </select>

                    </div>

                </div>


                <div class="modal-actions">

                    <button
                        type="button"
                        class="modal-button cancel"
                        id="cancelCourseModal">

                        Cancel

                    </button>


                    <button
                        type="submit"
                        class="modal-button save">

                        ${
                            isEdit
                            ? "Save Changes"
                            : "Add Course"
                        }

                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(modal);


    document
        .getElementById(
            "closeCourseModal"
        )
        .addEventListener(
            "click",
            closeCourseModal
        );


    document
        .getElementById(
            "cancelCourseModal"
        )
        .addEventListener(
            "click",
            closeCourseModal
        );


    document
        .getElementById(
            "courseForm"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();

                saveCourse(
                    course?.code || null
                );

            }
        );

}

/* =====================================================
   SAVE COURSE
===================================================== */

function saveCourse(existingCode) {

    const code =
        document.getElementById(
            "courseCode"
        ).value.trim().toUpperCase();

    const name =
        document.getElementById(
            "courseName"
        ).value.trim();

    const department =
        document.getElementById(
            "courseDepartment"
        ).value;

    const semester =
        document.getElementById(
            "courseSemester"
        ).value;

    const credits =
        Number(
            document.getElementById(
                "courseCredits"
            ).value
        );

    const faculty =
        document.getElementById(
            "courseFaculty"
        ).value;


    if (!code || !name) {

        showMessage(
            "Please enter course code and name.",
            "error"
        );

        return;
    }


    if (existingCode) {

        const course =
            courses.find(
                c => c.code === existingCode
            );


        if (course) {

            course.code = code;
            course.name = name;
            course.department = department;
            course.semester = semester;
            course.credits = credits;
            course.faculty = faculty;

        }


        showMessage(
            "Course updated successfully.",
            "success"
        );

    } else {

        courses.push({

            code,

            name,

            department,

            semester,

            credits,

            faculty,

            students: 0

        });


        showMessage(
            "Course added successfully.",
            "success"
        );

    }


    closeCourseModal();

    showCoursesPage();

}


/* =====================================================
   DELETE COURSE
===================================================== */

function deleteCourse(code) {

    const course =
        courses.find(
            c => c.code === code
        );


    if (!course) {
        return;
    }


    const confirmed =
        confirm(
            `Delete ${course.name} (${course.code})?`
        );


    if (!confirmed) {
        return;
    }


    courses =
        courses.filter(
            c => c.code !== code
        );


    showMessage(
        "Course deleted successfully.",
        "success"
    );


    showCoursesPage();

}


/* =====================================================
   CLOSE COURSE MODAL
===================================================== */

function closeCourseModal() {

    const modal =
        document.getElementById(
            "courseModal"
        );


    if (modal) {

        modal.remove();

    }

}

