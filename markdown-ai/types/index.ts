// types/index.ts

export interface Note {
  _id?: string; 
  title: string;
  content: string;      
  aiSummary?: string;   
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}