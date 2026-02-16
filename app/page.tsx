import { CalendarGrid } from "@/app/components/calendar";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-400">
      <div className="container mx-auto py-12 px-4">
        <CalendarGrid />
      </div>
    </main>
  );
}