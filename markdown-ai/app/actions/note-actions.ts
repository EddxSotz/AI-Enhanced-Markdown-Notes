"use server";

import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const NoteSchema = z.object({
  noteId: z.string().nullable(),
  content: z.string(),
  title: z.string().default("Untitled Note"),
  aiSummary: z.string().optional(),
});

export async function saveNoteAction(rawData: z.infer<typeof NoteSchema>) {
  try {    
    const validatedData = NoteSchema.parse(rawData);
    
    await connectDB();

    let savedNote: any;
    
    if (validatedData.noteId) {
      savedNote = await Note.findByIdAndUpdate(
        validatedData.noteId,
        { 
          content: validatedData.content, 
          title: validatedData.title,
          aiSummary: validatedData.aiSummary 
        },
        { new: true }
      );
    } else {
      savedNote = await Note.create(validatedData);
    }

    revalidatePath("/notes");
    return JSON.parse(JSON.stringify(savedNote));
    
  } catch (error) {
    console.error("Failed to save note:", error);
    throw new Error("Failed to save note to database");
  }
}