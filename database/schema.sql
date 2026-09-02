-- =====================================================
-- DATABASE INITIALIZATION
-- =====================================================
CREATE DATABASE IF NOT EXISTS college_management_db;
USE college_management_db;

-- Drop tables in reverse order of foreign key dependency
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS fees;
DROP TABLE IF EXISTS internal_marks;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS course_enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS faculties;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;

-- 1. USERS TABLE
CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'faculty', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. STUDENTS TABLE
CREATE TABLE students (
    student_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) UNIQUE,
    department VARCHAR(50) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    phone VARCHAR(15),
    overall_attendance DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. FACULTIES TABLE
CREATE TABLE faculties (
    faculty_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) UNIQUE,
    department VARCHAR(50) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    phone VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 4. COURSES TABLE
CREATE TABLE courses (
    course_code VARCHAR(20) PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    credits INT NOT NULL,
    faculty_id VARCHAR(50),
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id) ON DELETE SET NULL
);

-- 5. COURSE ENROLLMENTS TABLE (Many-to-Many: Students to Courses)
CREATE TABLE course_enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_enrollment (student_id, course_code),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
);

-- 6. ATTENDANCE TABLE
CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_daily_attendance (student_id, course_code, attendance_date),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
);

-- 7. INTERNAL MARKS TABLE
CREATE TABLE internal_marks (
    mark_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    internal1 DECIMAL(4, 2) DEFAULT 0.00,
    internal2 DECIMAL(4, 2) DEFAULT 0.00,
    assignment DECIMAL(4, 2) DEFAULT 0.00,
    total_marks DECIMAL(5, 2) GENERATED ALWAYS AS (internal1 + internal2 + assignment) STORED,
    UNIQUE KEY unique_student_course_mark (student_id, course_code),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
);

-- 8. FEES TABLE
CREATE TABLE fees (
    fee_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    total_fee DECIMAL(10, 2) NOT NULL,
    paid_amount DECIMAL(10, 2) DEFAULT 0.00,
    status ENUM('Paid', 'Pending', 'Overdue') DEFAULT 'Pending',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

-- 9. ANNOUNCEMENTS TABLE
CREATE TABLE announcements (
    announcement_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    author_id VARCHAR(50) NOT NULL,
    published_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =====================================================
-- INITIAL SEED DATA
-- =====================================================

-- Users
INSERT INTO users (user_id, password_hash, full_name, email, role) VALUES
('ADM001', 'admin123', 'Aarav Menon', 'admin@campuscore.edu', 'admin'),
('FAC101', 'faculty123', 'Dr. Anjali Rao', 'anjali.rao@campuscore.edu', 'faculty'),
('STU202402', 'student123', 'Meera Nair', 'meera.nair@campuscore.edu', 'student');

-- Faculty Details
INSERT INTO faculties (faculty_id, user_id, department, designation, phone) VALUES
('FAC101', 'FAC101', 'Computer Science', 'Professor', '9876501001');

-- Student Details
INSERT INTO students (student_id, user_id, department, semester, phone, overall_attendance) VALUES
('STU202402', 'STU202402', 'Computer Science', 'Semester 3', '9876543210', 94.00);

-- Courses
INSERT INTO courses (course_code, course_name, department, semester, credits, faculty_id) VALUES
('CS301', 'Data Structures', 'Computer Science', 'Semester 3', 4, 'FAC101'),
('CS302', 'Java Programming', 'Computer Science', 'Semester 3', 4, 'FAC101');

-- Enrollments
INSERT INTO course_enrollments (student_id, course_code) VALUES
('STU202402', 'CS301'),
('STU202402', 'CS302');

-- Fees
INSERT INTO fees (student_id, total_fee, paid_amount, status) VALUES
('STU202402', 45000.00, 45000.00, 'Paid');

-- Announcements
INSERT INTO announcements (title, category, message, author_id, published_date) VALUES
('Internal Examination Schedule', 'Academic', 'The internal examination schedule has been published.', 'ADM001', '2026-08-30');




-- Users ടേബിളിലെ role-ൽ parent കൂടി ഉൾപ്പെടുത്തുക
ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'faculty', 'student', 'parent') NOT NULL;

-- Parent-നെ Student ID-യുമായി ബന്ധിപ്പിക്കുന്ന ടേബിൾ
CREATE TABLE IF NOT EXISTS parent_student_map (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    relation VARCHAR(20) DEFAULT 'Parent',
    FOREIGN KEY (parent_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);