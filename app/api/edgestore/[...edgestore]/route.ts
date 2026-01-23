import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket().beforeDelete(() => {
    return true;
  }),
});

const isEdgeStoreConfigured =
  Boolean(process.env.EDGE_STORE_ACCESS_KEY) &&
  Boolean(process.env.EDGE_STORE_SECRET_KEY);

const handler = isEdgeStoreConfigured
  ? createEdgeStoreNextHandler({
      router: edgeStoreRouter,
    })
  : async () =>
      new Response("EdgeStore is not configured on this environment.", {
        status: 500,
      });

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
