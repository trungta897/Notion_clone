"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!convexUrl || !clerkKey) {
    return <>{children}</>;
  }

  const convex = new ConvexReactClient(convexUrl);

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
