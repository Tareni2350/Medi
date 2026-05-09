
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating an AI-powered medical summary
 * from integrated patient health records. It processes conditions, allergies, medications,
 * abnormal observations, and procedures to provide a concise, doctor-friendly overview.
 *
 * - generateMedicalSummary - A function that handles the AI medical summary generation process.
 * - AIMedicalSummaryInput - The input type for the generateMedicalSummary function.
 * - AIMedicalSummaryOutput - The return type for the generateMedicalSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const AIMedicalSummaryInputSchema = z.object({
  abhaId: z.string().describe('The ABHA ID of the patient.').min(1),
  patientName: z.string().describe('The full name of the patient.').min(1),
  age: z.number().optional().describe('The age of the patient.'),
  gender: z.string().optional().describe('The gender of the patient.'),
  conditions: z.array(z.string()).describe('A list of diagnosed medical conditions.').default([]),
  medications: z.array(z.string()).describe('A list of current medications the patient is taking.').default([]),
  abnormalObservations: z.array(z.string()).describe('A list of abnormal laboratory results or significant observations.').default([]),
  allergies: z.array(z.string()).describe('A list of known allergies and their severity.').default([]),
  procedures: z.array(z.string()).describe('A list of past medical procedures.').default([]),
});
export type AIMedicalSummaryInput = z.infer<typeof AIMedicalSummaryInputSchema>;

const AIMedicalSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, doctor-friendly medical summary of the patient.').min(1),
});
export type AIMedicalSummaryOutput = z.infer<typeof AIMedicalSummaryOutputSchema>;

export async function generateMedicalSummary(input: AIMedicalSummaryInput): Promise<AIMedicalSummaryOutput> {
  return aiMedicalSummaryGeneratorFlow(input);
}

const medicalSummaryPrompt = ai.definePrompt({
  name: 'medicalSummaryPrompt',
  model: googleAI.model('gemini-1.5-flash'),
  input: { schema: AIMedicalSummaryInputSchema },
  output: { schema: AIMedicalSummaryOutputSchema },
  prompt: `You are an AI assistant specialized in generating concise, doctor-friendly medical summaries from patient records.
Your task is to analyze the provided patient data and generate a single, comprehensive summary that highlights key clinical aspects relevant for a doctor to quickly understand the patient's current status and history. Focus on medical conditions, known allergies, current medications, abnormal laboratory results or significant observations, and past medical procedures.

Ensure the summary is brief, accurate, clinically relevant, and easy to read. Do not include any introductory phrases like "Here is a summary" or concluding remarks. The output should ONLY be the summary itself.

--- Patient Information ---
ABHA ID: {{{abhaId}}}
Name: {{{patientName}}}
{{#if age}}Age: {{{age}}}{{/if}}
{{#if gender}}Gender: {{{gender}}}{{/if}}

--- Medical Conditions ---
{{#if conditions.length}}
  {{#each conditions}}- {{{this}}}
  {{/each}}
{{else}}No known conditions.
{{/if}}

--- Medications ---
{{#if medications.length}}
  {{#each medications}}- {{{this}}}
  {{/each}}
{{else}}No active medications.
{{/if}}

--- Abnormal Observations ---
{{#if abnormalObservations.length}}
  {{#each abnormalObservations}}- {{{this}}}
  {{/each}}
{{else}}No abnormal observations.
{{/if}}

--- Allergies ---
{{#if allergies.length}}
  {{#each allergies}}- {{{this}}}
  {{/each}}
{{else}}No known allergies.
{{/if}}

--- Procedures ---
{{#if procedures.length}}
  {{#each procedures}}- {{{this}}}
  {{/each}}
{{else}}No past procedures.
{{/if}}

---
Generate the summary below:`,
});

const aiMedicalSummaryGeneratorFlow = ai.defineFlow(
  {
    name: 'aiMedicalSummaryGeneratorFlow',
    inputSchema: AIMedicalSummaryInputSchema,
    outputSchema: AIMedicalSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await medicalSummaryPrompt(input);
    if (!output) {
      throw new Error('Failed to generate medical summary.');
    }
    return output;
  }
);
