export interface Patient {
  abhaId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Condition {
  abhaId: string;
  condition: string;
  date: string;
}

export interface Medication {
  abhaId: string;
  medication: string;
  dosage: string;
  frequency: string;
}

export interface Observation {
  abhaId: string;
  testName: string;
  value: string;
  unit: string;
  status: 'Normal' | 'Abnormal';
  date: string;
}

export interface Allergy {
  abhaId: string;
  allergy: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
}

export interface Procedure {
  abhaId: string;
  procedure: string;
  date: string;
  outcome: string;
}

export interface Encounter {
  abhaId: string;
  date: string;
  type: string;
}

export const patients_df: Patient[] = [
  {
    abhaId: '1234-5678-9012',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://picsum.photos/seed/patient1/200/200',
  },
  {
    abhaId: '9876-5432-1098',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    bloodGroup: 'A-',
    email: 'jane.smith@example.com',
    phone: '+91 87654 32109',
    avatar: 'https://picsum.photos/seed/patient2/200/200',
  },
  {
    abhaId: '1111-2222-3333',
    name: 'Robert Brown',
    age: 58,
    gender: 'Male',
    bloodGroup: 'B+',
    email: 'robert.brown@example.com',
    phone: '+91 76543 21098',
    avatar: 'https://picsum.photos/seed/patient3/200/200',
  },
];

export const conditions_df: Condition[] = [
  { abhaId: '1234-5678-9012', condition: 'Hypertension', date: '2022-05-12' },
  { abhaId: '1234-5678-9012', condition: 'Type 2 Diabetes Mellitus', date: '2023-01-20' },
  { abhaId: '9876-5432-1098', condition: 'Asthma', date: '2021-11-05' },
  { abhaId: '1111-2222-3333', condition: 'Chronic Kidney Disease', date: '2020-03-15' },
];

export const medications_df: Medication[] = [
  { abhaId: '1234-5678-9012', medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
  { abhaId: '1234-5678-9012', medication: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
  { abhaId: '9876-5432-1098', medication: 'Salbutamol Inhaler', dosage: '100mcg', frequency: 'As needed' },
  { abhaId: '1111-2222-3333', medication: 'Furosemide', dosage: '40mg', frequency: 'Once daily' },
];

export const observations_df: Observation[] = [
  { abhaId: '1234-5678-9012', testName: 'Fasting Blood Glucose', value: '145', unit: 'mg/dL', status: 'Abnormal', date: '2024-02-10' },
  { abhaId: '1234-5678-9012', testName: 'Fasting Blood Glucose', value: '138', unit: 'mg/dL', status: 'Abnormal', date: '2023-11-05' },
  { abhaId: '1234-5678-9012', testName: 'Fasting Blood Glucose', value: '152', unit: 'mg/dL', status: 'Abnormal', date: '2023-08-12' },
  { abhaId: '1234-5678-9012', testName: 'HbA1c', value: '7.8', unit: '%', status: 'Abnormal', date: '2024-02-10' },
  { abhaId: '1234-5678-9012', testName: 'HbA1c', value: '7.5', unit: '%', status: 'Abnormal', date: '2023-11-05' },
  { abhaId: '1234-5678-9012', testName: 'Serum Creatinine', value: '1.1', unit: 'mg/dL', status: 'Normal', date: '2024-02-10' },
  { abhaId: '9876-5432-1098', testName: 'Peak Flow Rate', value: '350', unit: 'L/min', status: 'Normal', date: '2024-01-15' },
  { abhaId: '9876-5432-1098', testName: 'Peak Flow Rate', value: '320', unit: 'L/min', status: 'Normal', date: '2023-10-10' },
  { abhaId: '1111-2222-3333', testName: 'eGFR', value: '45', unit: 'mL/min/1.73m²', status: 'Abnormal', date: '2024-03-01' },
  { abhaId: '1111-2222-3333', testName: 'eGFR', value: '48', unit: 'mL/min/1.73m²', status: 'Abnormal', date: '2023-12-15' },
];

export const allergies_df: Allergy[] = [
  { abhaId: '1234-5678-9012', allergy: 'Penicillin', severity: 'Severe' },
  { abhaId: '1234-5678-9012', allergy: 'Peanuts', severity: 'Moderate' },
  { abhaId: '9876-5432-1098', allergy: 'Dust Mites', severity: 'Mild' },
];

export const procedures_df: Procedure[] = [
  { abhaId: '1234-5678-9012', procedure: 'Appendectomy', date: '2015-08-20', outcome: 'Successful' },
  { abhaId: '1111-2222-3333', procedure: 'Arteriovenous Fistula creation', date: '2023-12-10', outcome: 'Healing well' },
];

export const encounters_df: Encounter[] = [
  { abhaId: '1234-5678-9012', date: '2024-02-10', type: 'Outpatient Follow-up' },
  { abhaId: '1234-5678-9012', date: '2023-11-05', type: 'Emergency Visit' },
  { abhaId: '9876-5432-1098', date: '2024-01-15', type: 'General Checkup' },
  { abhaId: '1111-2222-3333', date: '2024-03-01', type: 'Nephrology Consultation' },
];
