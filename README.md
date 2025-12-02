# 🚀 Blog Platform - Interview Task

A full-stack blog platform built with **Django REST Framework** (backend) and **Next.js 14** (frontend) for a technical interview assessment.

## 🎯 Features Implemented

### ✅ Backend (Django REST Framework)
- RESTful API for blog posts
- Category management
- Search functionality
- Pagination support
- CORS configured for frontend

### ✅ Frontend (Next.js 14)
- Responsive blog listing with grid layout
- Real-time search functionality
- Category filtering
- Individual blog post pages
- Clean, modern UI with Tailwind CSS
- Server-side rendering for SEO

### ✅ Key Technical Highlights
- **Type Safety**: Full TypeScript implementation
- **Performance**: Next.js SSG/SSR for optimal loading
- **UX**: Intuitive search and filtering
- **Code Quality**: Clean, maintainable architecture

## 🏗️ Architecture

```
blog-platform/
├── backend/                 # Django REST API
│   ├── blog/               # Blog app with models, views, serializers
│   ├── config/             # Django settings
│   ├── requirements.txt    # Python dependencies
│   └── manage.py          # Django management
│
├── blog-frontend/          # Next.js 14 Frontend
│   ├── src/app/           # App router pages
│   ├── src/components/    # Reusable React components
│   ├── src/lib/           # API utilities
│   └── package.json       # Node.js dependencies
│
└── README.md              # This file
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\\Scripts\\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
API will run at: http://localhost:8000

### Frontend Setup
```bash
cd blog-frontend
npm install
npm run dev
```
Frontend will run at: http://localhost:3000

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/` | List all blog posts |
| GET | `/api/posts/{slug}/` | Get single post |
| GET | `/api/categories/` | List all categories |
| GET | `/api/posts/?search={query}` | Search posts |
| GET | `/api/posts/?category={slug}` | Filter by category |

## 🛠️ Tech Stack

**Backend:**
- Django 4.2
- Django REST Framework
- SQLite (dev) / PostgreSQL (prod ready)
- CORS headers

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

## 📱 Features Demo

1. **Home Page**: Grid of all blog posts
2. **Search**: Real-time search across posts
3. **Filtering**: Category-based filtering
4. **Blog Detail**: Individual post with full content
5. **Responsive**: Works on mobile, tablet, desktop

## 🧪 Testing the Application

1. Start backend: `python manage.py runserver`
2. Start frontend: `npm run dev`
3. Visit: http://localhost:3000
4. Try:
   - Searching for posts
   - Filtering by categories
   - Clicking on individual posts

## 🔧 Environment Variables

Create `.env` in backend:
```env
DEBUG=True
SECRET_KEY=your-secret-key
```

Create `.env.local` in frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📄 License

MIT License - Built for technical interview assessment.
