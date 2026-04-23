import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSoilData } from '../api/agroService';

// Async Thunk to fetch soil data for a specific Polygon ID
export const getSoilInfo = createAsyncThunk(
  'farm/getSoilInfo',
  async (polyId, { rejectWithValue }) => {
    try {
      // SOP [cite: 13]: All API calls flow through the shared Axios service with centralized error handling.
      const data = await fetchSoilData(polyId);
      return { polyId, data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'API Connection Failed');
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
    // SOP [cite: 11, 21]: Redux Toolkit owns the Create state transition.
    addPlot: (state, action) => {
      state.plots.push(action.payload);
    },
    // SOP [cite: 11, 21]: Redux Toolkit owns the Update state transition.
    updatePlotName: (state, action) => {
      const plot = state.plots.find(p => p.id === action.payload.id);
      if (plot) {
        plot.nickname = action.payload.newName;
      }
    },
    // SOP [cite: 11, 21]: Redux Toolkit owns the Delete state transition.
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