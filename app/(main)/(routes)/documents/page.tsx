"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const isConvexConfigured =
  Boolean(process.env.NEXT_PUBLIC_CONVEX_URL) &&
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const DocumentsPageConfigured = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    }).then((documentId) => router.push(`/documents/${documentId}`));

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircleIcon className="h-4 w-4 mr-2" /> Create a note
      </Button>
    </div>
  );
};

const DocumentsPageUnconfigured = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-medium">Welcome to Jotion</h2>
      <p className="text-sm text-muted-foreground">
        Configure Clerk and Convex to start creating documents.
      </p>
    </div>
  );
};

const DocumentsPage = () => {
  return isConvexConfigured ? (
    <DocumentsPageConfigured />
  ) : (
    <DocumentsPageUnconfigured />
  );
};

export default DocumentsPage;
