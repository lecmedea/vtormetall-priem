import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { getBindings } from "./runtime";

export function getDb() {
  return drizzle(getBindings().DB, { schema });
}
