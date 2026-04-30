import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  aiSummary?: string;
}

const NoteSchema = new Schema(
  {
    title: { type: String, required: true, default: "Untitled Note" },
    content: { type: String, default: "" },
    aiSummary: { type: String },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);