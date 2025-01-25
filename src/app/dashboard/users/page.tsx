import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "Example users app built using the components.",
};

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">
        Welcome to the Users
      </h1>
      <p className="text-muted-foreground">
        This is a modern Users built with Next.js 15, Tailwind CSS, and shadcn
        UI.
      </p>
    </div>
  );
}
