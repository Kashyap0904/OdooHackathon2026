# Dayflow – Human Resource Management System (HRMS)

**Tagline:** *Every workday, perfectly aligned.*

A comprehensive web-based HRMS designed to digitize and automate daily HR activities for organizations. Built for **Odoo Hackathon 2026 | Odoo x GCET**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Dayflow HRMS is a full-stack web application that replaces manual HR processes with a digital solution. It centralizes employee data, improves transparency, and reduces errors in attendance, leave, and payroll handling.

### What the System Achieves:

- ✅ Digital employee onboarding
- ✅ Automated attendance tracking
- ✅ Online leave management
- ✅ Payroll visibility and management
- ✅ Approval workflows for HR/Admin
- ✅ Role-based access control

---

## ✨ Features

### 🔐 Authentication & Authorization
- User sign up and sign in
- JWT-based authentication
- Role-based access control (Admin, HR Officer, Employee)
- Secure password hashing with bcrypt

### 👥 Employee Management
- Create, view, update, and delete employees
- Comprehensive employee profiles with:
  - Personal information (name, email, phone, address)
  - Date of birth, gender, marital status
  - Emergency contact information
  - Profile picture support
- Auto-generated employee IDs
- Employee status indicators (Present, Absent, On Leave, Special Leave)

### ⏰ Attendance Management
- Daily check-in/check-out functionality
- Real-time attendance tracking
- Attendance history with date, time, and status
- Status indicators (Present, Absent, Half-day, Leave)
- Admin view of all employees' attendance
- Employee view of own attendance

### 🏖️ Leave & Time-Off Management
- Three leave types:
  - **Paid Time Off** (20 days/year)
  - **Sick Leave** (10 days/year)
  - **Unpaid Leaves** (unlimited)
- Leave application with date range selection
- Auto-calculation of total days
- Attachment support for leave requests
- Leave approval/rejection workflow (Admin/HR)
- Leave balance tracking

### 💰 Payroll & Salary Management
- Comprehensive salary structure:
  - **Basic Salary** (editable)
  - **HRA** (40% of Basic - auto-calculated)
  - **DA** (20% of Basic - auto-calculated)
  - **Special Allowance** (editable)
  - **Gross Salary** (auto-calculated)
- Deductions:
  - **PF** (12% of Basic - auto-calculated)
  - **ESI** (0.75% of Gross - auto-calculated)
  - **Professional Tax** (fixed amount - editable)
  - **Net Salary** (auto-calculated)
- Monthly salary calculation based on working days and unpaid leaves
- Salary formula: `(Basic Salary / 22) * (Working Days - Unpaid Leaves)`
- Admin can view and edit all employees' salary
- Employees can view their own salary (read-only)

### 📊 Dashboard Features
- **Employee Dashboard:**
  - Employee cards grid with status indicators
  - Quick check-in/check-out buttons
  - Profile dropdown menu
  - Navigation to all modules

- **Admin Dashboard:**
  - Statistics cards (Total Employees, Present Today, On Leave, Pending Leaves)
  - Employee list with status indicators
  - Quick access to all management features

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

---

## 📁 Project Structure

```
odooHackathon2026/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── adminController.js    # Admin operations
│   │   ├── attendanceController.js # Attendance operations
│   │   ├── authController.js     # Authentication
│   │   ├── leaveController.js    # Leave management
│   │   └── salaryController.js   # Salary management
│   ├── middleware/
│   │   ├── adminMiddleware.js    # Admin authorization
│   │   └── authMiddleware.js    # JWT verification
│   ├── models/
│   │   ├── Attendance.js        # Attendance schema
│   │   ├── Counter.js           # Employee ID counter
│   │   ├── Leave.js              # Leave schema
│   │   ├── Salary.js             # Salary schema
│   │   └── User.js               # User schema
│   ├── routes/
│   │   ├── adminRoutes.js        # Admin routes
│   │   ├── attendanceRoutes.js   # Attendance routes
│   │   ├── authRoutes.js         # Auth routes
│   │   ├── leaveRoutes.js        # Leave routes
│   │   ├── salaryRoutes.js       # Salary routes
│   │   └── userRoutes.js         # User routes
│   ├── server.js                 # Server entry point
│   └── package.json
│
├── dayflow-frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── ProtectedRoute.jsx # Route protection
│       ├── pages/
│       │   ├── AdminAttendance.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── AdminLeaves.jsx
│       │   ├── AdminSalaryInfo.jsx
│       │   ├── ApplyLeave.jsx
│       │   ├── CreateEmployee.jsx
│       │   ├── EmployeeDashboard.jsx
│       │   ├── Login.jsx
│       │   ├── MyAttendance.jsx
│       │   ├── MyLeaves.jsx
│       │   ├── Profile.jsx
│       │   ├── SalaryInfo.jsx
│       │   └── SignUp.jsx
│       ├── api.js                 # API configuration
│       ├── App.js                 # Main app component
│       └── index.js
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd odooHackathon2026
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../dayflow-frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dayflow_hrms
JWT_SECRET=your_secret_key_here
```

2. Update the MongoDB connection string in `backend/config/db.js` if needed.

### Frontend Configuration

1. Create a `.env` file in the `dayflow-frontend` directory:
```env
REACT_APP_API_BASE=http://localhost:5000/api
```

---

## 🎮 Usage

### Starting the Backend Server
```bash
cd backend
npm start
```
The server will run on `http://localhost:5000`

