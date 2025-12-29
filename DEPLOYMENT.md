# 🚀 Railway Deployment Guide

## Step-by-Step Railway Deployment Instructions

### 📋 Prerequisites
- ✅ Code pushed to GitHub: https://github.com/Suryareddy180/taskmanagementapp.git
- ✅ Railway account (sign up at https://railway.app)
- ✅ PostgreSQL database already running on Railway

---

## 🎯 Backend Deployment (Django)

### Step 1: Create New Railway Project

1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose **`Suryareddy180/taskmanagementapp`**

### Step 2: Configure Build Settings

Railway should auto-detect the Django app. If not, configure:

- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: (Leave empty, Procfile handles it)

### Step 3: Set Environment Variables

In Railway dashboard, go to **Variables** tab and add:

```env
DATABASE_URL
# This should already be set automatically if you connected Railway PostgreSQL
# Format: postgresql://postgres:password@host:port/railway

SECRET_KEY
# Generate a secure key:
# In Python: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

DEBUG
# Set to: False

ALLOWED_HOSTS
# Set to: .railway.app,.up.railway.app

CORS_ALLOWED_ORIGINS
# Set to your frontend URL (e.g., https://your-frontend.vercel.app)
# Or leave empty to allow all during testing
```

### Step 4: Deploy

1. Railway will automatically build and deploy
2. Watch the deployment logs
3. The Procfile will automatically:
   - Run database migrations
   - Start Gunicorn server

### Step 5: Get Your Backend URL

- Railway will provide a URL like: `https://taskmanager-production.up.railway.app`
- Your API will be at: `https://taskmanager-production.up.railway.app/api/`

### Step 6: Test the API

```bash
# Health check
curl https://your-backend-url.railway.app/health/

# List tasks
curl https://your-backend-url.railway.app/api/tasks/

# Create a test task
curl -X POST https://your-backend-url.railway.app/api/tasks/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Production Test",
    "description": "Testing Railway deployment",
    "priority": "high",
    "category": "Testing",
    "dueDate": "2025-12-31",
    "completed": false
  }'
```

---

## 🌐 Frontend Deployment

### Option A: Vercel (Recommended)

1. **Install Vercel CLI** (if not already):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd task-management-app
   vercel
   ```

4. **Set Environment Variable**:
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app/api`

5. **Redeploy**:
   ```bash
   vercel --prod
   ```

### Option B: Railway

1. Create another Railway project from the same GitHub repo
2. Configure:
   - **Root Directory**: `.` (project root)
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`

3. Set Environment Variable:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   ```

4. Deploy automatically

---

## 🔍 Verification Checklist

After deployment, verify:

- [ ] Backend health endpoint responds: `/health/`
- [ ] API endpoints accessible: `/api/tasks/`
- [ ] Frontend loads successfully
- [ ] Can create new tasks from UI
- [ ] Tasks persist after page refresh
- [ ] Can edit existing tasks
- [ ] Can delete tasks
- [ ] Can toggle task completion
- [ ] Search and filters work correctly
- [ ] No CORS errors in browser console

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Railway logs for errors
- Verify all environment variables are set
- Ensure DATABASE_URL is correct

**"No such table: tasks_task"**
- Migrations didn't run
- Check Procfile is in `backend/` directory
- Manually run: `python manage.py migrate` in Railway console

**CORS Errors**
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Or set `CORS_ALLOW_ALL_ORIGINS=True` temporarily

### Frontend Issues

**"Failed to fetch"**
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify it ends with `/api` (no trailing slash)
- Ensure backend is actually running

**Environment Variable Not Working**
- Vercel/Railway may need a redeploy after adding env vars
- Check the variable name is exact: `NEXT_PUBLIC_API_URL`

---

## 📊 Railway Dashboard Tips

### Viewing Logs
- Go to your project → **Deployments** → Click on active deployment
- Live logs show all Django output

### Database Access
- Go to PostgreSQL service → **Data** tab
- Can browse tables and run SQL queries

### Metrics
- **Metrics** tab shows CPU, memory, network usage
- Useful for monitoring performance

---

## 🔒 Security Best Practices

### Before Going to Production:

1. **Set DEBUG=False** in environment variables
2. **Use strong SECRET_KEY** (never commit to Git)
3. **Lock down CORS**:
   ```env
   CORS_ALLOWED_ORIGINS=https://your-actual-frontend.com
   ```
4. **Add custom domain** in Railway for professional URL
5. **Enable HTTPS only**:
   ```python
   SECURE_SSL_REDIRECT = True
   SESSION_COOKIE_SECURE = True
   CSRF_COOKIE_SECURE = True
   ```

---

## 💰 Railway Pricing Notes

- **Hobby Plan**: $5/month per service
- **PostgreSQL**: Included in project
- **Automatic SSL**: Free
- **Custom domains**: Free

**Cost for this project**: ~$5/month (one backend service)

---

## 🎉 Success!

Once deployed:
- ✅ Your Django backend is live on Railway
- ✅ PostgreSQL database is connected
- ✅ Frontend is deployed (Vercel/Railway)
- ✅ Automatic deployments on git push
- ✅ HTTPS enabled automatically
- ✅ Professional, production-ready app

**Your deployed app URLs:**
- Backend API: `https://[project-name].railway.app/api/`
- Frontend: `https://[project-name].vercel.app/` or Railway URL

---

## 📞 Support

If you encounter issues:
1. Check Railway logs first
2. Review environment variables
3. Verify database connection
4. Check GitHub repository has all files

**Railway Community**: https://discord.gg/railway
**Documentation**: https://docs.railway.app

---

**Happy Deploying! 🚀**
