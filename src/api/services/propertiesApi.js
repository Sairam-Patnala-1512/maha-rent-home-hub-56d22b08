import axiosInstance from '../axiosInstance';

const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock properties data
const mockProperties = [
  {
    id: '1',
    title: 'Spacious 2 BHK with Balcony',
    address: 'Near Western Express Highway',
    locality: 'Andheri West',
    rent: 25000,
    deposit: 75000,
    bedrooms: 2,
    bathrooms: 2,
    area: 850,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    propertyType: 'Apartment',
    eligibility: ['EWS', 'General'],
    amenities: ['Parking', 'Lift', 'Power Backup'],
    furnishing: 'Semi-Furnished',
    available: true,
  },
  {
    id: '2',
    title: 'Modern 1 BHK Studio',
    address: 'Linking Road',
    locality: 'Bandra West',
    rent: 35000,
    deposit: 100000,
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    propertyType: 'Studio',
    eligibility: ['Student', 'General'],
    amenities: ['Gym', 'Security'],
    furnishing: 'Furnished',
    available: true,
  },
  {
    id: '3',
    title: 'Family 3 BHK Flat',
    address: 'Hiranandani Gardens',
    locality: 'Powai',
    rent: 55000,
    deposit: 150000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    propertyType: 'Apartment',
    eligibility: ['General'],
    amenities: ['Swimming Pool', 'Clubhouse', 'Parking'],
    furnishing: 'Semi-Furnished',
    available: true,
  },
  {
    id: '4',
    title: 'Budget 1 RK Near Station',
    address: 'Near Thane Station',
    locality: 'Thane West',
    rent: 8000,
    deposit: 24000,
    bedrooms: 1,
    bathrooms: 1,
    area: 300,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    propertyType: 'Room',
    eligibility: ['EWS', 'Migrant'],
    amenities: ['Security'],
    furnishing: 'Unfurnished',
    available: true,
  },
  {
    id: '5',
    title: 'Cozy 2 BHK with Parking',
    address: 'FC Road Area',
    locality: 'Pune',
    rent: 18000,
    deposit: 54000,
    bedrooms: 2,
    bathrooms: 1,
    area: 750,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    propertyType: 'Apartment',
    eligibility: ['Student', 'General'],
    amenities: ['Parking', 'Power Backup'],
    furnishing: 'Semi-Furnished',
    available: true,
  },
  {
    id: '6',
    title: 'Premium 2 BHK Sea View',
    address: 'Carter Road',
    locality: 'Bandra West',
    rent: 75000,
    deposit: 225000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    propertyType: 'Apartment',
    eligibility: ['General'],
    amenities: ['Sea View', 'Gym', 'Swimming Pool', 'Parking'],
    furnishing: 'Furnished',
    available: true,
  },
];

export const propertiesApi = {
  getAll: async (params = {}) => {
    await mockDelay();
    const { page = 1, limit = 12, ...filters } = params;
    
    let filtered = [...mockProperties];
    
    // Apply filters
    if (filters.locality) {
      filtered = filtered.filter(p => 
        p.locality.toLowerCase().includes(filters.locality.toLowerCase())
      );
    }
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    }
    if (filters.eligibility?.length) {
      filtered = filtered.filter(p => 
        p.eligibility.some(e => filters.eligibility.includes(e))
      );
    }
    
    return {
      data: {
        properties: filtered,
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
        },
      },
    };
  },

  getById: async (id) => {
    await mockDelay();
    const property = mockProperties.find(p => p.id === id);
    if (!property) {
      throw { response: { data: { message: 'Property not found' } } };
    }
    return {
      data: {
        ...property,
        landlord: {
          name: 'Mr. Patel',
          phone: '+91 98765 XXXXX',
          verified: true,
        },
        description: 'A well-maintained property in a prime location with all modern amenities. Close to public transport and shopping areas.',
        floorPlan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
        gallery: [
          property.imageUrl,
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        ],
      },
    };
  },

  search: async (searchParams) => {
    await mockDelay();
    const { query, ...filters } = searchParams;
    
    let results = [...mockProperties];
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.locality.toLowerCase().includes(lowerQuery) ||
        p.address.toLowerCase().includes(lowerQuery)
      );
    }
    
    return {
      data: {
        properties: results,
        pagination: {
          page: 1,
          limit: 12,
          total: results.length,
          totalPages: Math.ceil(results.length / 12),
        },
      },
    };
  },

  // Landlord methods
  create: async (propertyData) => {
    await mockDelay();
    return {
      data: {
        id: Date.now().toString(),
        ...propertyData,
        status: 'under-review',
        createdAt: new Date().toISOString(),
      },
    };
  },

  update: async (id, propertyData) => {
    await mockDelay();
    return {
      data: {
        id,
        ...propertyData,
        updatedAt: new Date().toISOString(),
      },
    };
  },

  delete: async (id) => {
    await mockDelay();
    return { data: { success: true } };
  },
};
