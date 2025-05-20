import type { FieldValue } from 'firebase-admin/firestore';

export interface Contact {
  id: string;
  email: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  createdAt?: FieldValue;
  updatedAt?: FieldValue;
}

export interface ContactFormData {
  email: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
} 