import { Training } from './training';

export interface InformationSheet {
  identity: Identity;
  training: Training;
  sections: Section[];
}

export interface Identity {
  firstname: string;
  lastname: string;
  email: string;
  linkedin: string;
  dateOfBirth: string;
}

export interface Section {
  title: string;
  fields: Field[];
}

export interface Field {
  questionId: number;
  question: string;
  type: string;
  answer: null | string;
}
