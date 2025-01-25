export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted/50">
        <div className="h-full flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className="absolute h-44 w-44 bg-primary/10 rounded-full -z-10 blur-3xl" />
            <h1 className="text-2xl font-bold tracking-tight">
              Modern Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your application with ease
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">{children}</div>
    </div>
  );
}
