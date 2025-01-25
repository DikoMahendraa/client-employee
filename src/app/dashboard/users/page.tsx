import type { Metadata } from "next";
import { UsersTable } from "./components/user-table";

export const metadata: Metadata = {
  title: "Users",
  description: "Example users app built using the components.",
};

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <UsersTable />
    </div>
  );
}
