"use client";

import * as React from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateUserDialog } from "./create-user-dialog";
import { DeleteUserDialog } from "./delete-user-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axios.instances";
import TableSkeleton from "@/components/custom/table-skeleton";

type Item = {
  role: string;
  name: string;
  email: string;
  _id?: number;
  id?: number;
} | null;

export function UsersTable() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<Item>(null);

  const itemsPerPage = 5;

  const {
    data,
    isLoading,
    isRefetching,
    refetch: refetchAllUser,
  } = useQuery({
    queryKey: ["get-list-users"],
    queryFn: async () => {
      const response = await axiosInstance.get<{
        data: Array<Item>;
      }>("/user/all");

      if (response.status === 200) {
        return response.data?.data ?? [];
      }
    },
  });

  const { mutate: onCreateUser } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (payload: Omit<Item, "_id">) =>
      await axiosInstance.post("/user/create", payload),
    onSuccess: () => {
      refetchAllUser();
      setSelectedUser(null);
      setCreateDialogOpen(false);
    },
  });

  const { mutate: onUpdateUser } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (payload: Item) =>
      await axiosInstance.put(`/user/update/${payload?.id}`, payload),
    onSuccess: () => {
      refetchAllUser();
      setSelectedUser(null);
      setCreateDialogOpen(false);
    },
  });

  const { mutate: onDeleteUser } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id: number) =>
      await axiosInstance.delete(`/user/delete/${id}`),
    onSuccess: () => {
      refetchAllUser();
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    },
  });

  const filteredUsers = data?.filter(
    (user) =>
      user?.name.toLowerCase().includes(search.toLowerCase()) ||
      user?.email.toLowerCase().includes(search.toLowerCase()) ||
      user?.role.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(
    Number(filteredUsers?.length ?? 0) / itemsPerPage
  );
  const paginatedUsers = filteredUsers?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  React.useEffect(() => {
    setPage(1);
  }, [filteredUsers]);

  const handleCreateUser = (user: Omit<Item, "_id">) => {
    const newPayload = { ...user };
    if (selectedUser?.role) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onUpdateUser(newPayload);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete newPayload._id;
    onCreateUser(newPayload);
  };

  const handleDeleteUser = (userId?: number) => {
    onDeleteUser(userId ?? 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 w-[300px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      {}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading || isRefetching ? (
            <TableSkeleton />
          ) : (
            <TableBody>
              {data?.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell className="font-medium">{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user);
                            setCreateDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedUser(user);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        <div className="flex items-center justify-between px-2 py-4">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedUsers?.length} of {filteredUsers?.length} users
          </p>
          {data && data?.length > itemsPerPage && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="flex items-center justify-center text-sm font-medium">
                Page {page} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateUser}
        defaultValues={selectedUser || undefined}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => selectedUser && handleDeleteUser(selectedUser?._id)}
        userName={selectedUser?.name}
      />
    </div>
  );
}
