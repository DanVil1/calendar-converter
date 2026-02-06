import { CalendarGrid } from "@/app/components/calendar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <div className="container mx-auto py-12 px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
            Calendar Converter
          </h1>
        </header>

        <CalendarGrid />
      
      </div>
    </main>
  );
}