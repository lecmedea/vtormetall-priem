export type SiteBindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
};

type RuntimeGlobal = typeof globalThis & { __VTORMETALL_BINDINGS__?: SiteBindings };

export function getBindings(): SiteBindings {
  const bindings = (globalThis as RuntimeGlobal).__VTORMETALL_BINDINGS__;
  if (!bindings?.DB || !bindings?.BUCKET) throw new Error("Site storage bindings are unavailable");
  return bindings;
}
