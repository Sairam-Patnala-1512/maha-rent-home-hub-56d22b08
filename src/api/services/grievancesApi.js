import axiosInstance from '../axiosInstance';

const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const mockGrievances = [
  {
    id: 'GRV001',
    subject: 'Maintenance Issue',
    category: 'maintenance',
    description: 'Water leakage in bathroom not being addressed by landlord.',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-12-10',
    updates: [
      { date: '2024-12-10', message: 'Grievance registered', by: 'System' },
      { date: '2024-12-11', message: 'Assigned to resolution team', by: 'Admin' },
      { date: '2024-12-12', message: 'Contacted landlord for resolution', by: 'Support' },
    ],
  },
  {
    id: 'GRV002',
    subject: 'Security Deposit Refund',
    category: 'financial',
    description: 'Landlord not returning security deposit after vacating.',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-12-01',
    resolvedAt: '2024-12-08',
    updates: [
      { date: '2024-12-01', message: 'Grievance registered', by: 'System' },
      { date: '2024-12-03', message: 'Under investigation', by: 'Admin' },
      { date: '2024-12-08', message: 'Resolved - Deposit refunded', by: 'Admin' },
    ],
  },
];

export const grievancesApi = {
  getAll: async () => {
    await mockDelay();
    return { data: mockGrievances };
  },

  getById: async (id) => {
    await mockDelay();
    const grievance = mockGrievances.find(g => g.id === id);
    if (!grievance) {
      throw { response: { data: { message: 'Grievance not found' } } };
    }
    return { data: grievance };
  },

  submit: async (grievanceData) => {
    await mockDelay(1000);
    return {
      data: {
        id: `GRV${Date.now()}`,
        ...grievanceData,
        status: 'submitted',
        createdAt: new Date().toISOString().split('T')[0],
        updates: [
          { date: new Date().toISOString().split('T')[0], message: 'Grievance registered', by: 'System' },
        ],
      },
    };
  },

  addComment: async (id, comment) => {
    await mockDelay();
    return {
      data: {
        id,
        comment: {
          message: comment,
          date: new Date().toISOString(),
          by: 'User',
        },
      },
    };
  },

  getCategories: async () => {
    await mockDelay(200);
    return {
      data: [
        { id: 'maintenance', label: 'Maintenance Issues' },
        { id: 'financial', label: 'Financial Disputes' },
        { id: 'landlord', label: 'Landlord Issues' },
        { id: 'agreement', label: 'Agreement Issues' },
        { id: 'other', label: 'Other' },
      ],
    };
  },
};