### Starting the Frontend Application
```bash
cd dayflow-frontend
npm start
```
The application will run on `http://localhost:3000`

### Building for Production
```bash
cd dayflow-frontend
npm run build
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Sign Up
```
POST /api/auth/signup
Body: {
  companyName, firstName, lastName, email, phone, password, role
}
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token, role }
```

### User Endpoints

#### Get Current User
```
GET /api/user/me
Headers: Authorization: Bearer <token>
```

#### Update Profile
```
PUT /api/user/me
Headers: Authorization: Bearer <token>
Body: { firstName, lastName, phone, address, dateOfBirth, gender, maritalStatus, emergencyContact }
```

### Admin Endpoints

#### Create Employee
```
POST /api/admin/create-employee
Headers: Authorization: Bearer <token>
Body: { companyName, firstName, lastName, email, phone, address, dateOfBirth, gender, maritalStatus, emergencyContact, basicSalary, specialAllowance }
```

#### Get All Employees
```
GET /api/admin/employees
Headers: Authorization: Bearer <token>
```

#### Get Employee by ID
```
GET /api/admin/employee/:id
Headers: Authorization: Bearer <token>
```

#### Update Employee
```
PUT /api/admin/employee/:id
Headers: Authorization: Bearer <token>
Body: { firstName, lastName, email, phone, address, ... }
```

#### Delete Employee
```
DELETE /api/admin/employee/:id
Headers: Authorization: Bearer <token>
```

#### Change Employee Password
```
PUT /api/admin/employee/:id/password
Headers: Authorization: Bearer <token>
Body: { newPassword }
```

### Attendance Endpoints

#### Check In
```
POST /api/attendance/checkin
Headers: Authorization: Bearer <token>
```

#### Check Out
```
POST /api/attendance/checkout
Headers: Authorization: Bearer <token>
```

#### Get My Attendance
```
GET /api/attendance/my
Headers: Authorization: Bearer <token>
```

#### Get All Attendance (Admin)
```
GET /api/attendance/all
Headers: Authorization: Bearer <token>
```

### Leave Endpoints

#### Apply Leave
```
POST /api/leaves/apply
Headers: Authorization: Bearer <token>
Body: { type, fromDate, toDate, reason, attachment }
```

#### Get My Leaves
```
GET /api/leaves/my
Headers: Authorization: Bearer <token>
```

#### Get All Leaves (Admin)
```
GET /api/leaves/all
Headers: Authorization: Bearer <token>
```

#### Update Leave Status
```
PUT /api/leaves/:id
Headers: Authorization: Bearer <token>
Body: { status: "APPROVED" | "REJECTED" }
```

### Salary Endpoints

#### Get My Salary
```
GET /api/salary/my
Headers: Authorization: Bearer <token>
```

#### Get Employee Salary (Admin)
```
GET /api/salary/employee/:userId
Headers: Authorization: Bearer <token>
```

#### Update Salary (Admin)
```
PUT /api/salary/employee/:userId
Headers: Authorization: Bearer <token>
Body: { basicSalary, specialAllowance, professionalTax }
```

#### Calculate Monthly Salary
```
POST /api/salary/calculate-monthly
Headers: Authorization: Bearer <token>
Body: { month, year, userId? }
```

#### Get All Salaries (Admin)
```
GET /api/salary/all
Headers: Authorization: Bearer <token>
```

---

## 👤 User Roles

### Admin / HR Officer
- Full system access
- Create, view, update, and delete employees
- View and manage all attendance records
- Approve/reject leave requests
- View and edit all employees' salary
- Change employee passwords

### Employee
- View own profile (can edit limited fields)
- Check in/check out
- View own attendance history
- Apply for leave
- View own leave records
- View own salary (read-only)

---

## 🎨 Key Features in Detail

### Salary Calculation Logic

The system automatically calculates:
- **HRA** = 40% of Basic Salary
- **DA** = 20% of Basic Salary
- **Gross Salary** = Basic + HRA + DA + Special Allowance
- **PF** = 12% of Basic Salary
- **ESI** = 0.75% of Gross Salary
- **Net Salary** = Gross - PF - ESI - Professional Tax

### Monthly Salary Calculation
```
Monthly Salary = (Basic Salary / 22) * (Working Days - Unpaid Leaves)
```

### Status Indicators
- 🟢 **Green**: Present
- 🔴 **Red**: Absent
- 🟡 **Yellow**: On Leave
- ⚫ **Grey**: Special Leave

### Leave Balances
- **Paid Time Off**: 20 days/year
- **Sick Leave**: 10 days/year
- **Unpaid Leaves**: Unlimited

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd dayflow-frontend
npm test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is part of **Odoo Hackathon 2026 | Odoo x GCET**.

---

## 👥 Authors

- **Dayflow Team** - *Initial work*

---

## 🙏 Acknowledgments

- Odoo Hackathon 2026 organizers
- GCET for hosting the event
- All contributors and testers

---

## 📞 Support

For support, email support@dayflow.com or create an issue in the repository.

---

## 🔗 Links

- [Excalidraw Design](https://link.excalidraw.com/l/65VNwvy7c4X/58RLEJ4oOwh)
- [Project Documentation](./Dayflow%20-%20Human%20Resource%20Management%20System%20(1)%20(1).pdf)

---

**Made with ❤️ for Odoo Hackathon 2026**
