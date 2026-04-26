import NoteSidebar from "@/components/NoteSidebar";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar fixed to the left */}
      <aside className="w-64 border-r bg-white p-4 hidden md:block">
        <NoteSidebar />
      </aside>

      {/* Main content area where individual notes will render */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}