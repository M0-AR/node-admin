# Node-Admin Backend: Enterprise Administrative Dashboard API

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)

A robust, scalable, and secure RESTful API built with Node.js and TypeScript, designed to power modern administrative dashboards. This project provides a comprehensive suite of tools for user management, role-based access control (RBAC), product inventory, and business intelligence reporting.

---

## 🚀 Project Overview

The **Node-Admin Backend** is an enterprise-ready solution for managing internal operations. Whether you are building an e-commerce back-office, a CMS, or a corporate management tool, this API provides the essential infrastructure to handle complex data relationships and security requirements out of the box.

### Business Value
- **Operational Efficiency**: Streamline administrative tasks with centralized user and role management.
- **Data-Driven Insights**: Built-in reporting and analytics for real-time sales tracking.
- **Security First**: Granular permission system ensures that sensitive data is only accessible to authorized personnel.
- **Scalable Architecture**: Built on TypeORM and TypeScript, making it easy to extend as business needs grow.

---

## ✨ Key Features

- **Robust Authentication**: Secure login/register flow using JWT (JSON Web Tokens) stored in HTTP-only cookies.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions (View/Edit) for Users, Roles, Products, and Orders.
- **User Management**: Complete CRUD operations for administrators to manage team members.
- **Product Inventory**: Full lifecycle management of products, including image uploads.
- **Order Processing**: Track sales and view detailed order breakdowns.
- **Analytics & Reporting**:
    - **CSV Export**: Export order data for external processing.
    - **Visual Analytics**: Aggregated sales data by date, ready for chart integration.
- **Automated Data Seeding**: Quick-start development with built-in mock data generators.

---

## 🛠 Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/) | Scalable JavaScript runtime for server-side applications. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Adds static typing for improved maintainability and developer experience. |
| **Framework** | [Express](https://expressjs.com/) | Fast, unopinionated, minimalist web framework. |
| **ORM** | [TypeORM](https://typeorm.io/) | Powerful Object-Relational Mapper for TypeScript. |
| **Database** | [MySQL](https://www.mysql.com/) | Reliable relational database for structured data. |
| **Security** | [JWT](https://jwt.io/) & [BcryptJS](https://github.com/dcodeIO/bcrypt.js/) | Industry-standard authentication and password hashing. |
| **Validation** | [Joi](https://joi.dev/) | Schema description and data validation. |
| **File Handling** | [Multer](https://github.com/expressjs/multer) | Middleware for handling `multipart/form-data`. |

---

## 🏗 System Architecture

The project follows a modular, controller-based architecture, ensuring clear separation of concerns:

```text
src/
├── controller/    # Business logic and request handling
├── entity/        # TypeORM models and database schema definitions
├── middleware/    # Security and authentication interceptors
├── seeder/        # Database initialization scripts
├── validation/    # Request payload validation schemas
├── routes.ts      # API endpoint definitions
└── index.ts       # Application entry point and database connection
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18.x recommended)
- MySQL Server
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd node-admin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   SECRET_KEY=your_super_secret_jwt_key
   ```

4. **Database Configuration**:
   Update `ormconfig.json` with your MySQL credentials:
   ```json
   {
     "type": "mysql",
     "host": "localhost",
     "port": 3306,
     "username": "your_username",
     "password": "your_password",
     "database": "node_admin",
     "synchronize": true
   }
   ```

5. **Start the server**:
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:8000`.

---

## 📊 Database Management

### Synchronization
The project uses TypeORM's `synchronize: true` setting in development, which automatically creates and updates database tables based on the entity definitions in `src/entity/`.

### Data Seeding
Quickly populate your database with sample data:
- **Roles & Permissions**: `npm run roles:seed`
- **Products**: `npm run products:seed`
- **Orders**: `npm run orders:seed`

---

## 🔒 Security & Authorization

### Authentication
The system uses a cookie-based JWT authentication strategy. Upon login, a `jwt` cookie is set with the `httpOnly` flag to mitigate XSS attacks.

### Permission Middleware
Access control is implemented via the `PermissionMiddleware`. It checks the authenticated user's role permissions against the required access level:
- **`view_{resource}`**: Grants access to GET requests.
- **`edit_{resource}`**: Grants access to POST, PUT, and DELETE requests.

---

## 📑 API Reference

For a complete list of endpoints and request/response examples, please import the `Node-admin.postman.json` file into Postman.

### Modules Overview:
- **Auth**: `/api/register`, `/api/login`, `/api/logout`, `/api/user`
- **Users**: `/api/users` (Full CRUD)
- **Roles**: `/api/roles` (Full CRUD + Permission assignment)
- **Products**: `/api/products` (Full CRUD + Image Upload)
- **Orders**: `/api/orders`, `/api/export` (CSV), `/api/chart` (Analytics)

---

## 📈 Analytics & Reporting

### Sales Chart
The `/api/chart` endpoint executes a custom SQL query to aggregate total sales per day, providing a perfect data source for frontend charting libraries like Chart.js or Recharts.

### Data Export
The `/api/export` endpoint generates a dynamic CSV file containing all order details, including line items, using the `json2csv` library.

---

## 🛠 Development Tools

- **Nodemon**: Automatically restarts the server on file changes.
- **Postman Collection**: Included `Node-admin.postman.json` for rapid API testing.
- **Faker.js**: Used in seeders to generate realistic mock data.

---

## 📜 License

This project is licensed under the **ISC License**.
