"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor({ initialContent = "" }: { initialContent?: string }) {
  const [content, setContent] = useState(initialContent);

  return (
    <div className="flex flex-col md:flex-row h-full w-full border-t">
      
      {/* Left Pane */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-200">
        <textarea
          className="w-full h-full p-6 resize-none focus:outline-none bg-transparent"
          placeholder="Start typing your markdown here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Right Pane: Preview */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 overflow-y-auto bg-white">
        <div className="prose max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

    </div>
  );
}