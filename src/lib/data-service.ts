import {
  patients_df,
  conditions_df,
  medications_df,
  observations_df,
  allergies_df,
  procedures_df,
  encounters_df,
  type Patient,
  type Condition,
  type Medication,
  type Observation,
  type Allergy,
  type Procedure,
  type Encounter
} from './mock-data';

export interface IntegratedReport {
  patient: Patient;
  conditions: Condition[];
  medications: Medication[];
  observations: Observation[];
  allergies: Allergy[];
  procedures: Procedure[];
  encounters: Encounter[];
}

export async function getIntegratedPatientData(abhaId: string): Promise<IntegratedReport | null> {
  const patient = patients_df.find(p => p.abhaId === abhaId);
  if (!patient) return null;

  const conditions = conditions_df.filter(c => c.abhaId === abhaId);
  const medications = medications_df.filter(m => m.abhaId === abhaId);
  const observations = observations_df.filter(o => o.abhaId === abhaId);
  const allergies = allergies_df.filter(a => a.abhaId === abhaId);
  const procedures = procedures_df.filter(p => p.abhaId === abhaId);
  const encounters = encounters_df.filter(e => e.abhaId === abhaId);

  return {
    patient,
    conditions,
    medications,
    observations,
    allergies,
    procedures,
    encounters
  };
}

export function getAllAbhaIds(): string[] {
  return patients_df.map(p => p.abhaId);
}
