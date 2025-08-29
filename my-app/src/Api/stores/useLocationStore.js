import { create } from "zustand";
import { getCitySuggestions, getGeolocation, getManualLocation, getweather, } from "../utils";

const useLocationStore = create((set, get) => ({
  longitude: null,
  latitude: null,
  city: null,
  state: null,
  isLoadingsuggestion: false,
  country: null,
  weatherData: null,  
  suggestions: [],
  showSuggestions: false,
  isLoading: false,
  setLocation: (longitude, latitude) => set({ longitude, latitude }),

  getGeolocation: () => {
    const { longitude, latitude, isLoading } = get();
    
    
    if ((longitude !== null && latitude !== null) || isLoading) {
      return { longitude, latitude };
    }

    try {
  // ...removed console.log...
      set({ isLoading: true });
      
      getGeolocation().then((data) => {
        set({ 
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city,
          state: data.state,
          country: data.country,
          isLoading: false 
        });
        if(data){
          getweather(data.latitude, data.longitude).then((weatherData) => {
            set({ weather: weatherData });
          });
        }
      }).catch((error) => {
        console.error("Error getting geolocation:", error);
        set({ isLoading: false });
      });
    } catch (error) {
      console.error("Error getting geolocation:", error);
      set({ isLoading: false });
    }
    
    return { longitude, latitude };
  },

  getCitysuggestion: (query) => {
    const { isLoadingsuggestion } = get();
  // ...removed console.log...

    if (isLoadingsuggestion) {
      return;
    }

    try {
      set({ isLoadingsuggestion: true });

      getCitySuggestions(query).then((data) => {
        set({
          suggestions: data,
          showSuggestions: true,
          isLoadingsuggestion: false
        });
      }).catch((error) => {
        console.error("Error getting city suggestions:", error);
        set({ isLoadingsuggestion: false });
      });
    } catch (error) {
      console.error("Error getting city suggestions:", error);
      set({ isLoadingsuggestion: false });
    }
  },

  getmanualLocation: (location) => {
    const { isLoading } = get();

    if (isLoading) {
      return;
    }

    try {
      set({ isLoading: true });

      getManualLocation(location).then((data) => {
  // ...removed console.log...
        getweather(data[0].longitude, data[0].latitude).then((weatherData) => {
        set({ weather: weatherData });
      });
        set({ latitude: data[0].latitude, longitude: data[0].longitude, city: data[0].name, isLoading: false });
      }).catch((error) => {
        console.error("Error getting manual location:", error);
        set({ isLoading: false });
      });
    } catch (error) {
      console.error("Error getting manual location:", error);
      set({ isLoading: false });
    }
  }
}));

export default useLocationStore;
