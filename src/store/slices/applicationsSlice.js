import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { applicationsApi } from '../../api/services/applicationsApi';

const initialState = {
  applications: [],
  currentApplication: null,
  applicationForm: {
    step: 1,
    totalSteps: 4,
    data: {
      // Personal Info
      fullName: '',
      email: '',
      phone: '',
      alternatePhone: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      currentAddress: '',
      permanentAddress: '',
      // Employment
      employmentType: '',
      companyName: '',
      designation: '',
      monthlyIncome: '',
      workAddress: '',
      employmentDuration: '',
      // Documents
      idProof: null,
      incomeProof: null,
      addressProof: null,
      // Additional
      numberOfOccupants: '1',
      hasPets: false,
      reasonForRenting: '',
      moveInDate: '',
      rentalDuration: '12',
      // Consent
      termsAccepted: false,
      backgroundCheckConsent: false,
    },
    isComplete: false,
  },
  loading: false,
  submitting: false,
  error: null,
};

export const fetchApplications = createAsyncThunk(
  'applications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await applicationsApi.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
    }
  }
);

export const fetchApplicationById = createAsyncThunk(
  'applications/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await applicationsApi.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch application');
    }
  }
);

export const submitApplication = createAsyncThunk(
  'applications/submit',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await applicationsApi.submit(applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit application');
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await applicationsApi.updateStatus(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplicationStep: (state, action) => {
      state.applicationForm.step = action.payload;
    },
    nextStep: (state) => {
      if (state.applicationForm.step < state.applicationForm.totalSteps) {
        state.applicationForm.step += 1;
      }
    },
    prevStep: (state) => {
      if (state.applicationForm.step > 1) {
        state.applicationForm.step -= 1;
      }
    },
    updateFormData: (state, action) => {
      state.applicationForm.data = { ...state.applicationForm.data, ...action.payload };
    },
    resetApplicationForm: (state) => {
      state.applicationForm = initialState.applicationForm;
    },
    clearCurrentApplication: (state) => {
      state.currentApplication = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Mock data for demo
    loadMockApplications: (state, action) => {
      state.applications = action.payload;
    },
    setMockApplication: (state, action) => {
      state.currentApplication = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By ID
      .addCase(fetchApplicationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApplication = action.payload;
      })
      .addCase(fetchApplicationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit
      .addCase(submitApplication.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.submitting = false;
        state.applications.push(action.payload);
        state.applicationForm.isComplete = true;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })
      // Update Status
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const index = state.applications.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
        if (state.currentApplication?.id === action.payload.id) {
          state.currentApplication = action.payload;
        }
      });
  },
});

export const { 
  setApplicationStep, 
  nextStep, 
  prevStep, 
  updateFormData, 
  resetApplicationForm,
  clearCurrentApplication,
  clearError,
  loadMockApplications,
  setMockApplication 
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
