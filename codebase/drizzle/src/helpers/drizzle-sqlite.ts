import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { spaceURLs } from "~db/schema/spaces";
import { env } from "env";

const sqlite = new Database(env.DATABASE_URL);
export const db = drizzle(sqlite);

export const getURLs = () => {
  const result = db
    .select()
    .from(spaceURLs)
    .all()
    .map((data) => data.url);
  return result;
};
