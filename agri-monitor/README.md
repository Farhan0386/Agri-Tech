# 🌾 Agri-Monitor: Precision Agriculture Dashboard

**Live Deployment:** [https://agri-tech-eight.vercel.app/](https://agri-tech-eight.vercel.app/)

## 📖 Project Overview
Agri-Monitor is a professional-grade Agricultural Decision Support System (DSS). It solves the problem of "invisible" soil health by integrating with the **AgroMonitoring API** to provide real-time satellite-derived data for soil moisture, temperature, and vegetation health.

### 🎯 Problem Definition
Farmers and land managers often lack access to scientific data regarding soil conditions at a granular level. This leads to inefficient water usage and delayed response to crop stress. Agri-Monitor provides a centralized dashboard to manage multiple land plots using digital "Polygons."

## 🛠️ Tech Stack (SOP Mandatory)
- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit (Slices for Farm & Plot data)
- **Routing:** React Router 6
- **API Integration:** Axios (with error handling and interceptors)
- **Styling:** Tailwind CSS (Responsive Design)
- **Visuals:** Recharts (NDVI Trends & Soil Metrics)

## ✨ Advanced Features (Selected 3+)
1. **Satellite Data Visualization:** Dynamic AreaCharts showing historical vegetation indices.
2. **Error Boundary Implementation:** Custom React Error Boundaries to prevent app crashes during API failures.
3. **Performance Optimization:** Component lazy-loading using `React.lazy` and `Suspense`.
4. **Search & Filter:** Real-time filtering of land plots by nickname or ID.

## 🚀 Quick Start & Usage
1. **Clone the Repo:** `git clone https://github.com/farhan0386/agri-tech.git`
2. **Install Dependencies:** `npm install`
3. **Environment Variables:** Create a `.env` file and add:
	`VITE_AGRO_API_KEY=your_api_key_here`
4. **Run App:** `npm run dev`

### 📋 Demo Plot Details
To test the dashboard immediately without creating your own Polygon:
- **Default Polygon ID:** `69ea12dd646c6525ad9fd4ad`
- **Default Name:** Demo Field Alpha

## 📂 Project Structure
- `/src/store`: Redux logic for global state management.
- `/src/api`: Axios service configurations for AgroMonitoring.
- `/src/pages`: Main views (Dashboard, About).
- `/src/components`: Reusable UI elements (Charts, Forms, Cards).

---
*Developed for University Capstone Project - Semester 2*
