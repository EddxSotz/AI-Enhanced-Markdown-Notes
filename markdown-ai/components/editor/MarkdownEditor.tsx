"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { saveNoteAction } from "@/app/actions/note-actions";

interface EditorProps {
  initialId?: string;
  initialContent?: string;
  initialSummary?: string;
}

export default function MarkdownEditor({ initialId, initialContent = "", initialSummary = "" }: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [summary, setSummary] = useState(initialSummary);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    if (!content.trim()) return;
    
    setIsGenerating(true);
    try {      
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to fetch summary");

      const data = await response.json();      
      
      setSummary(data.summary);

      await saveNoteAction({
        noteId: initialId || null,
        content: content,
        aiSummary: data.summary,
        title: "Untitled Note"
      });

    } catch (error) {
      console.error(error);
      alert("Uh oh! The AI hit a snag. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Action Header */}
      <header className="h-16 border-b flex items-center justify-between px-6 bg-white shrink-0">
        <h1 className="text-xl font-semibold outline-none text-gray-800">Untitled Note</h1>
        <button 
          type="button"
          onClick={handleGenerateSummary}
          disabled={isGenerating || !content.trim()}
          className="bg-purple-100 text-purple-700 px-4 py-2 rounded-md font-medium hover:bg-purple-200 transition disabled:opacity-50"
        >
          {isGenerating ? "✨ Thinking..." : "✨ Magic Summary"}
        </button>
      </header>

      {/* Main Editor Area */}
      <div className="flex flex-col md:flex-row h-full w-full overflow-hidden">
        
        {/* Left Pane: Write */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
          <textarea
            className="flex-1 w-full p-6 resize-none focus:outline-none bg-transparent"
            placeholder="Start typing your markdown here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Right Pane: Preview & Summary */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col bg-white">
          
          {/* AI Summary Panel */}
          {summary && (
            <div className="bg-purple-50 p-4 border-b border-purple-100 shrink-0">
              <h3 className="text-sm font-bold text-purple-800 mb-2 uppercase tracking-wider">AI Summary</h3>
              <div className="text-sm text-purple-900 prose prose-sm max-w-none">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Markdown Preview */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="prose max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}