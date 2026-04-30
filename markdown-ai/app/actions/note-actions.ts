"use server";

import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";

export async function saveNoteAction(noteId: string | null, content: string, title: string = "Untitled Note") {
  try {
    await connectDB();

    let savedNote: any;
    
    if (noteId) {      
      savedNote = await Note.findByIdAndUpdate(
        noteId,
        { content, title },
        { new: true }
      );
    } else {      
      savedNote = await Note.create({ content, title });
    }
    
    revalidatePath("/notes");    
    
    return JSON.parse(JSON.stringify(savedNote));
    
  } catch (error) {
    console.error("Failed to save note:", error);
    throw new Error("Failed to save note to database");
  }
}