// Form configuration schemas and examples

/**
 * Field Configuration Schema:
 * {
 *   name: string,           // Field name (required)
 *   type: string,           // Field type: text, email, password, number, tel, date, textarea, select, checkbox, radio
 *   label: string,          // Display label
 *   placeholder: string,    // Placeholder text
 *   required: boolean,      // Is field required
 *   disabled: boolean,      // Is field disabled
 *   defaultValue: any,      // Default value
 *   helperText: string,     // Helper text below field
 *   className: string,      // Additional CSS classes
 *   options: Array,         // For select/radio: [{ value, label }]
 *   rows: number,           // For textarea: number of rows
 *   layout: string,         // For radio: 'horizontal' | 'vertical'
 *   validation: {
 *     message: string,      // Required field message
 *     minLength: number,
 *     minLengthMessage: string,
 *     maxLength: number,
 *     maxLengthMessage: string,
 *     min: number,          // For number fields
 *     minMessage: string,
 *     max: number,
 *     maxMessage: string,
 *     pattern: string,      // Regex pattern
 *     patternMessage: string,
 *   },
 *   condition: {            // Conditional visibility
 *     field: string,        // Field to watch
 *     equals: any,          // Show when equals this value
 *     notEquals: any,       // Show when not equals
 *     includes: Array,      // Show when value is in array
 *   }
 * }
 */

// Tenant Personal Info Form Config
export const tenantPersonalInfoFormConfig = {
  title: 'Personal Information',
  description: 'Please provide your personal details',
  layout: 'grid',
  gridCols: 'grid-cols-1 md:grid-cols-2',
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name (as per Aadhaar)',
      placeholder: 'Enter your full name',
      required: true,
      disabled: true, // Auto-filled from eKYC
      helperText: 'Auto-filled from eKYC',
      validation: {
        message: 'Full name is required',
        minLength: 2,
        minLengthMessage: 'Name must be at least 2 characters',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'example@email.com',
      required: true,
      validation: {
        message: 'Please enter a valid email address',
      },
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: '+91 XXXXX XXXXX',
      required: true,
      disabled: true,
      validation: {
        message: 'Phone number is required',
        pattern: '^\\+?[0-9\\s-]{10,}$',
        patternMessage: 'Please enter a valid phone number',
      },
    },
    {
      name: 'alternatePhone',
      type: 'tel',
      label: 'Alternate Phone (Optional)',
      placeholder: '+91 XXXXX XXXXX',
      required: false,
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      label: 'Date of Birth',
      required: true,
      disabled: true,
    },
    {
      name: 'gender',
      type: 'select',
      label: 'Gender',
      placeholder: 'Select gender',
      required: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'maritalStatus',
      type: 'select',
      label: 'Marital Status',
      placeholder: 'Select status',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' },
      ],
    },
    {
      name: 'currentAddress',
      type: 'textarea',
      label: 'Current Address',
      placeholder: 'Enter your current residential address',
      required: true,
      rows: 3,
      className: 'col-span-full',
      validation: {
        message: 'Current address is required',
        minLength: 10,
        minLengthMessage: 'Please enter a complete address',
      },
    },
  ],
};

// Employment Form Config
export const employmentFormConfig = {
  title: 'Employment Details',
  description: 'Share your employment information',
  layout: 'grid',
  gridCols: 'grid-cols-1 md:grid-cols-2',
  fields: [
    {
      name: 'employmentType',
      type: 'radio',
      label: 'Employment Type',
      required: true,
      layout: 'horizontal',
      className: 'col-span-full',
      options: [
        { value: 'salaried', label: 'Salaried' },
        { value: 'self-employed', label: 'Self-Employed' },
        { value: 'student', label: 'Student' },
        { value: 'retired', label: 'Retired' },
      ],
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Company/Business Name',
      placeholder: 'Enter company name',
      required: true,
      condition: {
        field: 'employmentType',
        includes: ['salaried', 'self-employed'],
      },
    },
    {
      name: 'designation',
      type: 'text',
      label: 'Designation',
      placeholder: 'Enter your role',
      required: true,
      condition: {
        field: 'employmentType',
        includes: ['salaried', 'self-employed'],
      },
    },
    {
      name: 'monthlyIncome',
      type: 'number',
      label: 'Monthly Income (₹)',
      placeholder: 'e.g., 50000',
      required: true,
      condition: {
        field: 'employmentType',
        includes: ['salaried', 'self-employed'],
      },
      validation: {
        min: 0,
        minMessage: 'Income cannot be negative',
      },
    },
    {
      name: 'employmentDuration',
      type: 'select',
      label: 'Employment Duration',
      placeholder: 'Select duration',
      required: true,
      condition: {
        field: 'employmentType',
        includes: ['salaried', 'self-employed'],
      },
      options: [
        { value: 'less-than-1', label: 'Less than 1 year' },
        { value: '1-3', label: '1-3 years' },
        { value: '3-5', label: '3-5 years' },
        { value: '5+', label: '5+ years' },
      ],
    },
    {
      name: 'workAddress',
      type: 'textarea',
      label: 'Work Address',
      placeholder: 'Enter your office/business address',
      rows: 2,
      className: 'col-span-full',
      condition: {
        field: 'employmentType',
        includes: ['salaried', 'self-employed'],
      },
    },
  ],
};

