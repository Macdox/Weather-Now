# Weather Now

A modern, responsive weather app built with React, Zustand, and Tailwind CSS. Get live weather conditions for your current location or search any city worldwide.

## Features
- 🌍 Get current weather for your location (auto-detects via browser geolocation)
- 🔎 Search for any city with instant suggestions (autofill)
- 📊 See temperature, wind speed, wind direction, and weather condition
- 🕒 Shows the exact timestamp of the weather data
- 📱 Fully responsive and mobile-friendly UI
- ⚡ Powered by [Open-Meteo](https://open-meteo.com/) and [OpenStreetMap](https://www.openstreetmap.org/)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
   Deploy the `dist` folder to your favorite static hosting (Vercel, Netlify, etc).

## Project Structure
- `src/App.jsx` — Main app UI
- `src/componets/CitySearch.jsx` — City search with suggestions
- `src/Api/stores/useLocationStore.js` — Zustand store for state management
- `src/Api/utils.js` — Utility functions for geolocation, weather, and suggestions

## Customization
- Update styles in `tailwind.config.js` or `index.css` as needed
- Add your own branding, favicon, or PWA support for a more polished deployment

## License
MIT

---
Made with ❤️ using Open-Meteo and OpenStreetMap APIs.
