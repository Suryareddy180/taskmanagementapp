# 📋 Task Management Application

A modern, full-stack task management application built with **Next.js** and **Django**, featuring a beautiful UI with persistent storage powered by PostgreSQL on Railway.

![Task Management App](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Django](https://img.shields.io/badge/Django-4.2-green?style=for-the-badge&logo=django)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Railway](https://img.shields.io/badge/Railway-Deployed-purple?style=for-the-badge&logo=railway)

## ✨ Features

- 🎨 **Beautiful Modern UI** - Dark theme with glassmorphism effects and smooth animations
- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete tasks seamlessly
- 🎯 **Priority Management** - Organize tasks by Low, Medium, or High priority
- 📁 **Category Filtering** - Custom categories for better organization
- 🔍 **Search Functionality** - Quick search across task titles and descriptions
- 📅 **Due Date Tracking** - Never miss a deadline with date-based organization
- 💾 **Persistent Storage** - PostgreSQL database hosted on Railway
- 🚀 **RESTful API** - Django REST Framework backend
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend
- **Django 4.2** - Python web framework
- **Django REST Framework** - Powerful API toolkit
- **PostgreSQL** - Relational database on Railway
- **Gunicorn** - WSGI HTTP Server
- **WhiteNoise** - Static file serving

## 📋 Prerequisites

- **Node.js** 18+ and pnpm
- **Python** 3.11+
- **PostgreSQL** (or use Railway database)
- **Git**

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Suryareddy180/taskmanagementapp.git
cd task-management-app
```

### 2️⃣ Backend Setup (Django)

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Create a superuser (optional, for admin access):

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api/`

### 3️⃣ Frontend Setup (Next.js)

Open a new terminal and navigate to the project root:

```bash
cd task-management-app
```

Install dependencies:

```bash
pnpm install
```

Create environment file:

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and set:
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the development server:

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks/` | List all tasks |
| `POST` | `/api/tasks/` | Create a new task |
| `GET` | `/api/tasks/{id}/` | Get task details |
| `PUT` | `/api/tasks/{id}/` | Update a task |
| `DELETE` | `/api/tasks/{id}/` | Delete a task |
| `PATCH` | `/api/tasks/{id}/toggle/` | Toggle completion status |
| `GET` | `/api/tasks/categories/` | Get all categories |
| `GET` | `/api/tasks/stats/` | Get task statistics |

### Example API Request

**Create a Task:**
```bash
curl -X POST http://localhost:8000/api/tasks/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "priority": "high",
    "category": "Documentation",
    "dueDate": "2025-12-31",
    "completed": false
  }'
```

## 📊 Database Schema

```
Task Model:
- id (UUID): Primary key
- title (String): Task title
- description (Text): Detailed description
- priority (Choice): low, medium, high
- category (String): Custom category
- due_date (Date): Deadline
- completed (Boolean): Completion status
- created_at (DateTime): Creation timestamp
- updated_at (DateTime): Last update timestamp
```

## 🚂 Railway Deployment

### Backend Deployment

1. **Push to GitHub** (if not already done):
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Railway**:
   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the Django app
   - Add environment variables:
     - `DATABASE_URL`: (Already set by Railway PostgreSQL)
     - `SECRET_KEY`: Your Django secret key
     - `DEBUG`: `False`
     - `ALLOWED_HOSTS`: Your Railway domain

3. **The Procfile handles**:
   - Automatic migrations on deployment
   - Gunicorn server startup

### Frontend Deployment

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Option 2: Railway**
- Create a new project from the same repo
- Set root directory to `.` (project root)
- Add environment variable:
  - `NEXT_PUBLIC_API_URL`: Your Railway backend URL + `/api`

## 🎯 Usage

1. **Create Tasks**: Click the "+ New Task" button
2. **View Details**: Click on any task card to see full details
3. **Edit Tasks**: Click "Edit Task" in the detail view
4. **Delete Tasks**: Click "Delete Task" and confirm
5. **Toggle Completion**: Click the checkbox on any task
6. **Filter & Search**: Use the filters and search bar to find tasks
7. **Organize**: Add custom categories to group related tasks

## 📁 Project Structure

```
task-management-app/
├── backend/                    # Django backend
│   ├── taskmanager/           # Django project settings
│   │   ├── settings.py        # Configuration
│   │   ├── urls.py            # URL routing
│   │   └── wsgi.py            # WSGI config
│   ├── tasks/                 # Tasks app
│   │   ├── models.py          # Task model
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   └── urls.py            # API routes
│   ├── manage.py              # Django CLI
│   ├── requirements.txt       # Python dependencies
│   └── Procfile               # Railway config
├── components/                # React components
│   ├── dashboard.tsx          # Main dashboard
│   ├── task-form.tsx          # Task create/edit form
│   ├── task-list.tsx          # Task list view
│   ├── task-detail.tsx        # Task detail view
│   └── ui/                    # Reusable UI components
├── lib/
│   └── api.ts                 # API utility functions
├── app/                       # Next.js app directory
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── .env.example               # Environment template
├── package.json               # Node dependencies
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables

**Backend (.env in backend/):**
```env
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=.railway.app,localhost
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Run migrations: `python manage.py migrate`

**Frontend API errors:**
- Verify backend is running on port 8000
- Check NEXT_PUBLIC_API_URL in .env.local
- Ensure CORS is configured (already set in settings.py)

**Railway deployment issues:**
- Check build logs in Railway dashboard
- Verify all environment variables are set
- Ensure Procfile is in backend directory

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Surya Reddy**

- GitHub: [@Suryareddy180](https://github.com/Suryareddy180)
- Repository: [taskmanagementapp](https://github.com/Suryareddy180/taskmanagementapp)

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Railway](https://railway.app/)

---

**Happy Task Managing! 🎉**
