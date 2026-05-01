# SkyPulse - Advanced Weather Dashboard

SkyPulse is a Capstone Project focusing on Environment & Sustainability. It delivers a rich, production-ready weather dashboard inspired by the classic Samsung Galaxy Weather UI.

## Features
- **Samsung One UI Aesthetic**: Glassmorphism (`backdrop-blur-xl`), smooth semi-transparent backgrounds, and beautiful typography.
- **Dynamic Hourly Forecast**: Integrated with Recharts to display a smooth temperature line chart over the next several hours.
- **Rain Probability & Comparisons**: Specialized data cards mimicking the reference UI.
- **Zero-G Mode (Anti-Gravity)**: Utilizing `matter.js`, toggle the physics engine to watch UI elements detach and float around the screen, reacting to mouse interactions.
- **Debounced Search**: A seamless city search with a custom 500ms debounce hook.
- **Auto-Refresh**: Custom `useAutoRefresh` hook keeps weather data up-to-date every 10 minutes.
- **Performance**: Built with Vite, React Lazy, and standard memoization techniques. State is handled professionally with Redux Toolkit.

## Tech Stack
- React (Vite)
- Tailwind CSS (v4)
- Redux Toolkit
- React Router
- Axios (OpenWeather API)
- Recharts (Data Visualization)
- Matter.js (Physics Engine)

## Getting Started
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Toggle Zero-G Mode using the floating droplets icon in the top right.
