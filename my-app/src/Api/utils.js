import { data } from "autoprefixer";

// get user's current location
export const getGeolocation = () => {
  if (!navigator.geolocation) {
    return Promise.reject(
      new Error("Geolocation is not supported by this browser.")
    );
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Fetch city name using a reverse geocoding API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch city data');
          }
          
          const data = await response.json();
          
          if (data && data.address) {
            const address = data.address;
            resolve({ 
              latitude, 
              longitude,
              city: address.city || address.town || address.village || address.hamlet || null,
              state: address.state || address.province || null,
              country: address.country || null
            });
          } else {
            // If no city found, still return coordinates
            resolve({ latitude, longitude, city: null, state: null, country: null });
          }
        } catch (cityError) {
          console.error('Error getting city name:', cityError);
          // If city lookup fails, still return coordinates
          resolve({ latitude, longitude, city: null, state: null, country: null });
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};


// autofill (city suggestions) feature for search input
export const getCitySuggestions = async (query) => {
  if (!query) return [];
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`);
    if (!res.ok) throw new Error('Failed to fetch city suggestions');
    const data = await res.json();
    // Return array of city suggestion objects
    return data.map(loc => ({
      place_id: loc.place_id,
      display_name: loc.display_name,
      latitude: parseFloat(loc.lat),
      longitude: parseFloat(loc.lon),
      city: (loc.address && (loc.address.city || loc.address.town || loc.address.village || loc.address.hamlet)) || null,
      state: loc.address ? (loc.address.state || loc.address.province || null) : null,
      country: loc.address ? (loc.address.country || null) : null
    }));
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};

// get lat and lon from location name
export const getManualLocation = async (location) => {
  try {
  // ...removed console.log...
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
    if (!res.ok) throw new Error('Failed to fetch weather data');
    const data = await res.json();
  // ...removed console.log...
    return data.results;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getweather = async (latitude, longitude) => {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    if (!res.ok) throw new Error('Failed to fetch weather data');
    const data = await res.json();
  // ...removed console.log...
    return data.current_weather;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Map Open-Meteo weather codes to human-readable conditions
export const getWeatherCondition = (weathercode) => {
  const codeMap = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return codeMap[weathercode] || 'Unknown';
};