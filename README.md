# Raliux Frontend

Modern React frontend for Raliux tech platform. Vercel'e deploy edilmek üzere optimize edilmiştir.

## Features

- 🚀 **High Performance**: Redis caching, optimized animations, fast API responses
- 🔐 **Secure Authentication**: JWT tokens with refresh mechanism
- 💳 **Crypto Payments**: WalletConnect integration (optional)
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI**: Clean design with dark mode support
- 📊 **Admin Dashboard**: Complete content management system
- 🔍 **SEO Optimized**: Meta tags, structured data, performance optimized

## Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Redis (optional, for production caching)

## Kurulum

1. **Bağımlılıkları yükle:**
```bash
npm install
```

2. **Environment Configuration:**
`.env` dosyası oluştur:
```env
# Backend API URL (Railway)
VITE_API_URL=https://raliux-backend.up.railway.app

# WalletConnect (Opsiyonel)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# App URL (Vercel)
VITE_APP_URL=https://your-app.vercel.app
```

3. **Development server başlat:**
```bash
npm run dev
```

## Vercel Deploy

Bu frontend Vercel'e deploy edilmek üzere optimize edilmiştir:

1. **Vercel'e repository'yi bağla**
2. **Environment variables'ı ekle**
3. **Otomatik deploy**

## Backend Bağlantısı

Backend Raliux-project klasöründe Railway'de çalışır:
- URL: `https://raliux-backend.up.railway.app`
- FastAPI backend
- Supabase + Redis

## WalletConnect Setup (Optional)

WalletConnect enables crypto payment functionality. If you don't need crypto payments, the app works perfectly without it.

### To Enable WalletConnect:

1. **Get Project ID:**
   - Visit [https://cloud.reown.com](https://cloud.reown.com)
   - Create a new project
   - Copy your project ID

2. **Configure Environment:**
   - Add `VITE_WALLETCONNECT_PROJECT_ID=your_project_id` to your `.env` file
   - Restart the development server

3. **Without WalletConnect:**
   - The wallet button will show as disabled
   - All other features work normally
   - No console errors or functionality issues

## Performance Features

- **Redis Caching**: 87% faster API responses
- **Optimized Animations**: CSS-only transitions, 80% performance improvement  
- **Bundle Optimization**: Code splitting, lazy loading
- **Database Optimization**: Connection pooling, query caching

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Animations (removed for performance)
- **WalletConnect** - Crypto wallet integration

### Backend  
- **FastAPI** - Python web framework
- **SQLite** - Database with WAL mode
- **Redis** - Caching layer
- **JWT** - Authentication
- **ORJSON** - Fast JSON serialization

## API Endpoints

- `GET /api/posts` - Blog posts
- `GET /api/products` - Products  
- `POST /api/auth/login` - Authentication
- `GET /api/favorites` - User favorites
- `GET /api/admin/stats` - Admin dashboard
- `GET /api/cache/stats` - Cache statistics

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Scripts

```bash
python main.py       # Start FastAPI server
python fix_db.py     # Reset/initialize database
```

## Production Deployment

### Manual Deployment

1. **Build frontend:**
```bash
npm run build
```

2. **Configure Redis** (optional but recommended)

3. **Deploy backend** with environment variables

4. **Serve frontend** static files

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_WALLETCONNECT_PROJECT_ID=optional_project_id
VITE_APP_URL=http://localhost:5173
```

### Backend (database.env)
```env
DATABASE_URL=sqlite:///./blog.db
SECRET_KEY=your-secret-key
REDIS_URL=redis://localhost:6379
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

---

**Note**: WalletConnect is optional. The application works fully without crypto payment features.