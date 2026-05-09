
'use server';
/**
 * @fileOverview This file defines a Genkit flow for an AI Clinical Assistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ClinicalAssistantInputSchema = z.object({
  query: z.string().describe('The doctor\'s question about the patient.'),
  patientRecord: z.any().describe('The full integrated patient record data.'),
});

const ClinicalAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s response to the doctor\'s query.'),
});

export async function askClinicalAssistant(input: z.infer<typeof ClinicalAssistantInputSchema>): Promise<{ answer: string }> {
  try {
    return await clinicalAssistantFlow(input);
  } catch (error: any) {
    console.error('Clinical Assistant flow failed:', error);
    throw new Error(error.message || 'Assistant failed to process query');
  }
}

const clinicalAssistantFlow = ai.defineFlow(
  {
    name: 'clinicalAssistantFlow',
    inputSchema: ClinicalAssistantInputSchema,
    outputSchema: ClinicalAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are a clinical assistant for a hospital. You have access to a patient's integrated medical record.
Answer the following query from a doctor based strictly on the provided patient data.
Be concise, accurate, and use clinical terminology.

--- Patient Data ---
${JSON.stringify(input.patientRecord, null, 2)}

--- Query ---
${input.query}`,
    });

    return { answer: output?.text || "I'm sorry, I couldn't find an answer to that in the patient's record." };
  }
);
