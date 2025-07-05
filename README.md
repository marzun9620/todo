# Todo App

A modern full-stack todo application built with React Router v7, Express.js, PostgreSQL, and Prisma.

## 🚀 Features

- ✅ **User Management** - Create, read, update, delete users
- ✅ **Task Management** - Organize tasks by users (coming soon)
- ✅ **Modern UI** - Clean interface with Tailwind CSS
- ✅ **Full-Stack Architecture** - Separate frontend and backend
- ✅ **Type Safety** - TypeScript throughout
- ✅ **Database** - PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v7** - Client-side routing and data loading
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Backend
- **Express.js** - REST API server
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **TypeScript** - Type safety

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Docker** (for PostgreSQL)
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start PostgreSQL database
```bash
docker-compose up -d
```

### 4. Set up the database
```bash
# Apply schema
docker exec -i todo-postgres psql -U root -d kachi < prisma/schema.sql

# Seed with sample data
docker exec -i todo-postgres psql -U root -d kachi < prisma/seed.sql
```

### 5. Start the development servers
```bash
npm run dev
```

This will start:
- **Frontend** at http://localhost:3000
- **API Server** at http://localhost:4000

## 📁 Project Structure

```
├── server/                 # Express API server
│   ├── index.ts           # Server entry point
│   └── routes/
│       └── users.ts       # User API routes
├── src/                   # React frontend
│   ├── app/               # UI components
│   │   ├── ui/            # Reusable UI components
│   │   └── users/         # User-specific components
│   ├── lib/               # Utilities and data
│   │   ├── db.ts          # Prisma client
│   │   ├── loaders/       # Database operations
│   │   └── types/         # TypeScript types
│   ├── main.tsx           # React Router setup
│   └── routes.tsx         # Route components and loaders
├── prisma/                # Database
│   ├── schema.sql         # Database schema
│   └── seed.sql           # Sample data
├── docker-compose.yml     # PostgreSQL container
└── package.json
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run dev:client   # Start only frontend (port 3000)
npm run dev:server   # Start only backend (port 4000)

# Individual commands
npm run build        # Build for production
```

## 🔌 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /health` - Server health status

## 🗄️ Database Schema

### Users Table
```sql
id          SERIAL PRIMARY KEY
name        VARCHAR(255) NOT NULL
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Tasks Table (Coming Soon)
```sql
id          SERIAL PRIMARY KEY
title       VARCHAR(255) NOT NULL
description TEXT
status      VARCHAR(50) DEFAULT 'pending'
user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

## 🎯 Usage

1. **Navigate to Users**: Click "Users" in the navigation
2. **Add User**: Click "Add User" button
3. **Edit User**: Click "Edit" on any user row
4. **Delete User**: Click "Delete" (will also delete associated tasks)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL container is running
docker ps

# Restart the database
docker-compose down
docker-compose up -d
```

### Port Already in Use
```bash
# Kill processes on ports 3000 or 4000
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### Database Schema Issues
```bash
# Reset and reapply schema
docker exec -i todo-postgres psql -U root -d kachi -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
docker exec -i todo-postgres psql -U root -d kachi < prisma/schema.sql
docker exec -i todo-postgres psql -U root -d kachi < prisma/seed.sql
```

## 🔮 Future Features

- [ ] Task management functionality
- [ ] User authentication
- [ ] Task filtering and search
- [ ] Due dates and reminders
- [ ] Task categories/tags
- [ ] Data export functionality

## 📞 Support

If you have any questions or run into issues, please [open an issue](https://github.com/yourusername/todo-app/issues) on GitHub.
