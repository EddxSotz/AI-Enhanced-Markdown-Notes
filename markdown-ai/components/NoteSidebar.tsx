import Link from "next/link";

export default function NoteSidebar() {  
  const dummyNotes = [
    { id: "1", title: "Project Blueprint" },
    { id: "2", title: "Meeting Notes" },
  ];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold mb-6">My Notes</h2>
      
      <button type="button" className="bg-blue-600 text-white p-2 rounded-md mb-6 hover:bg-blue-700 transition">
        + New Note
      </button>

      <nav className="flex-1 space-y-2 overflow-y-auto">
        {dummyNotes.map((note) => (
          <Link 
            key={note.id} 
            href={`/notes/${note.id}`}
            className="block p-2 rounded-md hover:bg-gray-100 text-sm truncate"
          >
            {note.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}