# Deployment Guide - KisanMitra AI

Production-ready hosting guidelines for frontend and backend deployment.

---

## 1. Cloud Frontend Deployment (Vercel)

The React single-page frontend is build-optimized for deployment on **Vercel** or **Netlify**.

### Deploying using Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Initialize deploy:
   ```bash
   vercel
   ```
4. Set build configurations:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

---

## 2. Cloud Backend Deployment (Docker & FastAPI)

We recommend using Docker to deploy the Python backend to environments like **Railway**, **Render**, or **AWS ECS**.

### Dockerfile (Place in `/backend`)
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Deploying to Render
1. Create a **Web Service** on Render.
2. Connect your GitHub repository.
3. Select **Docker** as the runtime.
4. Render will build the Docker container and expose port `8000`.

---

## 3. Environment Variables

Create files `.env` inside their respective directories:

### Frontend (.env)
```env
VITE_API_URL=https://kisanmitra-api.yourdomain.com
```

### Backend (.env)
```env
GEMINI_API_KEY=your_gemini_key_here
LOCATION_API_KEY=your_weather_map_key
JWT_SECRET=your_auth_secret_token
```
