# E-Commerce System - Full Stack Implementation

## 🏗️ Architecture Overview

This project implements a **clean architecture** following industry best practices with proper design patterns.

### Design Patterns Implemented

#### 1. **MVC (Model-View-Controller)**
- **Model**: Repository layer (`repository.js`) handles data access
- **View**: React components (frontend)
- **Controller**: Controller layer (`controllers/`) handles business logic routing

#### 2. **Repository Pattern**
- Centralized data access layer
- File: `backend/repository.js`
- Provides CRUD operations abstraction
- Easy to swap JSON file with real database

#### 3. **Strategy Pattern**
- Verification system with interchangeable strategies
- File: `backend/services/authService.js`
- `EmailVerificationStrategy` and `WhatsAppVerificationStrategy`
- Can easily add SMS, Phone, etc.

### Backend Structure

```
backend/
├── server.js                 # Express server setup
├── database.json             # JSON file database
├── repository.js             # Repository pattern implementation
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── controllers/             # MVC Controllers
│   ├── authController.js
│   ├── categoryController.js
│   └── productController.js
├── services/                # Business logic layer
│   ├── authService.js       # Auth + Strategy pattern
│   ├── categoryService.js
│   └── productService.js
└── routes/                  # RESTful API routes
    ├── authRoutes.js
    ├── categoryRoutes.js
    └── productRoutes.js
```

### Frontend Structure

```,
src/
├── App.jsx                  # Main app with routing
├── context/
│   └── AuthContext.jsx      # Global auth state
├── services/
│   └── api.js              # API service layer
├── auth/                    # Authentication components
│   ├── UserRegistration.jsx
│   ├── login.jsx
│   └── Auth.css
├── admin/                   # Admin components
│   ├── CRUDforCategories.jsx
│   └── Admin.css
└── customer/                # Customer components
    ├── View-all-products.jsx
    └── Customer.css
```

## 🔐 JWT Authentication

### Implementation
- **Token Generation**: `jsonwebtoken` library
- **Password Hashing**: `bcryptjs` with salt rounds
- **Token Storage**: localStorage (frontend)
- **Token Verification**: Middleware on protected routes

### Protected Routes
- `POST /api/categories` - Admin only
- `PUT /api/categories/:id` - Admin only
- `DELETE /api/categories/:id` - Admin only

## 📡 RESTful API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/verify      - Verify JWT token
```

### Categories (Admin Protected)
```
GET    /api/categories       - Get all categories
GET    /api/categories/:id   - Get category by ID
POST   /api/categories       - Create category (Admin)
PUT    /api/categories/:id   - Update category (Admin)
DELETE /api/categories/:id   - Delete category (Admin)
```

### Products
```
GET    /api/products         - Get all products
GET    /api/products?search=term - Search products
GET    /api/products?categoryId=1 - Filter by category
GET    /api/products/:id     - Get product by ID
```

## 🚀 Running the Application

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on: `http://localhost:5000`

### Frontend
```bash
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 🧪 Testing the System

### 1. Register a User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123",
  "role": "customer"
}
```

### 2. Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@test.com",
  "password": "password123"
}
```

### 3. Create Category (Admin)
```bash
POST http://localhost:5000/api/categories
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic devices"
}
```

## ✅ Features Implemented

### Authentication
- ✅ User registration with validation
- ✅ Login with JWT token generation
- ✅ Password hashing with bcrypt
- ✅ Token verification middleware
- ✅ Role-based access control

### Admin Features
- ✅ Create categories
- ✅ Read all categories
- ✅ Update categories
- ✅ Delete categories
- ✅ Protected routes (admin only)

### Customer Features
- ✅ View all products
- ✅ Search products
- ✅ Filter by category
- ✅ Responsive UI

### Design Patterns
- ✅ MVC Pattern
- ✅ Repository Pattern
- ✅ Strategy Pattern (verification)
- ✅ Service Layer Pattern
- ✅ Middleware Pattern

## 📱 Responsive Design

The frontend is fully responsive with breakpoints:
- **Desktop**: > 768px
- **Tablet**: 480px - 768px
- **Mobile**: < 480px

Features:
- Flexible grid layouts
- Mobile-friendly navigation
- Touch-optimized buttons
- Readable typography on all devices

## 🔒 Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Signed with secret key
3. **Protected Routes**: Middleware authentication
4. **Role-Based Access**: Admin vs Customer permissions
5. **Input Validation**: Frontend and backend validation

## 📊 Database Schema (JSON)

```json
{
  "users": [
    {
      "id": 1,
      "name": "string",
      "email": "string",
      "password": "hashed_string",
      "role": "admin|customer",
      "verified": boolean
    }
  ],
  "categories": [
    {
      "id": 1,
      "name": "string",
      "description": "string"
    }
  ],
  "products": [
    {
      "id": 1,
      "name": "string",
      "categoryId": number,
      "price": number,
      "description": "string"
    }
  ]
}
```

## 🎯 Clean Architecture Benefits

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Easy to unit test each layer independently
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features or swap implementations
5. **Reusability**: Services and repositories can be reused

## 🔄 Future Enhancements

- Add product CRUD for admin
- Implement shopping cart
- Add order management
- Email/WhatsApp verification integration
- Unit and integration tests
- Docker containerization
- CI/CD pipeline
- Azure deployment

## 📝 Notes

- JWT secret should be in environment variables in production
- JSON file database is for demonstration; use MongoDB/PostgreSQL in production
- CORS is enabled for all origins (restrict in production)
- Error handling can be enhanced with custom error classes
