"use client"; 

import { useEffect } from "react";

export default function NotesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {    
    console.error("Notes Segment Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4 p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong!</h2>
      <p className="text-gray-600">We encountered an unexpected error while loading your notes.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </div>
  );
}