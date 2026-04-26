import MarkdownEditor from "@/components/editor/MarkdownEditor";

export default function NotePage() {
  return (
    <div className="flex-1 w-full h-full flex flex-col">
      {/* Top bar */}
      <header className="h-16 border-b flex items-center justify-between px-6 bg-white">
        <h1 className="text-xl font-semibold outline-none text-gray-800">Untitled Note</h1>
        <button type="button" className="bg-purple-100 text-purple-700 px-4 py-2 rounded-md font-medium hover:bg-purple-200 transition">
          ✨ Magic Summary
        </button>
      </header>

      {/* Editor */}
      <MarkdownEditor />
    </div>
  );
}