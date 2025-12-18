import axiosInstance from '../axiosInstance';

// Mock responses for demo (since no real backend)
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials) => {
    await mockDelay();
    // Mock successful login
    return {
      data: {
        user: {
          id: '1',
          name: credentials.phone === '9876543210' ? 'Rahul Sharma' : 'User',
          email: 'user@example.com',
          phone: credentials.phone,
        },
        role: credentials.role || 'tenant',
        token: 'mock-jwt-token',
      },
    };
  },

  register: async (userData) => {
    await mockDelay();
    return {
      data: {
        user: {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        },
        role: userData.role,
        token: 'mock-jwt-token',
      },
    };
  },

  sendOtp: async (phone) => {
    await mockDelay();
    return {
      data: {
        success: true,
        message: 'OTP sent successfully',
        otp: '123456', // Mock OTP for demo
      },
    };
  },

  verifyOtp: async (phone, otp) => {
    await mockDelay();
    if (otp === '123456') {
      return {
        data: {
          success: true,
          user: {
            id: '1',
            phone,
            verified: true,
          },
        },
      };
    }
    throw { response: { data: { message: 'Invalid OTP' } } };
  },

  getProfile: async () => {
    await mockDelay();
    return {
      data: {
        id: '1',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 98765 43210',
        verificationStatus: {
          ekyc: 'verified',
          digilocker: 'verified',
          policeVerification: 'pending',
          profileCompletion: 85,
        },
      },
    };
  },

  updateProfile: async (profileData) => {
    await mockDelay();
    return {
      data: {
        ...profileData,
        updated: true,
      },
    };
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    return { data: { success: true } };
  },
};
