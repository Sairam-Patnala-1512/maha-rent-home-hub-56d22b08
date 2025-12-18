import axiosInstance from '../axiosInstance';

const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const mockApplications = [
  {
    id: 'APP001',
    property: {
      id: '1',
      title: '2 BHK in Andheri West',
      address: 'Andheri West, Mumbai',
      rent: 25000,
    },
    landlord: 'Mr. Patel',
    status: 'in-review',
    appliedDate: '2024-12-10',
    timeline: [
      { step: 'Application Submitted', status: 'completed', date: '2024-12-10' },
      { step: 'Document Verification', status: 'completed', date: '2024-12-11' },
      { step: 'Landlord Review', status: 'in-progress', date: '2024-12-12' },
      { step: 'Agreement Generation', status: 'pending', date: null },
      { step: 'Digital Signing', status: 'pending', date: null },
    ],
  },
  {
    id: 'APP002',
    property: {
      id: '2',
      title: '1 BHK in Bandra East',
      address: 'Bandra East, Mumbai',
      rent: 18000,
    },
    landlord: 'Mrs. Desai',
    status: 'approved',
    appliedDate: '2024-12-05',
    timeline: [
      { step: 'Application Submitted', status: 'completed', date: '2024-12-05' },
      { step: 'Document Verification', status: 'completed', date: '2024-12-06' },
      { step: 'Landlord Review', status: 'completed', date: '2024-12-07' },
      { step: 'Agreement Generation', status: 'completed', date: '2024-12-08' },
      { step: 'Digital Signing', status: 'completed', date: '2024-12-09' },
    ],
  },
];

export const applicationsApi = {
  getAll: async () => {
    await mockDelay();
    return { data: mockApplications };
  },

  getById: async (id) => {
    await mockDelay();
    const application = mockApplications.find(a => a.id === id);
    if (!application) {
      throw { response: { data: { message: 'Application not found' } } };
    }
    return { data: application };
  },

  submit: async (applicationData) => {
    await mockDelay(1000);
    return {
      data: {
        id: `APP${Date.now()}`,
        ...applicationData,
        status: 'submitted',
        appliedDate: new Date().toISOString().split('T')[0],
        timeline: [
          { step: 'Application Submitted', status: 'completed', date: new Date().toISOString().split('T')[0] },
          { step: 'Document Verification', status: 'pending', date: null },
          { step: 'Landlord Review', status: 'pending', date: null },
          { step: 'Agreement Generation', status: 'pending', date: null },
          { step: 'Digital Signing', status: 'pending', date: null },
        ],
      },
    };
  },

  updateStatus: async (id, status) => {
    await mockDelay();
    const application = mockApplications.find(a => a.id === id);
    if (!application) {
      throw { response: { data: { message: 'Application not found' } } };
    }
    return {
      data: {
        ...application,
        status,
      },
    };
  },

  withdraw: async (id) => {
    await mockDelay();
    return { data: { success: true, id } };
  },

  // Landlord methods
  approve: async (id) => {
    await mockDelay();
    return {
      data: {
        id,
        status: 'approved',
        approvedAt: new Date().toISOString(),
      },
    };
  },

  reject: async (id, reason) => {
    await mockDelay();
    return {
      data: {
        id,
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        rejectionReason: reason,
      },
    };
  },
};
