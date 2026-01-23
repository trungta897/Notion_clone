"use client";

import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";

const isConvexConfigured =
  Boolean(process.env.NEXT_PUBLIC_CONVEX_URL) &&
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const MainLayoutConfigured = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

const MainLayoutUnconfigured = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <main className="h-full overflow-y-auto">{children}</main>
    </div>
  );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return isConvexConfigured ? (
    <MainLayoutConfigured>{children}</MainLayoutConfigured>
  ) : (
    <MainLayoutUnconfigured>{children}</MainLayoutUnconfigured>
  );
};

export default MainLayout;
