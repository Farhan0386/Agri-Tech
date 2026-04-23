import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to fetch soil data for a specific Polygon ID
export const getSoilInfo = createAsyncThunk(
  'farm/getSoilInfo',
  async (polyId, { rejectWithValue }) => {
    try {
      const API_KEY = import.meta.env.VITE_AGRO_API_KEY;
      const response = await axios.get(`https://api.agromonitoring.com/agro/1.0/soil`, {
        params: { polyid: polyId, appid: API_KEY }
      });
      // We return both the ID and the data so we know which plot to update
      return { polyId, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "API Connection Failed");
    }
  }
);

const farmSlice = createSlice({
  name: 'farm',
  initialState: {
    plots: [], // Array to store multiple farm plots 
    loading: false,
    error: null,
  },
  reducers: {
    // CRUD: Create - Adds a new land plot 
    addPlot: (state, action) => {
      state.plots.push(action.payload);
    },
    // CRUD: Update - Renames a plot nickname [cite: 20, 29]
    updatePlotName: (state, action) => {
      const plot = state.plots.find(p => p.id === action.payload.id);
      if (plot) {
        plot.nickname = action.payload.newName;
      }
    },
    // CRUD: Delete - Removes a plot 
    deletePlot: (state, action) => {
      state.plots = state.plots.filter(p => p.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSoilInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSoilInfo.fulfilled, (state, action) => {
        state.loading = false;
        // Find the specific plot by its polyId and attach the new satellite data
        const index = state.plots.findIndex(p => p.polyId === action.payload.polyId);
        if (index !== -1) {
          state.plots[index].soilData = action.payload.data;
        }
      })
      .addCase(getSoilInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addPlot, updatePlotName, deletePlot } = farmSlice.actions;
export default farmSlice.reducer;