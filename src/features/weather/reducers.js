import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: 0,
  status: [null, null, null],
  firstCountry: {
    currentWeather: null,
    currentTemperature: null,
    historicalWeather: null,
    historicalTemperature: null,
    aqi: null,
  },
  secondCountry: {
    currentWeather: null,
    currentTemperature: null,
    historicalWeather: null,
    historicalTemperature: null,
    aqi: null,
  },
};

const apiKey = process.env.REACT_APP_API_KEY;
// TODO::
// Separate the Geocoding API to a new createAsyncThunk function for better performance
// Blockage: All other 3 apis require lat and long as input, other 3 apis will stuck at
//  loading state even running Geocoding API first got the result, probably because they
//  are running at the same time

export const fetchCurrentWeatherData = createAsyncThunk(
  "currentWeather",
  async (arg, thunkAPI) => {
    try {
      // Geocoding API to get lat and long of both country
      const firstGeo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${arg.firstCountry}&limit=1&appid=${apiKey}`
      );
      const [firstLat, firstLong] = [
        firstGeo.data[0].lat,
        firstGeo.data[0].lon,
      ];

      const secondGeo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${arg.secondCountry}&limit=1&appid=${apiKey}`
      );
      const [secondLat, secondLong] = [
        secondGeo.data[0].lat,
        secondGeo.data[0].lon,
      ];
      const firstData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${firstLat}&lon=${firstLong}&appid=${apiKey}&units=metric`
      );
      const secondData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${secondLat}&lon=${secondLong}&appid=${apiKey}&units=metric`
      );
      const data = { firstData: firstData, secondData: secondData };
      return data;
    } catch {
      return console.error();
    }
  }
);

// Second API for fetching Historical weather record
export const fetchPastWeatherData = createAsyncThunk(
  "forecast",
  async (arg, thunkAPI) => {
    try {
      // Geocoding API to get lat and long of both country
      const firstGeo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${arg.firstCountry}&limit=1&appid=${apiKey}`
      );
      const [firstLat, firstLong] = [
        firstGeo.data[0].lat,
        firstGeo.data[0].lon,
      ];
      const secondGeo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${arg.secondCountry}&limit=1&appid=${apiKey}`
      );
      const [secondLat, secondLong] = [
        secondGeo.data[0].lat,
        secondGeo.data[0].lon,
      ];

      // Fetch historial weather record of the past hour
      const firstData = await axios.get(
        `https://history.openweathermap.org/data/2.5/history/city?lat=${firstLat}&lon=${firstLong}&appid=${apiKey}`
      );
      const secondData = await axios.get(
        `https://history.openweathermap.org/data/2.5/history/city?lat=${secondLat}&lon=${secondLong}&appid=${apiKey}`
      );

      const data = { firstData: firstData.data, secondData: secondData.data };
      return data;
    } catch {
      return console.error();
    }
  }
);

// Third API for fetching air pollution data
export const fetchAirPollutionData = createAsyncThunk(
  "pollution",
  async (arg, thunkAPI) => {
    try {
      // Geocoding API to get lat and long of both country
      const firstGeo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${arg.firstCountry}&limit=1&appid=${apiKey}`
      );
      const [firstLat, firstLong] = [
        firstGeo.data[0].lat,
        firstGeo.data[0].lon,
      ];
      const secondGeo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${arg.secondCountry}&limit=1&appid=${apiKey}`
      );
      const [secondLat, secondLong] = [
        secondGeo.data[0].lat,
        secondGeo.data[0].lon,
      ];

      // Fetch historial weather record of the past hour
      const firstData = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${firstLat}&lon=${firstLong}&appid=${apiKey}`
      );
      const secondData = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${secondLat}&lon=${secondLong}&appid=${apiKey}`
      );

      const data = { firstData: firstData.data, secondData: secondData.data };
      return data;
    } catch {
      return console.error();
    }
  }
);

export const productsSlice = createSlice({
  name: "weather",
  initialState: initialState,

  extraReducers: {
    // Status for Current Weather API
    [fetchCurrentWeatherData.pending]: (state, action) => {
      state.status[0] = "loading";
    },
    [fetchCurrentWeatherData.fulfilled]: (state, action) => {
      state.status[0] = "success";
      console.log("PAY", action.payload);
      state.firstCountry.currentWeather =
        action.payload.firstData.data.weather[0].main;
      state.firstCountry.currentTemperature =
        action.payload.firstData.data.main.temp;
      state.secondCountry.currentWeather =
        action.payload.secondData.data.weather[0].main;
      state.secondCountry.currentTemperature =
        action.payload.secondData.data.main.temp;
    },
    [fetchCurrentWeatherData.rejected]: (state, action) => {
      state.status[0] = "failed";
    },

    // Status for Forecast Weather API
    [fetchPastWeatherData.pending]: (state, action) => {
      state.status[1] = "loading";
    },
    [fetchPastWeatherData.fulfilled]: (state, action) => {
      state.status[1] = "success";
      state.firstCountry.historicalWeather =
        action.payload.firstData.weather[0].main;
      state.firstCountry.historicalTemperature =
        action.payload.firstData.main.temp;
      state.secondCountry.historicalWeather =
        action.payload.secondData.weather[0].main;
      state.secondCountry.historicalTemperature =
        action.payload.secondData.main.temp;
    },
    [fetchPastWeatherData.rejected]: (state, action) => {
      state.status[1] = "failed";
    },

    // Status for Air Pollution API
    [fetchAirPollutionData.pending]: (state, action) => {
      state.status[2] = "loading";
    },
    [fetchAirPollutionData.fulfilled]: (state, action) => {
      state.status[2] = "success";
      state.firstCountry.aqi = action.payload.firstData.list[0].main.aqi;
      state.secondCountry.aqi = action.payload.secondData.list[0].main.aqi;
    },
    [fetchAirPollutionData.rejected]: (state, action) => {
      state.status[2] = "failed";
    },
  },
});

export default productsSlice.reducer;
