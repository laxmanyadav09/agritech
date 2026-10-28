# AgriTech — Smart Farming Management System

A MERN-stack starter project designed to help farmers manage farms and crops, review weather information, record soil readings, track pest alerts, and explore agricultural resources.

## Stack
- React + Vite, Bootstrap-ready CSS
- Node.js + Express REST API
- MongoDB + Mongoose (optional until configured)
- JWT/bcrypt dependencies included for extending authentication

## Project structure
- `client/` — React frontend
- `server/` — Express backend

## Run locally on Windows
Install Node.js 18+ first.

### 1. Start the backend
Open PowerShell in the project folder:
```powershell
cd server
Copy-Item .env.example .env
npm install
npm run dev
```
Edit `server/.env` and set a strong `JWT_SECRET`. Set `MONGODB_URI` if you want database persistence. The API health endpoint is `http://localhost:5000/api/health`.

### 2. Start the frontend
Open a second PowerShell window:
```powershell
cd client
Copy-Item .env.example .env
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Environment variables
See `server/.env.example` and `client/.env.example`. Never commit real `.env` files or credentials.

## Current starter features
- Responsive AgriTech dashboard UI
- Crop overview, task list, farm health indicators and sample weather card
- Crop search and add-crop interaction (client-side starter data)
- Express health endpoint and sample API route

Weather and dashboard figures are clearly sample data until connected to live services and a database.

## Deployment
- Frontend: deploy `client` to Vercel; set `VITE_API_URL` to your deployed backend URL plus `/api`.
- Backend: deploy `server` to Render; set `NODE_ENV=production`, `PORT` if required by host, `JWT_SECRET`, `CLIENT_URL`, and `MONGODB_URI` if using MongoDB.
- Database: create a MongoDB Atlas cluster and add its connection string as `MONGODB_URI`.

A deployed URL is not available yet. Deploy and verify the app before submitting a live demo link.
