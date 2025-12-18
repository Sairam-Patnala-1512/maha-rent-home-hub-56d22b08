import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { propertiesApi } from '../../api/services/propertiesApi';

const initialState = {
  properties: [],
  featuredProperties: [],
  currentProperty: null,
  filters: {
    location: '',
    propertyType: '',
    budget: '',
    bhkType: [],
    eligibility: [],
    amenities: [],
    furnishing: '',
  },
  searchQuery: '',
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  viewMode: 'grid', // 'grid' | 'list'
  loading: false,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await propertiesApi.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch properties');
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await propertiesApi.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch property');
    }
  }
);

export const searchProperties = createAsyncThunk(
  'properties/search',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await propertiesApi.search(searchParams);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
    // Mock data loader for demo
    loadMockProperties: (state, action) => {
      state.properties = action.payload;
      state.pagination.total = action.payload.length;
      state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.limit);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search
      .addCase(searchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setFilters, 
  clearFilters, 
  setSearchQuery, 
  setViewMode, 
  setPage,
  clearCurrentProperty,
  loadMockProperties 
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
