export interface Patient {
  abhaId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
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
    abhaId: 'ABHA-1001',
    name: 'Arjun Sharma',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    email: 'arjun.sharma@example.com',
    phone: '+91 98765 43210',
  },
  {
    abhaId: 'ABHA-1002',
    name: 'Priya Patel',
    age: 32,
    gender: 'Female',
    bloodGroup: 'A-',
    email: 'priya.patel@example.com',
    phone: '+91 87654 32109',
  },
  {
    abhaId: 'ABHA-1003',
    name: 'Rajesh Kumar',
    age: 58,
    gender: 'Male',
    bloodGroup: 'B+',
    email: 'rajesh.kumar@example.com',
    phone: '+91 76543 21098',
  },
];

export const conditions_df: Condition[] = [
  { abhaId: 'ABHA-1001', condition: 'Hypertension', date: '2022-05-12' },
  { abhaId: 'ABHA-1001', condition: 'Type 2 Diabetes Mellitus', date: '2023-01-20' },
  { abhaId: 'ABHA-1002', condition: 'Asthma', date: '2021-11-05' },
  { abhaId: 'ABHA-1003', condition: 'Chronic Kidney Disease', date: '2020-03-15' },
];

export const medications_df: Medication[] = [
  { abhaId: 'ABHA-1001', medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
  { abhaId: 'ABHA-1001', medication: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
  { abhaId: 'ABHA-1002', medication: 'Salbutamol Inhaler', dosage: '100mcg', frequency: 'As needed' },
  { abhaId: 'ABHA-1003', medication: 'Furosemide', dosage: '40mg', frequency: 'Once daily' },
];

export const observations_df: Observation[] = [
  { abhaId: 'ABHA-1001', testName: 'Fasting Blood Glucose', value: '145', unit: 'mg/dL', status: 'Abnormal', date: '2024-02-10' },
  { abhaId: 'ABHA-1001', testName: 'Fasting Blood Glucose', value: '138', unit: 'mg/dL', status: 'Abnormal', date: '2023-11-05' },
  { abhaId: 'ABHA-1001', testName: 'Fasting Blood Glucose', value: '152', unit: 'mg/dL', status: 'Abnormal', date: '2023-08-12' },
  { abhaId: 'ABHA-1001', testName: 'HbA1c', value: '7.8', unit: '%', status: 'Abnormal', date: '2024-02-10' },
  { abhaId: 'ABHA-1001', testName: 'HbA1c', value: '7.5', unit: '%', status: 'Abnormal', date: '2023-11-05' },
  { abhaId: 'ABHA-1001', testName: 'Serum Creatinine', value: '1.1', unit: 'mg/dL', status: 'Normal', date: '2024-02-10' },
  { abhaId: 'ABHA-1002', testName: 'Peak Flow Rate', value: '350', unit: 'L/min', status: 'Normal', date: '2024-01-15' },
  { abhaId: 'ABHA-1002', testName: 'Peak Flow Rate', value: '320', unit: 'L/min', status: 'Normal', date: '2023-10-10' },
  { abhaId: 'ABHA-1003', testName: 'eGFR', value: '45', unit: 'mL/min/1.73m²', status: 'Abnormal', date: '2024-03-01' },
  { abhaId: 'ABHA-1003', testName: 'eGFR', value: '48', unit: 'mL/min/1.73m²', status: 'Abnormal', date: '2023-12-15' },
];

export const allergies_df: Allergy[] = [
  { abhaId: 'ABHA-1001', allergy: 'Penicillin', severity: 'Severe' },
  { abhaId: 'ABHA-1001', allergy: 'Peanuts', severity: 'Moderate' },
  { abhaId: 'ABHA-1002', allergy: 'Dust Mites', severity: 'Mild' },
];

export const procedures_df: Procedure[] = [
  { abhaId: 'ABHA-1001', procedure: 'Appendectomy', date: '2015-08-20', outcome: 'Successful' },
  { abhaId: 'ABHA-1003', procedure: 'Arteriovenous Fistula creation', date: '2023-12-10', outcome: 'Healing well' },
];

export const encounters_df: Encounter[] = [
  { abhaId: 'ABHA-1001', date: '2024-02-10', type: 'Clinical Follow-up' },
  { abhaId: 'ABHA-1001', date: '2023-11-05', type: 'Emergency Visit' },
  { abhaId: 'ABHA-1002', date: '2024-01-15', type: 'General Checkup' },
  { abhaId: 'ABHA-1003', date: '2024-03-01', type: 'Specialist Consultation' },
];