// Rental Details Form Config
export const rentalDetailsFormConfig = {
  title: 'Rental Details',
  description: 'Additional information for your application',
  layout: 'grid',
  gridCols: 'grid-cols-1 md:grid-cols-3',
  fields: [
    {
      name: 'numberOfOccupants',
      type: 'select',
      label: 'Number of Occupants',
      required: true,
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5+', label: '5+' },
      ],
    },
    {
      name: 'moveInDate',
      type: 'date',
      label: 'Preferred Move-in Date',
      required: true,
    },
    {
      name: 'rentalDuration',
      type: 'select',
      label: 'Rental Duration (months)',
      required: true,
      options: [
        { value: '6', label: '6 months' },
        { value: '11', label: '11 months' },
        { value: '12', label: '12 months' },
        { value: '24', label: '24 months' },
        { value: '36', label: '36 months' },
      ],
    },
    {
      name: 'hasPets',
      type: 'checkbox',
      label: 'I have pets',
      className: 'col-span-full',
    },
    {
      name: 'reasonForRenting',
      type: 'textarea',
      label: 'Reason for Renting',
      placeholder: 'Briefly describe why you are looking for this rental',
      rows: 3,
      className: 'col-span-full',
    },
  ],
};

// Consent Form Config
export const consentFormConfig = {
  title: 'Terms & Consent',
  description: 'Please review and accept the following',
  fields: [
    {
      name: 'termsAccepted',
      type: 'checkbox',
      label: 'I accept the Terms and Conditions and Privacy Policy',
      required: true,
      validation: {
        message: 'You must accept the terms to proceed',
      },
    },
    {
      name: 'backgroundCheckConsent',
      type: 'checkbox',
      label: 'I consent to background verification as per government guidelines',
      required: true,
      validation: {
        message: 'Background check consent is required',
      },
    },
  ],
};

// Grievance Form Config
export const grievanceFormConfig = {
  title: 'Raise a Grievance',
  description: 'Describe your issue in detail',
  fields: [
    {
      name: 'category',
      type: 'select',
      label: 'Grievance Category',
      placeholder: 'Select a category',
      required: true,
      options: [
        { value: 'maintenance', label: 'Maintenance Issues' },
        { value: 'financial', label: 'Financial Disputes' },
        { value: 'landlord', label: 'Landlord Issues' },
        { value: 'agreement', label: 'Agreement Issues' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Subject',
      placeholder: 'Brief subject of your grievance',
      required: true,
      validation: {
        minLength: 5,
        minLengthMessage: 'Subject must be at least 5 characters',
        maxLength: 100,
        maxLengthMessage: 'Subject cannot exceed 100 characters',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Provide detailed description of your grievance',
      required: true,
      rows: 5,
      validation: {
        minLength: 20,
        minLengthMessage: 'Please provide more details (at least 20 characters)',
        maxLength: 2000,
        maxLengthMessage: 'Description cannot exceed 2000 characters',
      },
    },
    {
      name: 'priority',
      type: 'radio',
      label: 'Priority',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
    },
  ],
};

// Login Form Config
export const loginFormConfig = {
  title: 'Login',
  description: 'Enter your phone number to continue',
  fields: [
    {
      name: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: 'Enter 10-digit mobile number',
      required: true,
      validation: {
        message: 'Phone number is required',
        pattern: '^[0-9]{10}$',
        patternMessage: 'Please enter a valid 10-digit phone number',
      },
    },
  ],
};

// OTP Form Config
export const otpFormConfig = {
  title: 'Verify OTP',
  description: 'Enter the OTP sent to your phone',
  fields: [
    {
      name: 'otp',
      type: 'text',
      label: 'OTP',
      placeholder: 'Enter 6-digit OTP',
      required: true,
      validation: {
        pattern: '^[0-9]{6}$',
        patternMessage: 'Please enter a valid 6-digit OTP',
      },
    },
  ],
};
