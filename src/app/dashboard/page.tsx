import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">
        Welcome to the Dashboard
      </h1>
      <p className="text-muted-foreground">
        This is a modern dashboard built with Next.js 15, Tailwind CSS, and
        shadcn UI.
      </p>
    </div>
  );
}
