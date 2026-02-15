import { Tasks } from "@/features/tasks";

export default function Home() {
  return (
    <div className="max-w-200 m-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold mb-2">Productivity Up</h1>
        <p className="text-muted">Focus on one task at a time</p>
      </header>
      <main className="flex flex-col gap-6">
        <Tasks />
      </main>
    </div>
  );
}
