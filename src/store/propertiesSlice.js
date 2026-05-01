import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPropertiesData } from '../api/mockApi';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await fetchPropertiesData(filters);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch properties');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  totalItems: 0,
  page: 1,
  filters: {
    search: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: 'All',
  },
  sortBy: 'latest'
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1; // reset page on filter change
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.totalItems = action.payload.total;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, setSortBy } = propertiesSlice.actions;
export default propertiesSlice.reducer;
