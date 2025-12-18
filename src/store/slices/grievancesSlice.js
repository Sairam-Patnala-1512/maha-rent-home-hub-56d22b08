import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { grievancesApi } from '../../api/services/grievancesApi';

const initialState = {
  grievances: [],
  currentGrievance: null,
  chatMessages: [],
  loading: false,
  submitting: false,
  error: null,
};

export const fetchGrievances = createAsyncThunk(
  'grievances/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await grievancesApi.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch grievances');
    }
  }
);

export const fetchGrievanceById = createAsyncThunk(
  'grievances/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await grievancesApi.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch grievance');
    }
  }
);

export const submitGrievance = createAsyncThunk(
  'grievances/submit',
  async (grievanceData, { rejectWithValue }) => {
    try {
      const response = await grievancesApi.submit(grievanceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit grievance');
    }
  }
);

const grievancesSlice = createSlice({
  name: 'grievances',
  initialState,
  reducers: {
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    clearChat: (state) => {
      state.chatMessages = [];
    },
    clearCurrentGrievance: (state) => {
      state.currentGrievance = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Mock data for demo
    loadMockGrievances: (state, action) => {
      state.grievances = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchGrievances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrievances.fulfilled, (state, action) => {
        state.loading = false;
        state.grievances = action.payload;
      })
      .addCase(fetchGrievances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchGrievanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrievanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGrievance = action.payload;
      })
      .addCase(fetchGrievanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit
      .addCase(submitGrievance.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitGrievance.fulfilled, (state, action) => {
        state.submitting = false;
        state.grievances.push(action.payload);
      })
      .addCase(submitGrievance.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { 
  addChatMessage, 
  clearChat, 
  clearCurrentGrievance, 
  clearError,
  loadMockGrievances 
} = grievancesSlice.actions;

export default grievancesSlice.reducer;
